import { useQuery } from '@apollo/client'
import React, {useEffect} from 'react'
import NoteFeed from '../components/NoteFeed'
import {GET_MY_NOTES} from '../gql/queries'

const mynotes = () => {
    useEffect(()=>{
        document.title = 'My Notes  - Notedly';
    })

    const {loading, error, data} = useQuery(GET_MY_NOTES);

    if (loading) return 'Loading...';
    if (error) return 'Error...';
    if (data.me.notes.length !==0){
        return <NoteFeed notes = {data.me.notes}/>
    } else {
        return <p>'No Notes Yet'</p>
    }




}

export default mynotes
