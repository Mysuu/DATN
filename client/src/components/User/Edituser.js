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

function Edituser() {
    const { search } = useLocation();
    const [dataForm, setDataForm] = useState(null)
    let parsed = qs.parse(search);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(async () => {
        try {
            setLoading(true)
            const datas = (await axios.post('/api/users/getuserbyid', { userid: parsed?.userid })).data
            console.log(datas);
            setDataForm(datas);
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, [])

    const onFinish = async (values) => {
        axios.put('/api/users/edituser', {
            data: {
                ...values,
            }
        })
        Swal.fire('Chúc mừng', 'Đã sửa thông tin thành công! Xin hãy đăng nhập lại', 'success').then(result => {
            localStorage.removeItem('currentUser')
            window.location.href = '/login'
        })
    };

    return (
        <div className='row justify-content-center mt-3'>
            <div className="col-md-5 mt-2" style={{ paddingBottom: '10px' }}>
                <div className="bs">
                    {loading && <Loader />}
                    {
                        dataForm !== null && <Form {...layout}
                            form={form}
                            onFinish={onFinish}
                            name="control-hooks"
                            initialValues={{
                                userid: dataForm && dataForm._id || '',
                                name: dataForm && dataForm.name || "",
                                email: dataForm && dataForm.email || "",
                                password: dataForm && dataForm.password || "",
                            }}
                        >
                            <Form.Item
                                name="userid"
                                label="userid"
                                rules={[]}
                                hidden
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                label="Email"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label="Mật khẩu"
                                rules={[]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                                <Button type="primary" htmlType="Sửa">
                                    Cập nhật
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

export default Edituser
