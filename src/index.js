const { GraphQLServer } = require('graphql-yoga')
const { findIndex } = require('lodash')

const allUsers = [{
    id: 'user-123',
    name: 'David'
}, {
    id: 'user-124',
    name: 'Noah'
}]

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// 1
let idCount = links.length

// 2
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        // 2
        feed: () => links,
    },
    // 3
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

            // Find item index using _.findIndex (thanks @AJ Richardson for comment)
            var index = findIndex(links, {id: args.id});

            // Replace item at index using native splice
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

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))