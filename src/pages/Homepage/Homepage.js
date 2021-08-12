import React from "react";
import './Homepage.scss'
import Dropdown from "../../components/Dropdown/Dropdown";
import Tabletop from "tabletop";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import {db} from "../../firebase";

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeCheckbox: true,
            completedCheckbox: true,
            disabledCheckbox: true,
            loading: true,
            vrclasses: [],
            classes: [],
            arClasses: ['active', 'active', 'active', 'active', 'active', 'active'],
        }
    }

    async getGoogleSheetsData() {
        await Tabletop.init({
                key: '1DeEOfHeq3FPtRV6A-6yhEUWr_xpy80Fvgwed5mvbJcU',
                simpleSheet: true
            }
        ).then((data) => {
            this.setState({vrclasses: [...data], loading: false})
        })

        await Tabletop.init({
                key: '1s8cBN1wWcSLdRnQ_TFf5SbQAc90jfvyXXZMy9DZJS8w',
                simpleSheet: true
            }
        ).then((data) => {
            let ceva = data.map((el) => {
                return {...el, selected: el.selected === "TRUE"}
            });
            this.setState({classes: [...ceva], loading: false})
        })
    }

    async getUserProfile() {
        const userProfile = JSON.parse(localStorage.getItem('user'))
        db.collection('userProfile')
            .where('uid', '==', userProfile.uid)
            .get()
            .then((snapshot) => {
                const user = snapshot.docs[0].data()
                const arClasses = user.arClasses || ['active', 'active', 'active', 'active', 'active', 'active']
                this.setState({arClasses: arClasses})
            })
    }

    async componentDidMount() {
        await this.getUserProfile();
        await this.getGoogleSheetsData();
    }

    changeCheckbox = (checkbox) => {
        console.log('Im here');
        if (checkbox === 'activeCheckbox') {
            this.setState({activeCheckbox: !this.state.activeCheckbox})
        }
        if (checkbox === 'completedCheckbox') {
            this.setState({completedCheckbox: !this.state.completedCheckbox})
        }
        if (checkbox === 'disabledCheckbox') {
            this.setState({disabledCheckbox: !this.state.disabledCheckbox})
        }
        // this.setState({[checkbox]: !this.state[checkbox]})
    }

    filterCards(cardModel) {
        let active = [];
        let completed = [];
        let disabled = [];
        if (this.state.vrclasses.length === 0) return [];
        if (this.state.activeCheckbox && this.state.disabledCheckbox && this.state.completedCheckbox) return this.state.vrclasses;
        if (this.state.activeCheckbox) {
            active = this.state.vrclasses.filter((el, index) => {
                return this.state.arClasses[index] === 'active'
            });
        }
        if (this.state.completedCheckbox) {
            completed = this.state.vrclasses.filter((el, index) => {
                return this.state.arClasses[index] === 'completed'
            });
        }
        if (this.state.disabledCheckbox) {
            disabled = this.state.vrclasses.filter((el, index) => {
                return this.state.arClasses[index] === 'disabled'
            });
        }
        return [...completed, ...active, ...disabled];
    }

    getUrlForAr(id) {
        return `/ar/${id}`
    }

    renderClass(cardClass, index) {
        return (
            <div key={cardClass.id}
                 className={`card-class ${['disabled', 'completed'].includes(this.state.arClasses[index]) ? 'no-event' : ''}`}
                 onClick={() => {
                     if (cardClass.status === 'disabled') {
                         return ''
                     } else {
                         this.props.history.push(this.getUrlForAr(cardClass.id))}
                    }
                 }
            >
                {this.state.arClasses[index] !== "active" &&
                    <div className={`card-class-status ${this.state.arClasses[index] === "disabled" ? "disabled" : "completed"}`}/>
                }
                {cardClass.status !== 'active' &&
                    <div className={`card-class-status ${cardClass.status === "disabled" ? "disabled" : ""}`}/>
                }
                <div className='card-class-inner'>
                    <div className='card-class-front'>
                        <div className='photo-card' style={{backgroundImage: `url("${cardClass.photo}")`}}/>
                        <div className='title-card'>{cardClass.title}</div>
                    </div>
                    <div className='card-class-back'>
                        <div className='content-card'>{cardClass.content}</div>
                    </div>
                </div>
            </div>
        )
    }

    renderFilterSection = () => {
        return (
            <div className='events-container'>
                <span className='radio-buttons-container' onClick={() => this.changeCheckbox('activeCheckbox')}>
                            <div className='checkbox-container'/>
                            <div className={`checkbox-button darker ${this.state.activeCheckbox ? 'checked' : ''}`}/>
                            <div className="text">Active Classes </div>
                </span>
                <span className='radio-buttons-container' onClick={() => this.changeCheckbox('disabledCheckbox')}>
                            <div className='checkbox-container'/>
                            <div className={`checkbox-button darker ${this.state.disabledCheckbox ? 'checked' : ''}`}/>
                            <div className="text">Disabled Classes</div>
                </span>
                <span className='radio-buttons-container' onClick={() => this.changeCheckbox('completedCheckbox')}>
                            <div className='checkbox-container'/>
                            <div className={`checkbox-button darker ${this.state.completedCheckbox ? 'checked' : ''}`}/>
                            <div className="text">Completed Classes</div>
                </span>
            </div>
        )
    }

    render() {
        const vrclasses = this.filterCards();
        return (
            <div className='page-homepage'>
                <div className='container-of-classes'>
                    {this.renderFilterSection()}
                    <div className='ddandh'>
                        <div className='form-title-1'>Here are your</div>
                        <Dropdown
                            title="Mathematics"
                            list={this.state.classes}
                        />
                        <div className='form-title-2'> lessons</div>
                    </div>
                    {this.state.loading
                        ? <SpinnerLoader/>
                        : vrclasses.length === 0
                            ? <div className='empty-list'>We're sorry, but you have no classes left</div>
                            : <React.Fragment>
                                {vrclasses.map((el, index) => this.renderClass(el, index))}
                                <div className='button-container'>
                                    <div className='action-button' onClick={() => {
                                        this.props.history.push('/quiz/math1')
                                    }}>
                                        Start your first quiz
                                    </div>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}
