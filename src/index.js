const {
    GraphQLServer
} = require('graphql-yoga')
const {
    find
} = require('lodash')

const allUsers = [{
    id: 'user-123',
    name: 'David'
}, {
    id: 'user-124',
    name: 'Noah'
}]

// 1
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
  translations: [Translation]
}

type Translation {
    language: String!,
    text: String!
}
`
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
    translations: [{
        language: 'en',
        text: 'hello'
    },
    {
        language: 'de',
        text: 'Hallo'
    }
    ]
}]


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
        translations: (parent) => parent.translations,
        // translations: (parent) => {
        //     return [{language:'ko', text: 'Anyoung'}]
        // }
    }
}

// 3
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))