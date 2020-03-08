import React from 'react';
import './Content.scss'

import { Row, Col, Card, Tabs, List, Avatar, Divider } from 'antd';
import moment from 'moment';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';
import { StickyContainer, Sticky } from 'react-sticky';
const { TabPane } = Tabs;

moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})
export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
        this.pageNum = 0;
        this.pageSize = 20;
    }
    componentDidMount() {
        this.fetchData(res => this.setState({ data: res, loading: false }))
    }
    fetchData = callback => {
        this.setState({ loading: true }, () => {
            axios(`https://cnodejs.org/api/v1/topics?page=${this.pageNum}&limit=${this.pageSize}`)
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
    render() {
        const { data, loading, hasMore } = this.state;
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={18}>
                    <Card bordered={false}>
                        <StickyContainer>
                            <Tabs defaultActiveKey="1" renderTabBar={this.renderTabBar}>
                                <TabPane tab="全部" key="1" >
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
                                <TabPane tab="分享" key="2">
                                    Content of Tab Pane 2
    </TabPane>
                                <TabPane tab="精华" key="3">
                                    Content of Tab Pane 3
    </TabPane>
                                <TabPane tab="回答" key="4">
                                    Content of Tab Pane 3
    </TabPane>
                                <TabPane tab="招聘" key="5">
                                    Content of Tab Pane 3
    </TabPane>
                                <TabPane tab="客户端测试" key="6">
                                    Content of Tab Pane 3
    </TabPane>

                            </Tabs>
                        </StickyContainer>
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