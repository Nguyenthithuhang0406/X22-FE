/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

import useStaff from '../../../hooks/useStaff';
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style1.css';

const schema = yup.object().shape({
    username: yup.string().required("username is required!"),
    password: yup.string().required("password is required!"),
});

const StaffLogin = () => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { login } = useStaff();

    const onSubmit = async (data) => {
        // console.log('data', data)

        try {
            await login({ ...data, loginTypeValue: 1 });
        } catch (error) {
            toast.error(extractMessageFormErr(error));
        }
    };

    return (
        <div className='tam'
            style={{
                backgroundImage:
                    "url('https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-1.JPG')",
                height: "100vh",
            }}>
            <div className='form'>
                <p className='td-form'><b>Nhà hàng đăng nhập</b></p>
                <Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Tên đăng nhập'
                            {...register('username')}
                            required ></Form.Control>
                    </Form.Group>
                    {errors.username && <ErrorMessages message={errors.username.message} />}
                    <br />
                    <Form.Group>
                        <Form.Control
                            type='password'
                            placeholder='Mật khẩu'
                            required
                            {...register('password')}  >
                        </Form.Control>
                    </Form.Group>
                    {errors.password && <ErrorMessages message={errors.password.message} />}
                    <br />
                    <Button className="dk" variant='success' type='submit'>Đăng nhập</Button>
                    <br />
                    <br />
                </Form>
                {/* <p className='forget'>Quên mật khẩu</p> */}
                {/* <div className='cc'>
                    <p>Bạn chưa có tài khoản?</p>
                    <Link to='/registerStaff'>
                        <Button variant='info' className='dn'>Đăng kí</Button>
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default StaffLogin
