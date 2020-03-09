import React from 'react';
import { Tabs, List, Avatar, Card } from 'antd';
import moment from 'moment';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';
import { StickyContainer, Sticky } from 'react-sticky';

import styles from './index.module.scss'

const { TabPane } = Tabs;

const NavMap = [
    {
        key: 'all',
        tab: "全部"
    },
    {
        key: 'good',
        tab: "精华"
    },
    {
        key: 'share',
        tab: "分享"
    },
    {
        key: 'ask',
        tab: "问答"
    },
    {
        key: 'job',
        tab: "招聘"
    },
    {
        key: 'dev',
        tab: "客户端测试"
    },
]

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
        this.pageNum = 0;
        this.pageSize = 20;
        this.tab = "all";
    }
    componentDidMount() {
        this.fetchData(res => this.setState({ data: res, loading: false }));
    }
    fetchData = callback => {
        this.setState({ loading: true }, () => {
            axios(`https://cnodejs.org/api/v1/topics?page=${this.pageNum}&limit=${this.pageSize}&tab=${this.tab}`)
                .then(res => {
                    callback(res.data.data)
                })
        })
    };
    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.pageNum++;
        this.fetchData(res => {
            if (res.length > 0) {
                this.setState({
                    data: data.concat(res),
                    loading: false,
                });
            } else {
                this.setState({
                    hasMore: true,
                    loading: false
                });
            }
        });
    }
    renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => (
                <DefaultTabBar {...props} className="site_custom_tab_bar" style={{ ...style }} />
            )}
        </Sticky>
    );
    onTabsChange = activeKey => {
        this.pageNum = 1;
        this.tab = activeKey;
        this.setState({ data: [] }, () => {
            this.fetchData(res => this.setState({ data: res, loading: false }));
        })
    }
    render() {
        const { data, loading, hasMore } = this.state;
        return (
            <Card bordered={false} className={styles.box}>
                <StickyContainer>
                    <Tabs onChange={this.onTabsChange} defaultActiveKey="all" renderTabBar={this.renderTabBar}>
                        {
                            NavMap.map((value, index) => (
                                <TabPane tab={value.tab} key={value.key} >
                                    <Scrollbars id='list-scrollbars' style={{ height: "calc(150vh)" }} autoHide >
                                        <InfiniteScroll
                                            initialLoad={false}
                                            pageStart={0}
                                            loadMore={this.handleInfiniteOnLoad}
                                            hasMore={!loading && hasMore}
                                            useWindow={false} >
                                            <List
                                                loading={loading}
                                                itemLayout="horizontal"
                                                dataSource={data}
                                                renderItem={item => (
                                                    <List.Item extra={moment([item.create_at]).fromNow()}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={item.author.avatar_url} />}
                                                            title={<a href={`/topic/${item.id}`}>{item.title}</a>}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </InfiniteScroll>
                                    </Scrollbars>
                                </TabPane>
                            ))
                        }
                    </Tabs>
                </StickyContainer>
            </Card>
        )
    }

}