import React from 'react';
import { Row, Col, Card, Divider, Comment, List, Avatar, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';

import './Topic.scss'

const TypeMap = {
    'ask': '问答',
    'job': '招聘',
    'good': '精华',
    'share': '分享',

}
export default class Topic extends React.Component {
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
            // !data ? <Spin size="large" /> :
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={18}>
                    <Card bordered={false} loading={loading}>
                        {data && <>
                            <p className="topic_full_title">{data.title}</p>
                            <div className='changes'>
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
                    <Card title="关于">
                        <p>CNode：Node.js专业中文社区</p>
                        <p>在这里你可以：</p>
                        <ul>
                            <li>向别人提出你遇到的问题</li>
                            <li>帮助遇到问题的人</li>
                            <li>分享自己的知识</li>
                            <li>和其它人一起进步</li>
                        </ul>
                    </Card>
                    <Card style={{ marginTop: 10 }} >
                        <a href="https://www.aliyun.com/product/nodejs?ref=cnode" target="_blank" class="banner sponsor_outlink" data-label="alinode">
                            <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" />
                        </a>
                        <Divider style={{ margin: '5px 0' }} />
                        <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc_540_130&amp;utm_campaign=huodong&amp;utm_content=gift&amp;ytag=cnodejs" target="_blank" class="banner sponsor_outlink" data-label="ucloud-banner">
                            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" />
                        </a>
                        <Divider style={{ margin: '5px 0' }} />
                        <a href="http://hdxu.cn/JH9N4" target="_blank" class="banner sponsor_outlink" data-label="qiniu-sidebar">
                            <img src="//static.cnodejs.org/FmtZUu1sKOe0VfmHKIhwYVYIItux" />
                        </a>
                    </Card>
                    <Card style={{ marginTop: 10 }} title='友情社区' >
                        <a href="https://ruby-china.org/" target="_blank">
                            <img style={{ width: 150 }} src="//static2.cnodejs.org/public/images/ruby-china-20150529.png" />
                        </a>
                        <Divider style={{ margin: '5px 0' }} />
                        <a href="http://phphub.org/" target="_blank">
                            <img style={{ width: 150 }} src="//static2.cnodejs.org/public/images/phphub-logo.png" />
                        </a>
                    </Card>
                    <Card style={{ marginTop: 10 }} title='客户端二维码' >
                        <div class="cnode_app_download">
                            <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" />
                            <br />
                            <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
                        </div>
                    </Card>
                </Col>
            </Row>
        )

    }
}