import React from 'react';
import {useQuery, useMutation, gql} from '@apollo/client'

import NoteForm from '../components/NoteForm'

import {GET_NOTE, GET_ME} from '../gql/queries';
import {EDIT_NOTE} from '../gql/mutation'

const EditNote = (props) => {
    const id = props.match.params.id
    const {loading, error, data} = useQuery(GET_NOTE,{variables: {id}});
    const {data: userdata, loading: queryLoad} = useQuery(GET_ME);
    const [editNote, {editloading, editerror}] = useMutation(EDIT_NOTE, {
        variables:{
            id
        }, onCompleted: () => {
            props.history.push(`/note/${id}`)
        }

    })

    if (loading||queryLoad) return(<p> Loading...</p>);
    if (error) return (<p>Error getting data</p>)
    if (userdata.me.id !== data.note.author.id) {
        return <p> You do not have access to edit this note</p>
    }

    return (
        <NoteForm content={data.note.content} action = {editNote}/>
    );
}

export default EditNote
