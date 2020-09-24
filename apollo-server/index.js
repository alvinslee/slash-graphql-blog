const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

const GRAPH_ENDPOINT = 'https://obsolete-hobbies.us-west-2.aws.cloud.dgraph.io/graphql'

const typeDefs = gql`
  type User {
    email: String!
    name: String
    posts: [Post]
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    image: String
    user: User!
    comments: [Comment]
  }
  
  type Comment {
    id: ID!
    body: String!
    user: User!
    post: Post!
  }
  
  type Query {
    getUser(email: String!): User
    getAllUsers: [User]
    getAllPosts: [Post]
  }
`

const method = 'POST'
const headers = {
  'Content-type': 'application/graphql'
}

const argsToString = (args) => {
  if (typeof args === 'object') { let argStrings = []
      Object.keys(args).forEach((key) => {
      argStrings.push(`${key}:"${args[key]}"`)
    })
    if (argStrings.length) {
      return `${argStrings.join(', ')}`
    }
  }
  return ''
}

const sendQuery = async({ name, args, fields }) => {
  let body = `
query {
  ${name} (${argsToString(args)}) {
    ${fields}
  }
}`
  const fetchResult = await fetch(GRAPH_ENDPOINT, {
    method,
    headers,
    body
  })
  const result = await fetchResult.json()
  return result.data[name]

}

const resolvers = {
  Query: {
    getAllUsers: async () => sendQuery({ name: 'queryUser', fields: 'name posts { id title }' }),
    getUser: async (_parent, args) => sendQuery({ name: 'getUser', args, fields: 'name email posts { id title }' }),
    getAllPosts: async () => sendQuery({ name: 'queryPost', fields: 'id title body image user { name } comments { id body user { name } }' })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url })=> {
  console.log(`Server ready at at ${url}`)
})