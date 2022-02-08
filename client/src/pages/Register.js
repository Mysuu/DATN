/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';
import Error from '../components/Error';

function Register() {
    let navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {
                setLoading(true)
                // eslint-disable-next-line no-unused-vars
                const result = (await axios.post('/api/users/register', user)).data
                setLoading(false)
                setSuccess(true)
                message.success('Đăng ký tài khoản thành công')
                setTimeout(() => {
                    navigate('/login')
                }, 500);
                

            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
            }
        }
        else {
            alert('Mật khẩu không khớp')
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-8'>
                    <div className='bs'>
                        <h1 style={{ textAlign: 'center' }}>Đăng ký</h1>
                        <Form
                            style={{ marginRight: '100px' }}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Họ và tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bạn chưa điền tên!',
                                    },
                                ]}
                            >
                                <Input value={name} onChange={(e) => { setName(e.target.value) }} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Không phải email Email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Xin hãy nhập email!',
                                    },
                                ]}
                            >
                                <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bạn chưa điền password!',
                                    },
                                ]}
                            >
                                <Input.Password value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Nhập lại mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bạn chưa nhập lại password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu không giống!')
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                            </Form.Item>

                            {/* <Form.Item
                                label="Again Password"
                                name="again password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bạn chưa nhập lại password!',
                                    },
                                ]}
                            >
                                <Input.Password value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                            </Form.Item> */}

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" onClick={register}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
