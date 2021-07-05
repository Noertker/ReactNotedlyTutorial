import {gql} from '@apollo/client';

const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}
`;

const NEW_NOTE = gql`
    mutation($content: String!){
        newNote(content: $content){
            id
            content
            createdAt
            favoritedBy{
                id
                username
            }
            author{
                username
                id
            }
        }
    }

`;


const GET_NOTES = gql `
query NoteFeed($cursor: String){
    noteFeed(cursor:$cursor){
        cursor
        hasNextPage
        notes{
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
}`;

const GET_NOTE = gql `
    query note($id: ID!){
        note(id: $id){
            id
            createdAt
            content
            favoriteCount
            author{
                username
                id
                avatar
            }
        }
    }
`;

const GET_MY_NOTES = gql`
query me{
    me{
        id
        username
        notes{
            id
            createdAt
            content
            favoriteCount
            author{
                username
                id
                avatar
            }
        }
    }
}`;

const GET_ME=gql`
    query me {
        me {
            id
            favorites{
                id

            }
        }
    }
`;

const GET_MY_FAVORITES = gql`
    query me{
        me{
            id
            username
            favorites {
                id
                createdAt
                content
                favoriteCount
                author{
                    id
                    username
                    avatar
                }
            }
        }
    }
`;

export {GET_NOTE, GET_NOTES, IS_LOGGED_IN, NEW_NOTE, GET_MY_NOTES, GET_MY_FAVORITES,GET_ME};