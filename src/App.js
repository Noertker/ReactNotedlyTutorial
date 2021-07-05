// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages'
import GlobalStyle from './components/GlobalStyle'

import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from 'apollo-link-context';

//Configure API URI and Cache
const uri = process.env.API_URI
const httpLink = createHttpLink({uri})
const cache = new InMemoryCache();

//Check for a token and return the header to context
const authLink = setContext((_,{headers})=>{
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
})

//Configure Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri,
    cache,
    resolvers:{},
    connectToDevTools:true,

});

const data = {
    isLoggedIn: !!localStorage.getItem('token')
}
cache.writeData({data});
client.onResetStore(()=>cache.writeData({data}))

//Wrap React application in ApolloProvider in return
const App = () =>{
    return(
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
