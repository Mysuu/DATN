/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import Loader from '../Loader';
import Error from '../Error';

function Roomslist() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()


    useEffect(async () => {
        try {
            const data = await (await axios.get("api/rooms/getallrooms")).data
            setRooms(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }, [])

    async function deleteRoom(reqObj) {
        console.log(reqObj);

        try {
            setLoading(true)
            const result = await (await axios.post("/api/rooms/deleteroom", reqObj )).data
            console.log(result);
            setLoading(false)
            Swal.fire('Thành công', 'Bạn đã xoá phòng thành công', 'success').then(result => {
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
            <div className='col-md-12'>
                <h3 style={{ textAlign: 'center' }}>Danh sách homestay</h3>
                {loading && (<Loader />)}

                <table className="table table-bordered table-dark">
                    <thead className='bs'>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Mã phòng</th>
                            <th style={{ textAlign: 'center' }}>Tên phòng</th>
                            <th style={{ textAlign: 'center' }}>Địa chỉ phòng</th>
                            <th style={{ textAlign: 'center' }}>Loại phòng</th>
                            <th style={{ textAlign: 'center' }}>Giá mỗi ngày</th>
                            <th style={{ textAlign: 'center' }}>Số người</th>
                            <th style={{ textAlign: 'center' }}>Liên hệ</th>
                            <th style={{ textAlign: 'center' }}>Sửa phòng</th>
                            <th style={{ textAlign: 'center' }}>Xoá phòng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{room._id}</td>
                                    <td style={{ textAlign: 'center' }}>{room.name}</td>
                                    <td style={{ textAlign: 'center' }}>{room.address}</td>
                                    <td style={{ textAlign: 'center' }}>{room.type}</td>
                                    <td style={{ textAlign: 'center' }}>{room.rentperday}</td>
                                    <td style={{ textAlign: 'center' }}>{room.maxcount}</td>
                                    <td style={{ textAlign: 'center' }}>{room.phonenumber}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Link to={`/editroom?roomid=${room._id}`}>
                                            <EditOutlined className="text-warning" />
                                        </Link>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Popconfirm
                                            title="Bạn có chắc muốn xoá phòng?"
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            placement="leftBottom"
                                            onConfirm={() => {deleteRoom({ roomid: room._id })}}
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
                            )
                        }))}
                    </tbody>
                </table>
                {error && <Error />}
            </div>
        </div>
    )
}

export default Roomslist
