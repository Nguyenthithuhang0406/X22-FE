import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import Employeemanager from "../../Components/Employeemanager";
import Header from "../../Components/Employeemanager/Header/Header.js";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  MenuFoldOutlined,
  UserOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";

import ListMenu from "../../Components/Menu/index.js";
import AppContext from "antd/es/app/context.js";
import BookingInfo from "../../Staffs/BookingInfo/BookingInfo.js";
import Checkin from "../../Staffs/Checkin/Checkin.js";
import InfoRestaurant from "../../Staffs/InfoRestaurant/InfoRestaurant.js";
import CreateTable from "../../Staffs/CreateTable/CreateTable.js";
import StaffBooking from "../../Staffs/StaffBooking/StaffBooking.js";

const ManagerHome = () => {
  const { user } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState("1");

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const Items = [
    getItem("Thông tin nhà hàng", "1", <InfoCircleOutlined />),
    getItem("Danh sách thực đơn", "2", <MenuFoldOutlined />),
    getItem("Yêu cầu đặt bàn", "3", <WechatWorkOutlined />),
    getItem("Thông tin nhân viên", "4", <UserOutlined />),
    getItem("Checkin/Checkout đơn hàng", "5", <WechatWorkOutlined />),
    getItem("Tạo bàn ăn", "6", <WechatWorkOutlined />),
    getItem("Đặt bàn hộ khách", "7", <WechatWorkOutlined />),
  ];

  const onClick = (e) => {
    setSelectedItem(e.key);
  };
  return (
    <div className="management-form">
      <Header />
      <div className="app-container ">
        <div className="categories">
          <Menu
            className="button"
            onClick={onClick}
            style={{
              width: "100%",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={Items}
            inlineIndent={0}
          />
        </div>

        <div className="management-content">
          {selectedItem ? (
            <div>
              <h3 className="content-name">{Items.find(item => item.key === selectedItem)?.label}</h3>
              {selectedItem === "4" && <Employeemanager />}
              {selectedItem === "3" && <BookingInfo />}
              {selectedItem === "2" && <ListMenu />}
              {selectedItem === "5" && <Checkin />}
              {selectedItem === "1" && <InfoRestaurant />}
              {selectedItem === "6" && <CreateTable />}
              {selectedItem === "7" && <StaffBooking />}
            </div>
          ) : (
            <h3 className="content-name">Tìm danh mục muốn xem</h3>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManagerHome;
