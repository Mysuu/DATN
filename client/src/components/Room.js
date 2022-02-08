/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkLogin = JSON?.parse(localStorage?.getItem('currentUser'))?.name
    const renderButton = () => {
        if (fromdate && todate) {
            return (
                <div>
                    {checkLogin ? <Link to={`/booking?roomid=${room._id}&fromdate=${fromdate}&todate=${todate}`}>
                        <button className="btn btn-primary m-2">Đặt phòng</button>
                    </Link> : <Link to={`/login`}>
                        <button className="btn btn-primary m-2">Đặt phòng</button>
                    </Link>}
                </div>
            )
        }
        else {
            return ""
        }
    }
    return (
        <>
            <div className="row bs">
                <div className="col-md-5">
                    <img src={room.imageurls[0]} className="smallimg" />
                </div>
                <div className='col-md-7'>
                    <div className="card-body">
                        <h3>{room.name}</h3>
                        <p>Địa chỉ: {room.address}</p>
                        <p>Số người: {room.maxcount}</p>
                        <p>Loại phòng: {room.type}</p>
                        <p>Liên hệ: {room.phonenumber}</p>
                        <div style={{ float: 'right' , display: 'flex'}}>
                        {/* {(fromdate && todate) && (
                            <Link to={`/booking?roomid=${room._id}&fromdate=${fromdate}&todate=${todate}`}>
                                <button className="btn btn-primary m-2">Đặt ngay</button>
                            </Link>
                        )}   */}
                        {renderButton(fromdate, todate)}
                            <div><button className="btn btn-primary m-2" onClick={handleShow}>Xem chi tiết</button></div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose} size='lg'>
                        <Modal.Header>
                            <Modal.Title>{room.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Carousel prevLabel='' nextLabel=''>
                                {room.imageurls.map(url => {
                                    return <Carousel.Item>
                                        <img
                                            className="d-block w-100 bigimg"
                                            src={url}
                                        />
                                    </Carousel.Item>
                                })}
                            </Carousel>
                            <p style={{marginTop:'30px'}}>Tiện nghi: {room.description}</p>
                            <p>Địa chỉ: {room.address}</p>
                            <p>Số người: {room.maxcount}</p>
                            <p>Loại phòng: {room.type}</p>
                            <p>Liên hệ: {room.phonenumber}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>

    )
}

export default Room
