/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./style.css";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorsMessage from "../../Components/ErrorMessages/index.js";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils/axios-http.js";

const schema = yup.object().shape({
  username: yup
    .string()
    .trim("Tên đăng nhập không được bỏ trống")
    .required("Tên đăng nhập không được bỏ trống"),
  password: yup
    .string()
    .trim("Mật khẩu không được bỏ trống")
    .required("Mật khẩu không được bỏ trống"),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [notify, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, password, loginTypeValue = 2 } = data;

    try {
      const res = await request({
        data: { username, password, loginTypeValue },
        method: "post",
        url: "/auth/login"
      })
      const token = JSON.stringify(res.data.data);
      localStorage.setItem("access_token", token);

      await notify.info("Đăng nhập thành công");
      console.log("datalogin", data);
      localStorage.setItem("username", username);
      navigate("/");
      window.location.reload(); // Refresh trang để cập nhật giao diện
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        console.log(error);
      } else {
        console.error(error);
        message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
      message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      console.log(error);
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
      <div className="user-login">
        <h1>Đăng nhập tài khoản</h1>
        <div className="form-item">
          <span>Tên đăng nhập</span>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input {...field} status={errors.username ? "error" : ""} />
            )}
          />
          {errors.username && (
            <ErrorsMessage message={errors.username.message} />
          )}
          {errorMessage === "Tên đăng nhập không tồn tại" && (
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
          {errors.password && (
            <ErrorsMessage message={errors.password.message} />
          )}
          {errorMessage === "Mật khẩu không đúng" && (
            <ErrorsMessage message={{ message: errorMessage }} />
          )}
        </div>
        <Button
          className="submit"
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Đăng nhập
        </Button>
        <div>
          <span>Quên mật khẩu ?</span>
          <Link to="/userforget">
            <Button className="submit" type="primary" danger>
              Quên mật khẩu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
