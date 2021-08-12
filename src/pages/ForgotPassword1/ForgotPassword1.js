import React from "react";
import './ForgotPassword1.scss'
import {Redirect} from "react-router-dom";

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailInput: '',
            emailError: null,
            submitted: false,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    handleInputChange(value, key) {
        if (key === 'email') this.setState({emailInput: value});
    }

    isValid(email) {
        let response = true;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(email.toLowerCase())) {
            response = false;
            this.setState({emailError: 'Email does not match the email pattern!'})
        }
        if (!email) {
            response = false;
            this.setState({emailError: 'This field is required!'})
        }
        return response;
    }

    handleSubmit() {
        if (!this.isValid(this.state.emailInput)) return;
        this.setState({submitted: !this.state.submitted}, () => {
            this.id = setTimeout(() => this.setState({redirect: true}), 5000)
        })
    }

    renderContent() {
        return (
            <React.Fragment>
                <div className='form-title'>Forgot your password?</div>
                <div className='sub-form-title'>Enter your E-mail or Phone Number.</div>
                <div className='input-container'>
                    <input
                        className={`big-input input-custom ${this.state.emailError ? 'error-input' : ''}`}
                        placeholder='E-mail Address'
                        onChange={(event) => this.handleInputChange(event.target.value, 'email')}
                    />
                    {this.state.emailError &&
                    <div className='error-message'>{this.state.emailError}</div>
                    }
                </div>
                <div className='action-button forgot-button' onClick={() => this.handleSubmit()}>Submit</div>
            </React.Fragment>
        );
    }

    renderThankYou() {
        return (
            <React.Fragment>
                <h1>Thank you!</h1>
                <h4>An email has been sent to you with a recovery link for your password.</h4>
                <h4>You will be redirected to the log in page in 5 seconds.</h4>
            </React.Fragment>
        )
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/login"/>
            : (
                <div className='page-authentication forgot-password1'>
                    <div className='rounded-card-login rounded-card-forgotpassword1'>
                        {!this.state.submitted ? this.renderContent() : this.renderThankYou()}
                    </div>
                </div>
            );
    }
}