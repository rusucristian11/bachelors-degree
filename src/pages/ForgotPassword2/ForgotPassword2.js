import React from "react";
import './ForgotPassword2.scss'
import {Redirect} from "react-router-dom";


export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorRePassword: null,
            submitted: false,
            errorPassword: null,
            new_password: '',
            re_new_password: '',
            showPassword: false,
            passwordContent: {
                capitalLetter: false,
                letter: false,
                specialChar: false,
                number: false,
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    toggleShowPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }

    handleChange(value, valueType) {
        if (valueType === 'new_password') {
            let passwordContent = {
                capitalLetter: false,
                letter: false,
                specialChar: false,
                number: false,
            };
            if (/[a-z]/g.test(value)) passwordContent.letter = true;
            if (/[A-Z]/g.test(value)) passwordContent.capitalLetter = true;
            if (/[0-9]/g.test(value)) passwordContent.number = true;
            if (/[@$!%*?&#]/g.test(value)) passwordContent.specialChar = true;
            this.setState({new_password: value, passwordContent: passwordContent});
        } else if (valueType === 're_password') {
            this.setState({re_new_password: value})
        }
    }

    isObjectValid() {
        let response = true;
        this.setState({errorRePassword: null, errorPassword: null})
        if (!this.state.new_password) {
            response = false;
            this.setState({errorPassword: 'This field is required!'})
        }
        if (!this.state.re_new_password) {
            response = false;
            this.setState({errorRePassword: 'This field is required!'})
        }
        if (this.state.new_password !== this.state.re_new_password) {
            response = false;
            this.setState({errorRePassword: 'Password doesn\'t match'})
        }
        for (const [key, value] of Object.entries(this.state.passwordContent)) {
            if (!value) {
                response = false;
                this.setState({errorPassword: 'The password that you entered doesn\'t match the password criteria ' + key})
            }
        }

        return response
    }

    submitFormData() {
        if (!this.isObjectValid()) return;
        this.setState({submitted: !this.state.submitted}, () => {
            this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
        })
    }

    renderThankYou() {
        return (
            <React.Fragment>
                <h1>Thank you!</h1>
                <h4>Your password has been changed. You will be redirected to the Log In page in 5 seconds.</h4>
            </React.Fragment>
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                    <div className='form-title'>Reset Password</div>
                    <div className='password-container-reset'>
                        <input
                            className={`big-input input-custom ${this.state.errorPassword ? 'error-input' : ''}`}
                            placeholder='New Password'
                            type={!this.state.showPassword ? 'password' : ''}
                            onChange={(ev) => this.handleChange(ev.target.value, 'new_password')}
                        />
                        <div className={`show-password-icon ${this.state.showPassword ? 'active' : null}`}
                             onClick={() => this.toggleShowPassword()}
                        />
                        {this.state.errorPassword &&
                        <div className='error-message'>{this.state.errorPassword}</div>
                        }
                    </div>
                    <div className='password-container-reset'>
                        <input
                            className={`big-input input-custom ${this.state.errorRePassword ? 'error-input' : ''}`}
                            placeholder='Confirm New Password'
                            type={!this.state.showPassword ? 'password' : ''}
                            onChange={(ev) => this.handleChange(ev.target.value, 're_password')}
                        />
                        <div className={`show-password-icon ${this.state.showPassword ? 'active' : null}`}
                             onClick={() => this.toggleShowPassword()}
                        />
                        {this.state.errorRePassword &&
                        <div className='error-message'>{this.state.errorRePassword}</div>
                        }
                    </div>
                    <div className='help-text-container'>
                        <div className='help-text'>
              <span className={`${this.state.passwordContent.letter ? 'highlight' : null}`}>
                Lower Case,
              </span>
                            {' '}
                            <span className={`${this.state.passwordContent.capitalLetter ? 'highlight' : null}`}>
                Upper Case,
              </span>
                            {' '}
                            <span className={`${this.state.passwordContent.specialChar ? 'highlight' : null}`}>
                 Special Character (@$!%*?&#)
              </span>
                            {' '}
                            <span className={`${this.state.passwordContent.number ? 'highlight' : null}`}>
                Number.
              </span>
                        </div>
                        <div className='password-length'>
              <span className={`${this.state.new_password.length >=8 ? 'highlight' : null}`}>
                {this.state.new_password.length}/8
              </span>
                        </div>
                    </div>
                    <div className='action-button reset-password-button' onClick={() => this.submitFormData()}>Validate</div>
            </React.Fragment>
        );
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/login" />
            : (<div className='page-authentication reset-password'>
                    <div className='rounded-card-login rounded-card-reset'>
                        {!this.state.submitted ? this.renderContent() : this.renderThankYou()}
                    </div>
                </div>
            );
    }
}
