import React from "react";
import './EditProfile.scss'


export default class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.toggleShowDatepickerModal = this.toggleShowDatepickerModal.bind(this);

        this.state = {
            showPassword: false,
            submitted: false,
            datepickerModal: false,
            emailInput: '',
            passwordInput: '',
            rePasswordInput:'',
            firstNameInput: '',
            lastNameInput: '',
            birthDateInput: '',
            emailError: null,
            passwordError: null,
            rePasswordError: null,
            firstNameError: null,
            lastNameError: null,
            birthDateError: null,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    toggleShowPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }

    toggleShowDatepickerModal() {
        this.setState({datepickerModal: !this.state.datepickerModal})
    }

    handleInputChange(value, key) {
        this.setState({[key]: value})
    }

    isValid()  {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errors = {
            emailError: null,
            passwordError: null,
            rePasswordError: null,
            firstNameError: null,
            lastNameError: null,
            birthDateError: null,
        }
        this.setState({...errors})
        let response = true
        if (!emailPattern.test(this.state.emailInput.toLowerCase())) {
            errors['emailError'] = 'Email does not math the email pattern!'
            response =  false;
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
        if (!this.state.birthDateInput) {
            errors['birthDateError'] = 'This field is required!'
            response = false;
        }
        if (new Date(this.state.birthDateInput).getTime() >= new Date().getTime()) {
            errors['birthDateError'] = 'Birthday can\'t be in the future!'
            response = false;
        }
        this.setState({...errors})
        return response;
    }

    handleSubmit() {
        this.setState({passwordError: null, emailError: null});
        if (!this.isValid()) return;
        this.props.history.push('/')
    }

    handleCancel = () => {
        this.props.history.push('/')
    }

    renderContent() {
        return (
            <div className={'page-signup'}>
                <div className='form-title'>Edit your profile information</div>
                <div className='sub-form-title'>It's quick and easy.</div>
                <div className="first-last">
                    <div className='input-container'>
                        <input
                            className={`big-input input-custom ${this.state.firstNameError ? 'error-input' : ''}`}
                            placeholder='First Name'
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
                <div className='input-container'>
                    <input
                        placeholder={'Birthday'}
                        type={'date'}
                        className={`big-input input-custom ${this.state.birthDateError ? 'error-input' : ''}`}
                        onClick={(event) => this.handleInputChange(event.target.value, 'birthDateInput')}
                    />
                    {this.state.birthDateError &&
                    <div className='error-message'>{this.state.birthDateError}</div>
                    }
                </div>
                <div className='buttons-edit-profile'>
                    <div className='action-button button-cancel' onClick={() => this.handleCancel()}>Cancel</div>
                    <div className='action-button edit-profile' onClick={() => this.handleSubmit()}>Submit</div>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className='page-edit-profile'>
                <div className='rounded-card container-of-form'>
                    {this.renderContent()}
                </div>
            </div>
            );
    }
}
