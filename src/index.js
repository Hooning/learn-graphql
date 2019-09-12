const { GraphQLServer, GraphQLObjectType } = require('graphql-yoga')
const { findIndex } = require('lodash')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
    translations: [
        {
            language: "en",
            text: "Hello"
        },
        {
            language: "de",
            text: "Hallo"
        },
        {
            language: "ko",
            text: "안녕"
        }
    ]
},
{
    id: 'link-1',
    url: 'www.goole.com',
    description: 'You know google is good',
    translations: [
        {
            language: "en",
            text: "Guten Moregen"
        },
        {
            language: "de",
            text: "Good Morning"
        },
        {
            language: "ko",
            text: "좋은 아침"
        }
    ]
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links[findIndex(links, {id: args.id})]
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
        translations: (parent) => parent.translations
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
                translations: args.translations
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const link = {
                id: args.id,
                url: args.url,
                description: args.description,
                translations: args.translations
            }
            
            var index = findIndex(links, {id: args.id});
            links.splice(index, 1, link);

            return link
        },
        deleteLink: (parent, args) => {

            var index = findIndex(links, {id: args.id});
            links.splice(index, 1);

            return `[${args.id}] is deleted`
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))