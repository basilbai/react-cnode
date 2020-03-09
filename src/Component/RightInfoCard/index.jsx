import React from 'react';
import { Card, Divider } from 'antd';
import styles from './index.module.scss'
export default class Index extends React.Component {

    render() {
        return (
            <div className={styles.box}>
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
                    <a href="https://www.aliyun.com/product/nodejs?ref=cnode" >
                        <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" />
                    </a>
                    <Divider style={{ margin: '5px 0' }} />
                    <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc_540_130&amp;utm_campaign=huodong&amp;utm_content=gift&amp;ytag=cnodejs" >
                        <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" />
                    </a>
                    <Divider style={{ margin: '5px 0' }} />
                    <a href="http://hdxu.cn/JH9N4">
                        <img src="//static.cnodejs.org/FmtZUu1sKOe0VfmHKIhwYVYIItux" />
                    </a>
                </Card>
                <Card style={{ marginTop: 10 }} title='友情社区' >
                    <a href="https://ruby-china.org/" >
                        <img style={{ width: 150 }} src="//static2.cnodejs.org/public/images/ruby-china-20150529.png" />
                    </a>
                    <Divider style={{ margin: '5px 0' }} />
                    <a href="http://phphub.org/" >
                        <img style={{ width: 150 }} src="//static2.cnodejs.org/public/images/phphub-logo.png" />
                    </a>
                </Card>
                <Card style={{ marginTop: 10 }} title='客户端二维码' >
                    <div className={styles.cnode_app_download} >
                        <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" />
                        <br />
                        <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
                    </div>
                </Card>
            </div>
        )
    }
}