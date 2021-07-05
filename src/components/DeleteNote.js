import React from 'react'
import {useMutation} from '@apollo/client'
import {withRouter} from 'react-router-dom'

import ButtonAsLink from './ButtonAsLink'
import {GET_MY_NOTES, GET_NOTES} from '../gql/queries'
import {DELETE_NOTE} from '../gql/mutation'

const DeleteNote = (props) => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteID
        },

        refetchQueries: [{query:GET_MY_NOTES}, {query:GET_NOTES}],
        onError:  error=>{ console.log(error)} ,
        onCompleted: data =>{
            props.history.push('/myNotes')
            }
        }
    );
    return (
        <ButtonAsLink onClick={deleteNote} >Delete Note</ButtonAsLink>
    )
}

export default withRouter(DeleteNote)
