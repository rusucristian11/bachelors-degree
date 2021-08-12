import React from "react";
import './Dropdown.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            headerTitle: this.props.title
        }
    }

    toggleList = () => {
        this.setState(prevState => ({
            isListOpen: !prevState.isListOpen
        }))
    }

    selectItem = (item) => {
        const { resetThenSet } = this.props;
        const { title, id, key } = item;

        this.setState({
            headerTitle: title,
            isListOpen: false,
        }, () => resetThenSet(id, key));
    }

    render(){
        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;

        return (
            <div className="dd-wrapper">
                <div
                    type="button"
                    className="dd-header"
                    onClick={this.toggleList}
                >
                    <div className="dd-header-title">{headerTitle}</div>
                    {isListOpen
                        ?  <FontAwesomeIcon icon={faAngleDown} />
                        :  <FontAwesomeIcon icon={faAngleUp} />}
                </div>
                {isListOpen && (
                    <div
                        role="list"
                        className="dd-list"
                    >
                        {list.map((item) => (
                            <div
                                type="button"
                                className="dd-list-item"
                                key={item.id}
                                onClick={() => this.selectItem(item)}
                            >
                                {item.title}
                                {' '}
                                {item.selected && <FontAwesomeIcon icon={faCheck}/>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
