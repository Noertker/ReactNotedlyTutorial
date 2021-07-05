import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../components/Button'
import {useQuery, gql} from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import NoteFeed from '../components/NoteFeed';


import {GET_NOTES} from '../gql/queries';

const Home = () =>{

    const {data, loading, error, fetchMore} = useQuery(GET_NOTES);

    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;


    return(
        <React.Fragment>
            {console.log(data)}
            <NoteFeed notes = {data.noteFeed.notes}/>
            {data.noteFeed.hasNextPage && (
            <Button
                onClick={()=>
                    fetchMore({
                        variables: {
                            cursor:data.noteFeed.cursor
                        },
                        updateQuery: (previousResult, {fetchMoreResult})=>{
                            return {
                                noteFeed: {
                                    cursor: fetchMoreResult.noteFeed.cursor,
                                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                    notes: [
                                        ...previousResult.noteFeed.notes,
                                        ...fetchMoreResult.noteFeed.notes
                                    ],
                                    __typename: 'noteFeed'
                                }
                            };
                        }
                    })
                }
            >
                See More
            </Button>
        )}
        </React.Fragment>
    );
};

export default Home;
