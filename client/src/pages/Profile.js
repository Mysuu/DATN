import React from 'react'
import { Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Userprofile from '../components/User/Userprofile'

const { TabPane } = Tabs

function Profile() {

    return (
        <div>
            <Tabs defaultActiveKey="2" centered>
                <TabPane tab={
                    <span>
                        <UserOutlined />
                        Thông tin cá nhân
                    </span>
                } key="1">
                    <Userprofile />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profile
