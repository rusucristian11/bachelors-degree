import React from 'react';
import './Attendance.scss';
import Dropdown from "../../components/Dropdown/Dropdown";
import Tabletop from "tabletop";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

export default class Attendance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [2021],
            currentReport: null,
            loading: true,
            width: 0,
            classes: [],
        };
    }

    componentDidMount() {
        Tabletop.init({
                key: '1s8cBN1wWcSLdRnQ_TFf5SbQAc90jfvyXXZMy9DZJS8w',
                simpleSheet: true
            }
        ).then((data) => {
            let ceva = data.map((el) => {return {...el, selected: el.selected === "TRUE"}});
            this.setState({classes: [...ceva]})
        })

        Tabletop.init({
                key: '1R03lJrvAVvssTHwvnDQDyy-n86kkLp4BHtlNNugL2xc',
                simpleSheet: true
            }
        ).then((data) => {
            let result = {year: 2021, students: {}};
            data.forEach((el) => {
                result.students[el.student] = {
                    class1: el.class1 === "TRUE",
                    class2: el.class2 === "TRUE",
                    class3: el.class3 === "TRUE",
                    class4: el.class4 === "TRUE",
                    class5: el.class5 === "TRUE",
                    class6: el.class6 === "TRUE",
                    quiz: el.quiz,
                }
            })
            this.setState({currentReport: {...result}, loading: false})
        })

    }


    renderValuesRental(el, index, type) {
        const currentReport = this.state.currentReport.students;
        return (
            <div className='class-check' key={index}>
              <span className='radio-buttons-container'>
                              <div className='checkbox-container'/>
                              <div className={`checkbox-button darker ${currentReport[el][type] ? 'checked' : ''}`}/>
              </span>
            </div>
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                <div className='quiz-results-container'>
                    {Object.keys(this.state.currentReport.students).map((el, index) => {
                        return (
                            <div className='student-container' key={index}>
                                <div className='student-name'>{el}</div>
                            </div>
                        )
                    })}
                </div>
                <div className='chart-row-container'>
                    {Object.keys(this.state.currentReport.students).map((el, index) => {
                        return (
                            <div className='chart-container' key={index}>
                                <div style={{height: this.state.currentReport.students[el].quiz + 'px', textAlign: 'center', color: 'white'}}>
                                    {this.state.currentReport.students[el].quiz}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Triangle</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class1')
                                }
                            )
                        }
                    </div>
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Square</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class2')
                                }
                            )
                        }
                    </div>
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Circle</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class3')
                                }
                            )
                        }
                    </div>
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Rectangle</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class4')
                                }
                            )
                        }
                    </div>
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Pentagon</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class5')
                                }
                            )
                        }
                    </div>
                </div>
                <div className='class-row-container'>
                    <div className='class-row-title'>Hexagon</div>
                    <div className='class-row-values'>
                        {
                            Object.keys(this.state.currentReport.students).map(
                                (el, index) => {
                                    return this.renderValuesRental(el, index, 'class6')
                                }
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderPage() {
        return (
            <React.Fragment>
                <div className='header-reports-container'>
                    <div className='header-left-side'>
                        <div className='header-title'>Attendance</div>
                        <div className='header-year'>{this.state.currentReport.year}</div>
                        <Dropdown
                            title="Mathematics"
                            list={this.state.classes}
                        />
                    </div>
                    <div className='header-right-side'>
                        <div className='button-download'/>
                        <div className='button-print'/>
                    </div>
                </div>
                <div className='table-container'>
                    {this.renderContent()}
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className='page page-reports'>
                <div className='rounded-card rounded-card-reports'>
                    {this.state.loading
                        ? <SpinnerLoader />
                        : this.renderPage()
                    }
                </div>
            </div>
        )
    }
}
