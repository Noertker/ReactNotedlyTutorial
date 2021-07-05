import React, {useEffect} from 'react'
import {useMutation, gql} from '@apollo/client'

import NoteForm from '../components/NoteForm'

import {NEW_NOTE, GET_NOTES, GET_MY_NOTES} from '../gql/queries'

const NewNote = (props) => {
    useEffect(()=>{
        document.title = 'New Note - Notedly';
    })

    const [data, {loading,error}] = useMutation(NEW_NOTE, {
        refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
        onCompleted: data =>{
            props.history.push(`note/${data.newNote.id}`)
        }
    })

    return (
        <React.Fragment>
        {loading && <p>Loading...</p> }
        {error && <p>Error!</p> }
        <NoteForm action={data}/>
        </React.Fragment>
    )
}

export default NewNote
