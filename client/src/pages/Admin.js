import React, {useEffect} from 'react'
import { Tabs } from 'antd'
import { HomeOutlined, FolderAddOutlined, UserOutlined, FolderViewOutlined } from '@ant-design/icons'
import Bookingslist from '../components/Admin/Bookinglist'
import Roomslist from '../components/Admin/Roomlist'
import Userslist from '../components/Admin/Userlist'
import Addroom from '../components/Admin/Addroom'

const { TabPane } = Tabs
function Admin() {
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/'
        }
    })
    return (
        <div>
            <Tabs defaultActiveKey="1" centered>
                <TabPane
                    tab={
                        <span>
                            <HomeOutlined />
                            Danh sách homestay
                        </span>
                    }
                    key="1"
                >
                    <Roomslist />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FolderAddOutlined />
                            Thêm phòng
                        </span>
                    }
                    key="2"
                >
                    <Addroom />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FolderViewOutlined />
                            Danh sách phòng đã được đặt
                        </span>
                    }
                    key="3"
                >
                    <Bookingslist />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            Danh sách người dùng
                        </span>
                    }
                    key="4"
                >
                    <Userslist />
                </TabPane>
                
            </Tabs>,
        </div>
    )
}

export default Admin
