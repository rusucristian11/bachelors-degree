import React from 'react';
import {Redirect} from "react-router-dom";

export default class RegistrationComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
        }
    }

    componentDidMount() {
        //call API
        this.setState({submitted: !this.state.submitted}, () => {
            this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
        })
    }

    componentWillUnmout() {
        clearTimeout(this.id)
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/login" />
            : (<div className='page-authentication reset-password'>
                    <div className='rounded-card-login rounded-card-signup'>
                        <h1>Registration Complete!</h1>
                        <h4>You will be redirected to the log in page in 5 seconds.</h4>
                    </div>
                </div>
            );
    }
}