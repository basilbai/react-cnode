import React from 'react';
import { Row, Col } from 'antd';
import { HomeList, RightInfoCard } from '../index';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={18}>
                    <HomeList />
                </Col>
                <Col span={6}>
                    <RightInfoCard />
                </Col>
            </Row>
        )
    }
}