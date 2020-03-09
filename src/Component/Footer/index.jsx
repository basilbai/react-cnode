import React from 'react';
import { Layout } from 'antd';
import styles from './index.module.scss';

export default class Index extends React.Component {

    render() {
        return (
            <Layout.Footer className={styles.box}>
                <div>Copyright {new Date().getFullYear()} Basil</div>
                <a href="https://github.com/basilbai/react-cnode">GitHub地址</a>
            </Layout.Footer>
        )
    }
}