/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request, requestWithToken } from "../utils/axios-http";
import { useContext } from "react";
import { AppContext } from "../App";

function useStaff() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const login = async (data) => {
    const res = await request({
      data,
      method: "post",
      url: "/auth/login",
    });

    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);

    await getMe();

    toast.success("Đăng nhập thành công!");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.type === "manager") {
      if (!user?.restaurantId) {
        navigate("/createdRestaurant")
      }
      else (navigate('/managerhome'))
    }
    // navigate("/createdRestaurant");
    // navigate("/createStaffAccount");
    // navigate("/");
    // getMe();
  };

  const register = async (data) => {
    const { name, email, username, password, confirmPassword } = data;
    await request({
      data: {
        name,
        email,
        username,
        password,
        confirmPassword,
      },
      method: "post",
      url: "/auth/managerRegister",
    });
    toast.success("Đăng kí thành công!");
    navigate("/loginStaff");
  };

  const getMe = async () => {
    const res = await requestWithToken({
      url: "/auth/profile",
    });
    setUser(res.data.staff);
    localStorage.setItem("user", JSON.stringify(res.data.staff));
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const createdStaffAccount = async (data) => {
    const {
      name,
      email,
      address,
      dateOfBirth,
      staffCode,
      username,
      password,
      confirmPassword,
    } = data;

    const typeStaff = localStorage.getItem("type");
    await requestWithToken(
      {
        data: {
          name,
          email,
          address,
          dateOfBirth,
          staffCode,
          username,
          password,
          confirmPassword,
        },
        method: "post",
        url: "/staff",
      },
      typeStaff
    );

    toast.success("Tạo tài khoản nhân viên thành công!");
    navigate("/restaurantdetail");
  };

  return { login, register, getMe, logOut, createdStaffAccount };
}
export default useStaff;
