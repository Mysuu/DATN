/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { DatePicker, Carousel } from 'antd';
import moment from 'moment';
import Room from '../components/Room'
import Loader from '../components/Loader'
import logo1 from '../images/logo1.jpeg'
import logo2 from '../images/logo2.jpg'
import logo3 from '../images/logo3.jpeg'
import logo4 from '../images/logo4.jpeg'
import logo from '../images/logo-svg.svg'

const format = "DD/MM/YYYY";
const { RangePicker } = DatePicker;
function Homescreen() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const [fromdate, setFromdate] = useState(moment().format(format))
    const [todate, setTodate] = useState()
    const [duplicaterooms, setDuplicaterooms] = useState([])

    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')

    useEffect(async () => {
        try {
            setLoading(true)
            const data = (await axios.get('/api/rooms/getallrooms')).data
            console.log(data);

            setRooms(data)
            setDuplicaterooms(data)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setError(true)
            setLoading(false)
        }
    }, [])

    function filterByDate(dates) {
        setFromdate(moment(dates[0]).format('DD-MM-YYYY'))
        setTodate(moment(dates[1]).format('DD-MM-YYYY'))

        var temprooms = []

        for (var room of duplicaterooms) {
            var availability = false
            for (var booking of room.currentbookings) {
                if (room.currentbookings.length > 0) {
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                    ) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            availability = true
                        }
                    }
                }
            }
            if (availability === true || room.currentbookings.length === 0) {
                temprooms.push(room)
            }
            setRooms(temprooms)
        }
    }

    function filterBySearch() {
        const tempr = duplicaterooms.filter(room => room.address.toLowerCase().includes(search.toLowerCase()))
        setRooms(tempr)
    }

    function filterByType(e) {
        setType(e)
        if (e !== 'all') {
            const tempr = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase())
            setRooms(tempr)
        }
        else {
            setRooms(duplicaterooms)
        }
    }

    return (
        <div>
            <div className='123456' style={{
                position: 'sticky',
                top: '0',
                zIndex: '-1',
            }}>
                <Carousel dots={false} autoplay>
                    <div>
                        <img className='bannerimg' src={logo1} alt="logo" />
                    </div>
                    <div>
                        <img className='bannerimg' src={logo2} alt="logo" />
                    </div>
                    <div>
                        <img className='bannerimg' src={logo3} alt="logo" />
                    </div>
                    <div>
                        <img className='bannerimg' src={logo4} alt="logo" />
                    </div>
                </Carousel>
            </div>
            <div style={{ backgroundColor: 'white', }}>
                <div className="container">
                    <div>
                        <br />
                        <p style={{
                            textAlign: 'center',
                            fontSize: '36px',
                            marginTop: '10px'
                        }}>Top homestay chất lượng & đa dạng nhất Hà Nội</p>
                        <p style={{
                            textAlign: 'center',
                            fontSize: '20px',
                            marginTop: '10px'
                        }}>Chọn ngày để đặt phòng</p>
                    </div>
                    <div className="row bs">
                        <div className="col-md-3">
                            <RangePicker
                                allowClear={false}
                                onChange={filterByDate}
                                defaultValue={[moment(moment(), format)]}
                                disabledDate={current => {
                                    return current && current < moment();
                                }}
                                format='DD-MM-YYYY'
                            />
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Tìm kiếm theo địa chỉ"
                                value={search} onChange={(e) => {
                                    setSearch(e.target.value)
                                }} onKeyUp={filterBySearch}
                            />
                        </div>

                        <div className="col-md-3">
                            <select class="form-select" aria-label="Default select example"
                                value={type}
                                onChange={(e) => { filterByType(e.target.value) }}
                            >
                                <option value="all">Tất cả</option>
                                <option value="Cặp đôi">Cặp đôi</option>
                                <option value="Nhóm bạn">Nhóm bạn</option>
                            </select>
                        </div>

                    </div>
                    <div className="row justify-content-center mt-3">
                        {loading ? (<Loader />) : (
                            rooms.map(room => {
                                return <div className="com-md-9 mt-3">
                                    <Room room={room} fromdate={fromdate} todate={todate} />
                                </div>
                            })
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Homescreen
