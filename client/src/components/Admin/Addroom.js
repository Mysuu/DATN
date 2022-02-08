import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../Loader';
import Error from '../Error'
import Swal from 'sweetalert2'

function Addroom() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [rentperday, setRentperday] = useState()
    const [maxcount, setMaxcount] = useState()
    const [description, setDescription] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [type, setType] = useState()
    const [address, setAddress] = useState()
    const [imageurls1, setImageurls1] = useState()
    const [imageurls2, setImageurls2] = useState()
    const [imageurls3, setImageurls3] = useState()

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            address,
            imageurls: [imageurls1, imageurls2, imageurls3]
        }

        try {
            setLoading(true)
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result);
            setLoading(false)
            Swal.fire('Chúc mừng', 'Đã thêm phòng thành công', 'success').then(result => {
                window.location.href = '/admin'
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
            Swal.fire('OOps', 'Thêm phòng thất bại', 'error')
        }
    }

    return (
        <div className='row justify-content-center mt-3'>
            <div className='col-md-9 mt-2' style={{ paddingBottom: '10px' }}>
                <div className="bs">
                    {loading && <Loader />}
                    <input type='text' className='form-control mt-2' placeholder='Tên homestay'
                        value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Địa chỉ'
                        value={address} onChange={(e) => { setAddress(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Giá mỗi ngày'
                        value={rentperday} onChange={(e) => { setRentperday(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Số người tối đa'
                        value={maxcount} onChange={(e) => { setMaxcount(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Dịch vụ homestay'
                        value={description} onChange={(e) => { setDescription(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Số điện thoại liên hệ'
                        value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Loại phòng'
                        value={type} onChange={(e) => { setType(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Ảnh 1'
                        value={imageurls1} onChange={(e) => { setImageurls1(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Ảnh 2'
                        value={imageurls2} onChange={(e) => { setImageurls2(e.target.value) }}
                    />
                    <input type='text' className='form-control mt-2' placeholder='Ảnh 3'
                        value={imageurls3} onChange={(e) => { setImageurls3(e.target.value) }}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-primary mt-3" onClick={addRoom}>Thêm homestay</button>
                    </div>
                    {error && <Error />}
                </div>
            </div>
        </div>
    )
}

export default Addroom
