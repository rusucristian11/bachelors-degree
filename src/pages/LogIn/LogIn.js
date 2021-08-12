import React from "react";
import {Link} from "react-router-dom";
import './LogIn.scss'
import {auth, db} from "../../firebase";


export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            emailInput: '',
            passwordInput: '',
            emailError: null,
            passwordError: null,
        }
    }

    toggleShowPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }

    handleInputChange(value, key) {
        if (key === 'email') this.setState({emailInput: value});
        if (key === 'password') this.setState({passwordInput: value});
    }

    isValid()  {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(this.state.emailInput.toLowerCase())) {
            this.setState({emailError: 'Email does not math the email pattern!' }, () => {return false;})
        }
        if (!this.state.emailInput) {
            this.setState({emailError: 'This field is required!' }, () => {return false;})
        }
        if (!this.state.passwordInput) {
            this.setState({passwordError: 'This field is required!' }, () => {return false;})
        }
        return true;
    }

    handleSubmit() {
        this.setState({passwordError: null, emailError: null});
        if (!this.isValid()) return;
        auth.signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
            .then((user) => {
                db.collection('userProfile')
                    .where('uid', '==', user.user.uid)
                    .get()
                    .then((snapshot) => {
                        localStorage.setItem('userProfileId', JSON.stringify(snapshot.docs[0].id))
                        localStorage.setItem('user', JSON.stringify(snapshot.docs[0].data()))
                        localStorage.setItem('userType', snapshot.docs[0].data().userType)
                        this.props.history.push('/')
                    })
            })
            .catch((err) => {
                this.setState({emailError: err.message})
            })
    }

    render() {
        return (
            <div className='page-authentication page-login'>
                <div className='rounded-card-login'>
                    <div className='form-title'>Log In</div>
                    <div className='sub-form-title'>Connect to your Augmented Reality account.</div>
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
                    <div className='input-container'>
                        <input
                            className={`big-input input-custom ${this.state.passwordError ? 'error-input' : ''}`}
                            placeholder='Password'
                            type={!this.state.showPassword ? 'password' : ''}
                            onChange={(event) => this.handleInputChange(event.target.value, 'password')}
                        />
                        <div className={`show-password-icon ${this.state.showPassword ? 'active' : null}`}
                             onClick={() => this.toggleShowPassword()}
                        />
                        {this.state.passwordError &&
                        <div className='error-message'>{this.state.passwordError}</div>
                        }
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                    <Link to={'/register'} className={'forgot-password'} >
                       Create New Account
                    </Link>
                    </div>
                    <div className='action-button login-button' onClick={() => this.handleSubmit()}>Log In</div>
                </div>
            </div>
        );
    }
}
