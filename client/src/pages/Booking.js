/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useLocation, useNavigate } from "react-router-dom";
import * as qs from "query-string";
import Swal from 'sweetalert2'
import StripeCheckout from 'react-stripe-checkout';
import Loader from 'react-spinners/MoonLoader';
import Error from '../components/Error';

function Booking() {
    const { search } = useLocation();
    let parsed = qs.parse(search);
    let navigate = useNavigate()

    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const roomid = parsed?.roomid
    const fromdate = moment(parsed?.fromdate, 'DD-MM-YYYY')
    const todate = moment(parsed?.todate, 'DD-MM-YYYY')
    const [totalamount, setTotalamount] = useState()

    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1

    useEffect(async () => {

        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }

        try {
            setLoading(true)
            const data = (await axios.post('/api/rooms/getroombyid', { roomid: parsed?.roomid })).data
            setTotalamount(data.rentperday * totaldays)
            setRoom(data)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, [])

    async function onToken(token){
        console.log(token);
        const bookingDetails = {
            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            nameuser:JSON.parse(localStorage.getItem('currentUser')).name,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setLoading(false)
            Swal.fire('Thành công', 'Phòng đã được đặt', 'success').then(result=>{
                navigate('/booked')
            })
        } catch (error) {
            setLoading(false)
            Swal.fire('OOps', 'Xin vui lòng thử lại', 'error')
        }
    }

    return (
        <div className='m-5'>
            {loading ? (<Loader />) : room ? (<div>
                <div className="row justify-content-center mt-5 bs">
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-6'>
                    <div style={{ textAlign: 'right' }}>
                            <h3>Chi tiết</h3>
                            <hr />
                            <b>
                                <p>Họ và tên: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>Địa chỉ: {room.address}</p>
                                <p>Thời gian bắt đầu: {parsed?.fromdate}</p>
                                <p>Thời gian kết thúc: {parsed?.todate}</p>
                                <p>Số người tối đa: {room.maxcount}</p>
                                <p>Tổng số ngày: {totaldays}</p>
                                <p>Giá mỗi ngày: {room.rentperday}</p>
                                <p>Tổng tiền: {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right', marginTop:'100px' }}>
                            <StripeCheckout
                                amount={totalamount}
                                token={onToken}
                                currency='VND'
                                stripeKey="pk_test_51K3iObGUuPPCLEZEEZGJ7j7WqfKp8czveoGH323v6fVxGjG03z8V1s2qzloSVUEsRM302J4pgKYwtGZwitilAxzd00CwKknJDR"
                            >
                                <button className="btn btn-primary">Đặt ngay</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    )
}

export default Booking
