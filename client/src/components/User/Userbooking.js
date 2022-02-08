/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Tag, Modal, Button, Space } from 'antd';
import Swal from 'sweetalert2'
import Loader from '../../components/Loader';

function Userbooking() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(async () => {

        try {
            setLoading(true)
            const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
            console.log(data);
            setBookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }, [])

    async function cancelBooking(bookingid, roomid) {

        try {
            setLoading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result);
            setLoading(false)
            Swal.fire('Thành công', 'Bạn đã huỷ phòng', 'success').then(result => {
                window.location.reload()            
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire('OOps', 'Bạn không thể huỷ phòng', 'error')
        }
    }

    function showDeleteConfirm(e) {
        const { confirm } = Modal
        var id = e.currentTarget.getAttribute("data-id")
        var roomid = e.currentTarget.getAttribute("data-roomid")
        // console.log(e.currentTarget.getAttribute("data-id"));
        // console.log(e.currentTarget.getAttribute("data-roomid"));
        confirm({
            title: 'Bạn có chắc muốn huỷ phòng?',
            content: 'Huỷ phòng nhé',
            okText: 'YES',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                cancelBooking(id, roomid)
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div>
            {loading && (<Loader />)}
            {bookings && (bookings.map(booking => {
                return (
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-5 mt-2" style={{ paddingBottom: '10px' }}>
                            <div className="bs">
                                <p>Homestay: {booking.room}</p>
                                <p>Tên khách hàng: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>Thời gian bắt đầu: {booking.fromdate}</p>
                                <p>Thời gian kết thúc: {booking.todate}</p>
                                <p>Tổng chi phí: {booking.totalamount}</p>
                                <p>
                                    Trạng thái: {booking.status === 'Đã huỷ' ? (<Tag color="red">Đã huỷ</Tag>) : (<Tag color="green">Đã thanh toán</Tag>)}
                                </p>
                                {booking.status !== 'Đã huỷ' && (
                                    <div style={{ textAlign: 'right' }}>
                                        <Space wrap>
                                            <Button className="btn btn-primary" style={{backgroundColor: 'red', color:'white'}} data-id={booking._id} data-roomid={booking.roomid}
                                                onClick={showDeleteConfirm}>Huỷ phòng</Button>
                                        </Space>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }))}
        </div>
    )
}

export default Userbooking
