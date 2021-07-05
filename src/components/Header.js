import React from 'react'
import logo from '../img/logo.svg'
import styled from 'styled-components'
import {useQuery, gql} from '@apollo/client'
import {Link, withRouter} from 'react-router-dom'
import ButtonAsLink from './ButtonAsLink'


const HeaderBar = styled.header `
width: 100%
padding: 0.5em 1em;
display: flex;
height: 64px;
position: fixed;
align-items: center;
background-color: #FFF;
box-shadow: 0px 5px 5px 0 rgba(0,0,0,0.25);
z-index:1;
`;

const LogoText = styled.h1 `
margin:0px;
padding:10px;
display: inline;

`;
//Local query for logged in from cache
const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}
`;
const UserState = styled.div`
margin-left:auto;`;

const Header = (props) => {
    const {data, client} = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40"/>
            <LogoText>Notedly</LogoText>
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink onClick={()=>{
                        //remove cached token
                        localStorage.removeItem('token');
                        //clear the application cache
                        client.resetStore();
                        //update local state
                        client.writeData({data:{isLoggedIn: false}})
                        //redirect user to home page
                        props.history.push('/')
                    }

                    }>Log Out</ButtonAsLink>)
                    : (
                        <p>
                    <Link to={'/signin'}> Sign In </Link> or {' '}
                    <Link to={'/signup'}>Sign Up </Link>
                    </p>

                )}
            </UserState>
        </HeaderBar>
    )
}

export default withRouter(Header)
