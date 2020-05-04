import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from './Authentication';
const ProtectedRoute=({component:Component,...rest})=>{
    return(
        <Route {...rest} 
        render={
            (props)=>{
                if(Auth.isAuthenticated()){
                    return <Component {...props}/>;
                }
                else{
                    return <Redirect to={
                        {
                            pathname:'/SignIn',
                            state:{
                                from: props.location
                            }
                        }
                    }/>
                }
            }}/>
    )
}
export default ProtectedRoute;