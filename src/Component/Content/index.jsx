import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'antd';
import { Home, Topic } from '../index';
import styles from './index.module.scss';


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Layout.Content className={styles.content}>
                <Router>
                    <Route path="/" exact component={Home} />
                    <Route path="/topic/:id" component={Topic} />
                </Router>
            </Layout.Content>
        )
    }
}