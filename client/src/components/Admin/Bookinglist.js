/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../Loader';
import Error from '../Error';

function Bookingslist() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(async()=>{
        try {
            const data = await (await axios.get("api/bookings/getallbookings")).data
            setBookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h3 style={{textAlign: 'center'}}>Danh sách phòng được đặt</h3>
                {loading && (<Loader/>)}

                <table className="table table-bordered table-dark">
                    <thead className='bs'>
                        <tr>
                            <th style={{textAlign:'center'}}>Mã phòng</th>
                            <th style={{textAlign:'center'}}>Mã khách hàng</th>
                            <th style={{textAlign:'center'}}>Phòng</th>
                            <th style={{textAlign:'center'}}>Từ ngày</th>
                            <th style={{textAlign:'center'}}>Đến ngày</th>
                            <th style={{textAlign:'center'}}>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return(
                                <tr>
                                    <td style={{textAlign:'center'}}>{booking._id}</td>
                                    <td style={{textAlign:'center'}}>{booking.userid}</td>
                                    <td style={{textAlign:'center'}}>{booking.room}</td>
                                    <td style={{textAlign:'center'}}>{booking.fromdate}</td>
                                    <td style={{textAlign:'center'}}>{booking.todate}</td>
                                    <td style={{textAlign:'center'}}>{booking.status}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
                {error && <Error message='F5 lại đii :>'/>}
            </div>
        </div>
    )
}

export default Bookingslist
