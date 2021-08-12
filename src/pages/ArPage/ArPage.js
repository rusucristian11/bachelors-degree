import React from "react";
import Circle from './data/Circle';
import Triangle from './data/Triangle';
import Cone from './data/Cone';
import Cube from './data/Cube';
import Cylinder from './data/Cylinder';
import Sphere from './data/Sphere';
import './ArPage.scss'
import {db} from "../../firebase";
import axios from "axios";
import {spreadSheetURL} from "../../utils/utils";


export default class ArPage extends React.Component {

    constructor(props) {
        super(props);
        this.renderArObjectId = this.props.match.params.id
        this.submitAssignment = this.submitAssignment.bind(this)
        this.state = {
            userProfile: [],
            input: '',
            inputError: null,
        }
    }


    renderVr() {
        switch (this.renderArObjectId) {
            case '1':
                this.requirement = 'Calculate one side of the equilateral triangle'
                this.response = '10'
                return <Triangle />
            case '2':
                this.requirement = 'Compute the volume of the cube'
                this.response = '27'
                return <Cube />
            case '3':
                this.requirement = 'Compute the diameter of the circle'
                this.response = '20'
                return <Circle />
            case '4':
                this.requirement = 'Calculate the radius of the bottom of the cone'
                this.response = '5'
                return <Cone />
            case '5':
                this.requirement = 'Enter the value of pi'
                this.response = '3.14'
                return <Sphere />
            case '6':
                this.requirement = 'Calculate the volume of the cylinder'
                this.response = '12pi'
                return <Cylinder />
            default:
                return <h1>Something went wrong please try again later</h1>
        }
    }

    getUserProfile() {
        const userProfile = JSON.parse(localStorage.getItem('user'))
        db.collection('userProfile')
            .where('uid', '==', userProfile.uid)
            .get()
            .then((snapshot) => {
                const user = snapshot.docs[0].data()
                this.setState({userProfile: user})
            })
    }

    componentDidMount() {
        this.getUserProfile();
    }

    submitAssignment() {
        if (!this.isValid()) {
            this.setState({inputError: 'Wrong Answer!'})
            return
        }
        // Submit that this user have seen the ar class and then redirect to homepage
        const userId = JSON.parse(localStorage.getItem('userProfileId'))
        const assignments = this.state.userProfile.arClasses || ['active', 'active', 'active', 'active', 'active', 'active']
        const assignmentsUpdated = assignments.map((el, index) => {
            if (index === parseInt(this.renderArObjectId) - 1) {
                return 'completed'
            }
            return el
        })
        db.collection("userProfile")
            .doc(userId)
            .update({arClasses: assignmentsUpdated})
            .then(() => {
                const userId = JSON.parse(localStorage.getItem('userProfileId'))
                axios.get(`${spreadSheetURL}/id/${userId}`)
                    .then(respGS => {
                        let student = {...respGS.data[0]}
                        student[`class${parseInt(this.renderArObjectId)}`] = 'TRUE'
                        axios.put(`${spreadSheetURL}/id/${student.id}`, student).then(
                            resp => {
                                window.location.replace("http://localhost:3000/")
                            }
                        )
                    })
            })
            .catch()
    }

    handleInputChange(value, key) {
        this.setState({[key]: value})
    }

    isValid() {
        return this.state.input === this.response
    }

    renderForm() {
        return (
            <div className={`fixed-form`}>
                <div className='input-container'>
                    <div className={`requirement`}>{this.requirement}</div>
                    <input
                        value={this.state.input}
                        className={`big-input input-custom ${this.state.inputError ? 'error-input' : ''}`}
                        placeholder='Result'
                        onChange={(event) => this.handleInputChange(event.target.value, 'input')}
                    />
                    {this.state.inputError &&
                    <div className='error-message'>{this.state.inputError}</div>
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'ar'}>
                {this.renderVr()}
                {this.renderForm()}
                <div className={'action-button button-cancel fixed-button disabled'}
                     onClick={() => this.submitAssignment()}>Complete Your assignment
                </div>
            </div>
        )
    }
}
