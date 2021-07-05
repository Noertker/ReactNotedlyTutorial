import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Button from '../components/Button';
import { useMutation, useApolloClient, gql} from '@apollo/client'
import UserForm from '../components/UserForm'

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!){
        signUp(email: $email, username: $username, password: $password)
    }
`;


const SignUp = (props) => {

    useEffect(()=>{
        document.title = 'Sign Up - Notedly';
    });

    //Use Apollo Client to access state
    const client = useApolloClient();

    //mutation hook
    const [signUp, {loading,error}] = useMutation(SIGNUP_USER,{
        onCompleted: data => {
            localStorage.setItem('token', data.signUp)
            client.writeData({data: {isLoggedIn: true}})
            //Redirect to home page
            props.history.push("/");
        }
    });


    return (
        <React.Fragment>
        <UserForm formType='signup' action={signUp}/>
        {loading && <p>Loading...</p> }
        {error && <p>Error creating account</p> }
        </React.Fragment>
    )
}

export default SignUp
