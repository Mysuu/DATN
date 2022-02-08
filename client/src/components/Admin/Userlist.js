import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Popconfirm } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2';
import Loader from '../Loader';
import Error from '../Error';

function Userslist() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const data = await (await axios.get("api/users/getallusers")).data
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }, [])
    
    async function deleteUser(reqObj) {
        console.log(reqObj);

        try {
            setLoading(true)
            const result = await (await axios.post("/api/users/deleteuser", reqObj )).data
            console.log(result);
            setLoading(false)
            Swal.fire('Thành công', 'Bạn đã xoá khách hàng thành công', 'success').then(result => {
                window.location.href='/admin'
            })

        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire('OOps', 'Bạn không thể xoá phòng', 'error')
        }

    }

    return (
        <div className='row'>
            <div className="col-md-12">
                <h3 style={{ textAlign: 'center' }}>Danh sách người dùng</h3>
                {loading && (<Loader />)}

                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Mã tài khoản</th>
                            <th style={{ textAlign: 'center' }}>Họ và tên</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Quyền Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td style={{ textAlign: 'center' }}>{user._id}</td>
                                <td style={{ textAlign: 'center' }}>{user.name}</td>
                                <td style={{ textAlign: 'center' }}>{user.email}</td>
                                <td style={{ textAlign: 'center' }}>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Popconfirm
                                        title="Bạn có chắc muốn xoá phòng?"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        placement="leftBottom"
                                        onConfirm={() => { deleteUser({ userid: user._id }) }}
                                        okText="Chắc"
                                        okType='danger'
                                        cancelText="Không"
                                    >
                                        <DeleteOutlined
                                            style={{ color: "red", cursor: "pointer" }}
                                        />
                                    </Popconfirm>
                                </td>
                            </tr>
                        }))}
                    </tbody>
                </table>
                {error && <Error />}
            </div>
        </div>
    )
}

export default Userslist
