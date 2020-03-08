import React from 'react';
import { Row, Col, Layout, Input, BackTop } from 'antd';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContent from './Content';
import Topic from './Topic';

import styles from './App.module.scss';
const { Header, Content, Footer } = Layout;
const { Search } = Input;


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className={styles.App}>
        <Header className={styles.navbar}>
          <Row align="middle" justify="center">
            <Col className="gutter-row" span={3}>
              <div className={styles.brand}>
                <img alt='111' src="//static2.cnodejs.org/public/images/cnodejs_light.svg" />
              </div>
            </Col>
            <Col className="gutter-row" span={3} style={{ marginLeft: 0 }}>
              <Search className={styles.search} />
            </Col>
            <Col className="gutter-row" span={18}>
              <div className={styles.nav}>
                <a>首页</a>
                <a>新手入门</a>
                <a>API</a>
                <a>关于</a>
                <a>注册</a>
                <a>登录</a>
              </div>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          <Router>
            <Route path="/" exact component={HomeContent} />
            <Route path="/topic/:id" component={Topic} />
          </Router>
        </Content>
        <Footer>Footer</Footer>
        <BackTop  visibilityHeight={100}/>
      </div>
    );
  }
}