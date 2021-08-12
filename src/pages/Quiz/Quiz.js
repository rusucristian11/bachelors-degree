import React from "react";
import './Quiz.scss';
import Tabletop from "tabletop";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import {db} from "../../firebase";
import axios from "axios";
import {spreadSheetURL} from "../../utils/utils";

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAnswers: {},
            correctAnswers: {},
            result: 0,
            qa: [],
            loading: true,
        }
    }

    componentDidMount() {
        Tabletop.init({
                key: '1UgSKjhj8xZAIuzK7R4Y4qo6nda_T0hOkQJh34d4nAaU',
                simpleSheet: true,
            }
        ).then((data) => {
            this.setState({qa: data, loading: false})
            window.scrollTo(0,0)
        })
    }

    changeCheckbox = (questionId, selected) => {
        let userAnswer = {...this.state.userAnswers}
        userAnswer[questionId] = selected
        this.setState({userAnswers: userAnswer})
    }

    calculateResult = (questionId) => {
        let score = 0;
        this.state.qa.forEach((el, questionId) => {
            if(el.correctans === this.state.userAnswers[questionId]) {
                score += 10
            }
        })
        const userId = JSON.parse(localStorage.getItem('userProfileId'))
        db.collection("userProfile")
            .doc(userId)
            .update({quiz: score})
            .then((resp) => {
                this.setState({result: score}, () => {
                    const userId = JSON.parse(localStorage.getItem('userProfileId'))
                    axios.get(`${spreadSheetURL}/id/${userId}`)
                        .then(respGS => {
                            let student = {...respGS.data[0], quiz: this.state.result}
                            axios.put(`${spreadSheetURL}/id/${student.id}`, student).then(
                                resp => this.setState({submitted: !this.state.submitted}, () => {
                                    this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
                                })
                            )
                        })
                    window.scrollTo(0,0)
                })
            })
            .catch()
    }

    render() {
        return (
            <div className='page page-quiz'>
                <div className='rounded-card rounded-card-quiz'>
                    <div className='container-top'>
                        <div className='container-title'>This is the Math quiz</div>
                        <div className='container-subtitle'>Your result is {this.state.result} %</div>
                    </div>
                    <div className='quiz-form'>
                        {this.state.loading
                            ? <SpinnerLoader/>
                            : this.state.qa.length !== 0 &&
                                    this.state.qa.map((el) => {
                                        return (
                                            <div key={el.id}>
                                                <div className='question'>{el.question}</div>
                                                <span className='radio-buttons-container' onClick={() => this.changeCheckbox(el.id, 'answer1')}>
                                                    <div className='checkbox-container'/>
                                                    <div className={`checkbox-button darker ${this.state.userAnswers[el.id] === 'answer1' ? 'checked' : ''}`}/>
                                                    <div className="text">{el.answer1}</div>
                                                </span>
                                                <span className='radio-buttons-container' onClick={() => this.changeCheckbox(el.id, 'answer2')}>
                                                    <div className='checkbox-container'/>
                                                    <div className={`checkbox-button darker ${this.state.userAnswers[el.id] === 'answer2' ? 'checked' : ''}`}/>
                                                    <div className="text">{el.answer2}</div>
                                                </span>
                                                <span className='radio-buttons-container' onClick={() => this.changeCheckbox(el.id, 'answer3')}>
                                                    <div className='checkbox-container'/>
                                                    <div className={`checkbox-button darker ${this.state.userAnswers[el.id] === 'answer3' ? 'checked' : ''}`}/>
                                                    <div className="text">{el.answer3}</div>
                                                </span>
                                                <span className='radio-buttons-container' onClick={() => this.changeCheckbox(el.id, 'answer4')}>
                                                    <div className='checkbox-container'/>
                                                    <div className={`checkbox-button darker ${this.state.userAnswers[el.id] === 'answer4' ? 'checked' : ''}`}/>
                                                    <div className="text">{el.answer4}</div>
                                                </span>
                                            </div>
                                        )
                                    })
                            }
                            <div className='button-quiz'>
                                <div className='action-button button-submit-quiz' onClick={() => this.calculateResult()}>Submit</div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
