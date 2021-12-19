import React, { Component } from 'react'
import { BrowserRouter, Route, Switch ,Redirect,useLocation } from 'react-router-dom'
import './scss/style.scss'
import AuthContextProvider from './contexts/AuthContext'
import {useAuth} from './contexts/AuthContext'
import PropTypes from 'prop-types';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const App = () => {
  // render() {

    // const {currentUser} = useAuth();

    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
      <AuthContextProvider>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            {/* <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            /> */}
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <ProtectedRoute path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
    </AuthContextProvider>
        </React.Suspense>
      </BrowserRouter>
    )
  }
// }


function ProtectedRoute(props){
  const {currentUser} = useAuth()

  // const {path} = props;
  // const location = useLocation();

  // if(path === '/login'){
  //   return currentUser ? (
  //     <Redirect to ={location.state?.from ?? '/'} />

  //   ):(
  //     <Route {...props} />
  //   )
  // }


  return currentUser ? (
    <Route {...props} />) : (
    <Redirect to={{
      pathname:'/login',
      // state:{from : path}
      }} 
      />
    )
}


export default App
