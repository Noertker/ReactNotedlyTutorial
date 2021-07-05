import React, {useEffect} from 'react'
import UserForm from '../components/UserForm'
import {useMutation, useApolloClient, gql} from '@apollo/client'

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!){
        signIn(email:$email, password:$password)
    }
`;

const SignIn = (props) => {
    useEffect(()=>{
        document.title = 'Sign In - Notedly';
    })
    const client=useApolloClient()
    const [signIn,{loading,data}] = useMutation(SIGNIN_USER, {
        onCompleted: data =>{
            //store token
            localStorage.setItem('token',data.signIn)
            //set local data
            client.writeData({data : { isLoggedIn : true }})
            //Redirect user to home page
            props.history.push('/')
        }
    });

    return (
        <div>
            <UserForm type='signin' action={signIn}>

            </UserForm>
        </div>
    )
}

export default SignIn
