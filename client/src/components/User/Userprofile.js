/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

function Userprofile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    console.log(user);
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-5 mt-2" style={{ paddingBottom: '10px' }}>
                <div className="bs">
                    <h1>Thông tin cá nhân</h1>
                    <br />
                    <h3>Họ và tên: {user.name}</h3>
                    <h3>Email: {user.email}</h3>
                    <h3>Mật khẩu: {user.password}</h3>
                    <h3>Quyền Admin: {user.isAdmin ? 'Có' : 'Không'}</h3>
                    <div style={{textAlign:'right'}}>
                        <Link to={`/edituser?userid=${user._id}`}>
                            <EditOutlined className="text-warning" style={{ fontSize: '30px' }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile
