const { GraphQLServer } = require('graphql-yoga')
const { find } = require('lodash')

const allUsers = [{id: 'user-123', name: 'David'}, {id: 'user-124', name: 'Noah'}]

// 1
const typeDefs = `
    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!): User!
    }

    type User {
        id: ID!
        name: String!
    }
`
// 2
const resolvers = {
    
    Query: {
        // info: () => null // `This ist the API of a Hackernews Clone`
        users: () => allUsers,
        user: (_, {id}) => {
            return find(allUsers, ['id', id])
        }
    },
    Mutation: {
        createUser: (_, {name}) => {
            console.log('name: ', name);
            allUsers.push({id: 'user-125', name: name});
            return {id: 'user-125', name: name}
        }
    }
}

// 3
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))