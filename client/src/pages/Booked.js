import React from 'react'
import { Tabs } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import Userbooking from '../components/User/Userbooking'
const { TabPane } = Tabs

function Profile() {
    return (
        <div>
            <Tabs defaultActiveKey="2" centered>
                <TabPane tab={
                    <span>
                        <HomeOutlined />
                        Phòng đã đặt
                    </span>
                } key="2">
                    <Userbooking />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profile
