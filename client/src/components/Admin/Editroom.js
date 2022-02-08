/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader';
import Swal from 'sweetalert2';
import Error from '../Error'
import { useLocation } from "react-router-dom";
import * as qs from "query-string";
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

function Editroom() {
    const { search } = useLocation();
    const [dataForm, setDataForm] = useState(null)
    let parsed = qs.parse(search);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(async () => {
        try {
            setLoading(true)
            const datas = (await axios.post('/api/rooms/getroombyid', { roomid: parsed?.roomid })).data
            setDataForm(datas);
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, [])

    const onFinish = async (values) => {
        const imageurls = []
        imageurls.push(values?.imageurls1, values?.imageurls2, values?.imageurls3);

        axios.put('/api/rooms/editroom', {
            data: {
                ...values,
                imageurls: imageurls
            }
        })
        Swal.fire('Chúc mừng', 'Đã sửa phòng thành công', 'success').then(result => {
            window.location.href = '/admin'
        })
    };
    const onFinishFailed = () => {
    };

    return (
        <div className='row justify-content-center mt-3'>
            <div className="col-md-9 mt-2" style={{ paddingBottom: '10px' }}>
                <div className="bs">
                    {loading && <Loader />}
                    {
                        dataForm !== null && <Form {...layout}
                            form={form}
                            onFinishFailed={onFinishFailed}
                            onFinish={onFinish}
                            name="control-hooks"
                            initialValues={{
                                roomid: dataForm && dataForm._id || '',
                                name: dataForm && dataForm.name || "",
                                address: dataForm && dataForm.address || "",
                                rentperday: dataForm && dataForm.rentperday || "",
                                type: dataForm && dataForm.type || "",
                                maxcount: dataForm && dataForm.maxcount || "",
                                phonenumber: dataForm && dataForm.phonenumber || "",
                                description: dataForm && dataForm.description || "",
                                imageurls1: dataForm && dataForm?.imageurls[0] || "",
                                imageurls2: dataForm && dataForm?.imageurls[1] || "",
                                imageurls3: dataForm && dataForm?.imageurls[2] || "",
                            }}
                        >
                            <Form.Item
                                name="roomid"
                                label="Id phòng"
                                rules={[]}
                                hidden
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Tên phòng"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='address'
                                label="Địa chỉ"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='rentperday'
                                label="Giá mỗi ngày"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='type'
                                label="Loại phòng"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='maxcount'
                                label="Số người"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='phonenumber'
                                label="Liên hệ"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label="Dịch vụ"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='imageurls1'
                                label="Ảnh 1"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='imageurls2'
                                label="Ảnh 2"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='imageurls3'
                                label="Ảnh 3"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                                <Button type="primary" htmlType="submit">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                    {error && <Error />}
                </div>
            </div>
        </div>
    )
}

export default Editroom
