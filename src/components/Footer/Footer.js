import React from 'react'
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";


export default class Footer extends React.Component {

    render() {
        const location = this.props.history?.location.pathname;
        if (!location) return '';
        if (['/login', '/forgot-password', '/registration-complete', '/reset-password', '/register', '/ar'].includes(location))
            return null
        if (location.includes('ar/')) {
            return null
        }
        return (
            <React.Fragment>
            <div className={'Footer'}>
                <div className={'footer-first-row'}>
                    <div className={'more-info'}>
                        <div className={'subtext'}>
                            <FontAwesomeIcon icon={faAt} />
                            <a className="mailto" href="mailto:augmentedreality11@gmail.ro">augmentedreality11@gmail.ro</a>
                        </div>
                        <div className={'subtext'}>
                            <FontAwesomeIcon icon={faPhone} />
                            <a className="phoneto" href="tel:(+40) 324 433 183">(+40) 324 433 183</a>
                        </div>
                    </div>
                    <div className={'usefull-links'}>
                        <div className={'social-media'}>
                            <a href={'https://sparkar.facebook.com/ar-studio/'} target="_blank" rel="noreferrer"><FontAwesomeIcon size={'2x'} icon={faFacebook} /></a>
                            <a href={'https://twitter.com/ar_fr?lang=en'} target="_blank" rel="noreferrer"><FontAwesomeIcon size={'2x'} icon={faTwitter} /></a>
                            <a href={'https://www.youtube.com/watch?v=H7ZHemE2nRs'} target="_blank" rel="noreferrer"><FontAwesomeIcon size={'2x'} icon={faYoutube} /></a>
                            <a href={'https://www.instagram.com/augmentedrealitytech/'} target="_blank" rel="noreferrer"><FontAwesomeIcon size={'2x'} icon={faInstagram} /></a>
                        </div>
                    </div>
                </div>
                <div className={'footer-second-row'}>
                    © 2021 Augmented Reality
                </div>
            </div>
            </React.Fragment>
        )
    }
}
