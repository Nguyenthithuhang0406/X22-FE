/* eslint-disable */
import React, { useState } from "react";
import "./style.css";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorsMessage from "../../Components/ErrorMessages/index.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils/axios-http.js";

const schema = yup.object().shape({
  username: yup.string().trim().required("Tên đăng nhập không được bỏ trống"),
  password: yup.string().trim().required("Mật khẩu không được bỏ trống"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Mật khẩu chưa đúng"),
  email: yup
    .string()
    .email("email sai định dạng")
    .required("Email không được bỏ trống"),
  firstName: yup.string().required("Tên không được bỏ trống"),
  lastName: yup.string().required("Họ không được bỏ trống"),
  phone: yup.string().length(10).required("Số điện thoại không được bỏ trống"),
});

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [notify, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    const { username, password, firstName, lastName, email, phone } = data;
    try {
      await request({
        data:{ username, password, firstName, lastName, email, phone } ,
        method:"post",
        url:"/auth/register"
      })
      console.log("data", data);
      await notify.info("Dằng ký tài khoản thành công");
      navigate("/userlogin");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.username);
      } else {
        console.error(error);
        message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "url('https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-1.JPG')",
        height: "100vh",
      }}
    >
      {contextHolder}
      <div className="register">
        <h1> Đăng ký tài khoản </h1>
        <div className="form-item">
          <span>Tên đăng nhập</span>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input {...field} status={errors.username ? "error" : ""} />
            )}
          />
          {errors.username && <ErrorsMessage message={errors.username} />}
          {errorMessage === "Tài khoản đã tồn tại" && (
            <ErrorsMessage message={{ message: errorMessage }} />
          )}
        </div>
        <div className="form-item">
          <span>Mật khẩu</span>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password
                {...field}
                status={errors.password ? "error" : ""}
              />
            )}
          />
          {errors.password && <ErrorsMessage message={errors.password} />}
        </div>
        <div className="form-item">
          <span>Nhập lại mật khẩu</span>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input.Password
                {...field}
                status={errors.confirmPassword ? "error" : ""}
              />
            )}
          />
          {errors.confirmPassword && (
            <ErrorsMessage message={errors.confirmPassword} />
          )}
        </div>
        <div className="form-item">
          <span>Họ</span>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input {...field} status={errors.firstName ? "error" : ""} />
            )}
          />
          {errors.firstName && <ErrorsMessage message={errors.firstName} />}
        </div>
        <div className="form-item">
          <span>Tên</span>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input {...field} status={errors.lastName ? "error" : ""} />
            )}
          />
          {errors.lastName && <ErrorsMessage message={errors.lastName} />}
        </div>
        <div className="form-item">
          <span>Email</span>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input {...field} status={errors.email ? "error" : ""} />
            )}
          />
          {errors.email && <ErrorsMessage message={errors.email} />}
          {errorMessage === "Email đã được đăng ký" && (
            <ErrorsMessage message={{ message: errorMessage }} />
          )}
        </div>
        <div className="form-item">
          <span>Số điện thoại</span>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input {...field} status={errors.phone ? "error" : ""} />
            )}
          />
          {errors.password && <ErrorsMessage message={errors.phone} />}
        </div>
        <Button
          className="custom-button"
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Đăng ký
        </Button>
        <div className="button" style={{ display: "block" }}>
          <span>Bạn đã có tài khoản ?</span>
          <Link to="/userlogin">
            <Button type="primary">Đăng nhập</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
