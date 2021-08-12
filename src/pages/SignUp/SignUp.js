import React from "react";
import {Redirect} from "react-router-dom";
import './SignUp.scss';
import {auth, db} from "../../firebase";
import axios from "axios";
import {spreadSheetURL} from "../../utils/utils";


export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.toggleShowDatepickerModal = this.toggleShowDatepickerModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            showPassword: false,
            isTeacher: false,
            submitted: false,
            datepickerModal: false,
            emailInput: '',
            passwordInput: '',
            rePasswordInput: '',
            firstNameInput: '',
            lastNameInput: '',
            emailError: null,
            passwordError: null,
            rePasswordError: null,
            firstNameError: null,
            lastNameError: null,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    toggleShowPassword() {
        this.setState({showPassword: !this.state.showPassword})
    }

    toggleShowDatepickerModal() {
        this.setState({datepickerModal: !this.state.datepickerModal})
    }

    handleInputChange(value, key) {
        this.setState({[key]: value})
    }

    isValid() {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errors = {
            emailError: null,
            passwordError: null,
            rePasswordError: null,
            firstNameError: null,
            lastNameError: null,
        }
        this.setState({...errors})
        let response = true
        if (!emailPattern.test(this.state.emailInput.toLowerCase())) {
            errors['emailError'] = 'Email does not math the email pattern!'
            response = false;
        }
        if (!this.state.emailInput) {
            errors['emailError'] = 'This field is required!'
            response = false;
        }
        if (!this.state.passwordInput) {
            errors['passwordError'] = 'This field is required!'
            response = false;
        }
        if (!this.state.rePasswordInput) {
            errors['rePasswordError'] = 'This field is required!'
            response = false;
        }
        if (this.state.rePasswordInput !== this.state.passwordInput) {
            errors['rePasswordError'] = 'These fields doesn\'t match!'
            errors['passwordError'] = 'These fields doesn\'t match!'
            response = false;
        }
        if (!this.state.lastNameInput) {
            errors['lastNameError'] = 'This field is required!'
            response = false;
        }
        if (!this.state.firstNameInput) {
            errors['firstNameError'] = 'This field is required!'
            response = false;
        }
        this.setState({...errors})
        return response;
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({passwordError: null, emailError: null});
        if (!this.isValid()) return;
        auth.createUserWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
            .then((user) => {
                db.collection('userProfile').add({
                    uid: user.user.uid,
                    firstName: this.state.firstNameInput,
                    lastName: this.state.lastNameInput,
                    userType: this.state.isTeacher ? 'TEACHER' : 'STUDENT',
                    quiz: null,
                    arClasses: ['active', 'active', 'active', 'active', 'active', 'active'],
                })
                    .then((userProfile) => {
                        userProfile.get().then(snapshot => {
                            localStorage.setItem('user', JSON.stringify(snapshot.data()))
                            localStorage.setItem('userProfileId', JSON.stringify(snapshot.id))
                            localStorage.setItem('userType', snapshot.data().userType)
                            debugger
                            if (snapshot.data().userType !== 'TEACHER') {
                                // Add the user to the spreadsheet
                                const objectToBePosted = {
                                    year: '2021',
                                    id: snapshot.id,
                                    student: `${snapshot.data().firstName} ${snapshot.data().lastName}`,
                                    class1: "FALSE",
                                    class2: "FALSE",
                                    class3: "FALSE",
                                    class4: "FALSE",
                                    class5: "FALSE",
                                    class6: "FALSE",
                                    quiz: "0",
                                }
                                axios.post(spreadSheetURL, objectToBePosted)
                                    .then(response => {
                                        this.setState({submitted: !this.state.submitted}, () => {
                                            this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
                                        })
                                    })
                                return
                            }
                            this.setState({submitted: !this.state.submitted}, () => {
                                this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
                            })
                        })
                    })
            })
    }

    renderContent() {
        return (
            <div className='container-of-form'>
                <div className='form-title'>Sign Up</div>
                <div className='sub-form-title'>It's quick and easy.</div>
                <div className="first-last">
                    <div className='input-container'>
                        <input
                            className={`big-input input-custom ${this.state.firstNameError ? 'error-input' : ''}`}
                            placeholder='First Name'
                            value={this.state.firstNameInput}
                            onChange={(event) => this.handleInputChange(event.target.value, 'firstNameInput')}
                        />
                        {this.state.firstNameError &&
                        <div className='error-message'>{this.state.firstNameError}</div>
                        }
                    </div>
                    <div className='input-container'>
                        <input
                            className={`big-input input-custom ${this.state.lastNameError ? 'error-input' : ''}`}
                            placeholder='Last Name'
                            value={this.state.lastNameInput}
                            onChange={(event) => this.handleInputChange(event.target.value, 'lastNameInput')}
                        />
                        {this.state.lastNameError &&
                        <div className='error-message'>{this.state.lastNameError}</div>
                        }
                    </div>
                </div>
                <div className='input-container'>
                    <input
                        className={`big-input input-custom ${this.state.emailError ? 'error-input' : ''}`}
                        placeholder='E-mail Address'
                        value={this.state.emailInput}
                        onChange={(event) => this.handleInputChange(event.target.value, 'emailInput')}
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
                        value={this.state.passwordInput}
                        onChange={(event) => this.handleInputChange(event.target.value, 'passwordInput')}
                    />
                    <div className={`show-password-icon ${this.state.showPassword ? 'active' : null}`}
                         onClick={() => this.toggleShowPassword()}
                    />
                    {this.state.passwordError &&
                    <div className='error-message'>{this.state.passwordError}</div>
                    }
                </div>
                <div className='input-container'>
                    <input
                        className={`big-input input-custom ${this.state.passwordError ? 'error-input' : ''}`}
                        placeholder='Repeat Password'
                        value={this.state.rePasswordInput}
                        type={!this.state.showPassword ? 'password' : ''}
                        onChange={(event) => this.handleInputChange(event.target.value, 'rePasswordInput')}
                    />
                    <div className={`show-password-icon ${this.state.showPassword ? 'active' : null}`}
                         onClick={() => this.toggleShowPassword()}
                    />
                    {this.state.passwordError &&
                    <div className='error-message'>{this.state.passwordError}</div>
                    }
                </div>
                <span className="checkbox-container"
                      onClick={() => this.handleInputChange(!this.state.isTeacher, 'isTeacher')}>
                    <div style={{marginRight: '20px'}} className="text">Are you a teacher ?</div>
                    <div className={`checkbox-button ${this.state.isTeacher ? 'checked' : ''}`}/>
                </span>
                <div className='action-button signup-button' onClick={(event) => this.handleSubmit(event)}>Sign Up</div>
            </div>
        )
    }

    renderThankYou() {
        return (
            <React.Fragment>
                <h1>Thank you!</h1>
                <h4>You will be redirected to the log in page in 5 seconds.</h4>
            </React.Fragment>
        )
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/login"/>
            : (<div className='page-authentication page-signup'>
                    <div className='rounded-card-login rounded-card-signup'>
                        {!this.state.submitted ? this.renderContent() : this.renderThankYou()}
                    </div>
                </div>
            );
    }
}
