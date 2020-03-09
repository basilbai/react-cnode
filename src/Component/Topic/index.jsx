import React from 'react';
import { Row, Col, Card, Divider, Comment, List, Avatar, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { RightInfoCard } from '../index';
import styles from './index.module.scss';


const TypeMap = {
    'ask': '问答',
    'job': '招聘',
    'good': '精华',
    'share': '分享',

}
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: false
        };
        this.id = this.props.match.params.id;
    }
    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios(`https://cnodejs.org/api/v1/topic/${this.id}`)
                .then(res => {
                    this.setState({ data: res.data.data, loading: false })
                })
        })
    }
    render() {
        const { data, loading } = this.state;
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={18}>
                    <Card bordered={false} loading={loading}>
                        {data && <>
                            <p className={styles.topic_full_title}>{data.title}</p>
                            <div className={styles.changes}>
                                <span>• 发布于{moment(data.create_at).fromNow()}</span>
                                <span>• 作者 {data.author.loginname}</span>
                                <span>• {data.visit_count}次浏览</span>
                                <span>• 来自{TypeMap[data.tab]}</span>
                            </div>
                            <Divider />
                            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        </>}
                    </Card>
                    <Card bordered={false} loading={loading} style={{ marginTop: 25 }}>
                        {
                            data && <List
                                split
                                locale={{ emptyText: '暂无回复' }}
                                header={`${data.reply_count}个回复`}
                                itemLayout="horizontal"
                                dataSource={data.replies}
                                renderItem={item => (
                                    <Comment
                                        author={item.author.loginname}
                                        avatar={item.author.avatar_url}
                                        content={<div dangerouslySetInnerHTML={{ __html: item.content }}></div>}
                                        datetime={moment(item.create_at).fromNow()}
                                    />
                                )}
                            />
                        }

                    </Card>
                </Col>
                <Col span={6}>
                    <RightInfoCard />
                </Col>
            </Row>
        )
    }
}