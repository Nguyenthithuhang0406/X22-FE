/* eslint-disable*/
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';
import { AppContext } from '../../App';
import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Header = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    const handleUserRegister = () => {
        navigate('/userregister');
    };
    const handleUserLogin = () => {
        navigate('/userlogin');
    };
    const handleLogout = () => {
        localStorage.removeItem('username');
        // Tùy thuộc vào cách bạn cài đặt, có thể cần thêm các bước khác sau khi logout, như làm mới trang, chuyển hướng, vv.
        // Ví dụ: navigate('/userlogin');
        window.location.reload(); // Refresh trang để cập nhật giao diện
    };

    const handleRestaurantLogin = () => {
        navigate('/loginStaff');
    }

    const fillerRestaurant = () => {

    }

    const fillerMenu = () => {

    }

    const fillerVoucher = () => {

    }
    const { user } = useContext(AppContext);
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const username = localStorage.getItem('username');
        setLoggedIn(!!username); // Set trạng thái đăng nhập dựa trên sự tồn tại của username trong localStorage
    }, []);

    return (
        <div className='header'>

            <img style={{ cursor: "pointer" }} src={'https://static-assets.diningcity.asia/icons/logo_web_en.png'} onClick={handleLogoClick} ></img>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/'>Trang Chủ</Nav.Link>

                            <NavDropdown title="Nhà hàng" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={fillerRestaurant}>Ba Đình</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Ba Vì</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Bắc Từ Liêm</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Cầu Giấy</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Chương Mỹ</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Đan Phượng</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Đông Anh</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Đống Đa</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Hai Bà Trưng</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Hoàng Mai</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Hoài Đức</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerRestaurant}>Hà Đông</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Thực đơn" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={fillerMenu}>Lẩu</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerMenu}>Nướng</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerMenu}>Hải sản</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerMenu}>Combo khác</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Sự kiện ưu đãi" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={fillerVoucher}>Ba Đình</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Ba Vì</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Bắc Từ Liêm</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Cầu Giấy</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Chương Mỹ</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Đan Phượng</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Đông Anh</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Đống Đa</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Hai Bà Trưng</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Hoàng Mai</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Hoài Đức</NavDropdown.Item>
                                <NavDropdown.Item onClick={fillerVoucher}>Hà Đông</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <NavDropdown.Divider />

                        <div className='btlg'>
                            <Button className="bt1" onClick={handleRestaurantLogin}>Nhà hàng đăng nhập</Button>

                            <div className='login-btn'>
                                {loggedIn ? (
                                    <>
                                        <span>{localStorage.getItem('username')}</span>
                                        <Button className="bt2" onClick={handleLogout} type='primary'>Đăng xuất</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="bt2" onClick={handleUserLogin} type='primary'>Đăng nhập</Button>
                                        <Button className="bt2" onClick={handleUserRegister} type='primary'>Đăng kí</Button>
                                    </>)}
                            </div>
                        </div>
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header;
