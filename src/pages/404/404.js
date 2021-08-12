import React from 'react';
import './404.scss'

export default class NotFoundPage extends React.Component {

    render() {
        return(
            <section className="page_404">
                <div className={'container'}>
                    <h1>Oops!</h1>
                    <div className="four_zero_four_bg">
                        <h1 className="text-center ">404</h1>
                    </div>
                    <h1>We can't seem to find the page you were looking for.</h1>
                </div>
            </section>
        )
    }
}