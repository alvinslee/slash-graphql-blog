# slash-graphql-blog
This is a public project with the following:
  * bash scripts for using curl to make requests directly to Slash GraphQL backend
  * code for an Apollo GraphQL Server to act as a middleware proxy
  * a quick-and-dirty Vue.JS client to demonstrate fetching data with a GraphQL request made to an Apollo GraphQL Server, which in turn makes a request of Slash GraphQL

## Pull down this code repository
```
git clone https://github.com/alvinslee/slash-graphql-blog.git
```

## Start up Apollo GraphQL server (on localhost:4000)
```
cd apollo-server
node index.js
```

## Start up Vue.js Client (on localhost:8080)
```
cd vue-client
npm install
npm run serve
```

## Open your browser

Go to: `http://localhost:8080`
