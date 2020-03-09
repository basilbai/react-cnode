import React from 'react';
import { Layout, BackTop } from 'antd';

import { Header, Content, Footer } from './Component';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <>
        <Header />
        <Content />
        <Footer />
        <BackTop visibilityHeight={100} />
      </>
    );
  }
}