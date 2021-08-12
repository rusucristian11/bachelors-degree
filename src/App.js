import React from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import './App.scss';
// import {LocalStorage} from "./utils/LocalStorage";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import NotFoundPage from "./pages/404/404";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import Attendance from "./pages/Attendance/Attendance";
import EditProfile from "./pages/EditProfile/EditProfile";
import Quiz from "./pages/Quiz/Quiz";
import ArPage from "./pages/ArPage/ArPage";


const checkAuth = () => {
    // Verify if the authentication token is on local storage, if it is then the user can go to it's page and if it
    // doesn't it means the user is not authenticated and then redirected to login page
    // Auth Guard
    const user = JSON.parse(localStorage.getItem('user'))
    return !!user
};

const AuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}
    />
);


function App() {
    return (
        <Router>
            <Route component={Header}/>
            <Switch>
                {/* Authentication */}
                <Route exact path="/login" component={LogIn}/>
                <Route exact path="/register" component={SignUp}/>
                <AuthRoute exact path="/edit-profile" component={EditProfile}/>
                {/* Homepage */}
                <AuthRoute exact path="/" component={Homepage}/>
                <AuthRoute exact path="/ar/:id" component={ArPage}/>
                {/* Attendance */}
                <AuthRoute exact path='/attendance' component={Attendance}/>
                {/* Quiz Page */}
                <AuthRoute exact path="/quiz/math1" component={Quiz}/>
                {/*  404  */}
                <Route component={NotFoundPage}/>
            </Switch>
            <Route component={Footer}/>
        </Router>
    );
}

export default App;
