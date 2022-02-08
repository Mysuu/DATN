import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo-svg.svg'

function Navbar() {
    let navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout() {
        localStorage.removeItem('currentUser')
        navigate('/')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <Link class="navbar-brand" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        {user ? (
                        <>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-user" style={{ color: 'black' }}></i> {user.name}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby='navbarDropdown'>
                                    <li><Link to="/booked" className="dropdown-item">Phòng đã đặt</Link></li>
                                    <li><Link to="/profile" className="dropdown-item">Thông tin</Link></li>
                                    <div class="dropdown-divider"></div>
                                    <li><Link to="/" className="dropdown-item" onClick={logout}>Đăng xuất</Link></li>
                                </ul>
                            </div>
                        </>
                        ) : (
                        <>
                            <li className="nav-item">
                                <ul><Link to="/login" style={{ color: 'black' }}>Đăng nhập</Link></ul>
                            </li>
                            <li className="nav-item">
                                <ul><Link to="/register" style={{ color: 'black' }}>Đăng ký</Link></ul>
                            </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
