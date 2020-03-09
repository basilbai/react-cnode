import React from 'react';
import { Row, Col, Layout } from 'antd';
import styles from './index.module.scss';

export default class Index extends React.Component {

    render() {
        return (
            <Layout.Header className={styles.navbar}>
                <Row align="middle" justify="center">
                    <Col span={6}>
                        <a href="/" >
                            <img className={styles.brand} alt='brand' src="//static2.cnodejs.org/public/images/cnodejs_light.svg" />
                        </a>
                    </Col>
                    <Col span={18}>
                        <div className={styles.nav}>
                            <a href="/">首页</a>
                            <a>新手入门</a>
                            <a>API</a>
                            <a>关于</a>
                            <a>注册</a>
                            <a>登录</a>
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
        )
    }
}