import React, {useState} from 'react'
import { Form, Input, Button } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Login() {

    let navigate = useNavigate()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    const[loading, setLoading] = useState(false)
    const[error, setError] = useState()
    const [success, setSuccess] = useState()

    async function login(){
        const user={
            email,
            password
        }
        try {
            setLoading(true)
            // eslint-disable-next-line no-unused-vars
            const result = (await axios.post('/api/users/login', user)).data
            setLoading(false)
            setSuccess(true)
            localStorage.setItem('currentUser', JSON.stringify(result))
            const checkAdmin = JSON?.parse(localStorage?.getItem('currentUser'))?.isAdmin
            if(checkAdmin=== true){
                navigate('/admin')
            }
            else {
                navigate('/')
            }

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className='row justify-content-center mt-5'>
            {loading && (<Loader/>)}
            <div className='col-md-6'>
            {error && (<Error message='Sai email hoặc mật khẩu'/>)}
            {success && (<Success message='Đăng nhập thành công'/>)}
                <div className='bs'>
                    <h1 style={{ textAlign: 'center' }}>Đăng nhập</h1>
                    <Form
                        style={{marginRight: '100px'}}
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
                            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={login}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login
