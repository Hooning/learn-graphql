const { GraphQLServer } = require('graphql-yoga')
const { findIndex } = require('lodash')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
},
{
    id: 'link-1',
    url: 'www.goole.com',
    description: 'You know google is good'
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
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const link = {
                id: args.id,
                url: args.url,
                description: args.description
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