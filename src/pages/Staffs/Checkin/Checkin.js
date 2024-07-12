import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./style.css";
import ModalCheckin from "./Modalcheckin";
import { requestWithToken } from "../../../utils/axios-http";
import useRevation from "../../../hooks/useRevation";

const Checkin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { checkoutRevation } = useRevation();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestWithToken({
          method: "get",
          url: "/reservation/staffGetAcceptReservations",
        });
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckin = (booking) => {
    setSelectedReservation(booking);
    setIsOpen(true);
  };
  const handleCheckout = async (reservationId) => {
    console.log();
    try {
      await checkoutRevation(reservationId);
      console.log(reservationId);
      const updatedData = data.map((booking) =>
        booking._id === reservationId
          ? { ...booking, checkOutDate: new Date() }
          : booking
      );
      alert("Thành công !")
      setData(updatedData);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi checkout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="checkin-form">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Ngày đặt bàn</th>
            <th>Ngày chấp nhận</th>
            <th>Trạng thái</th>
            <th>Thời gian Checkin</th>
            <th>Thời gian Checkout</th>
            <th>Bàn ăn</th>
            <th>Menus</th>
            <th>Thanh toán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.reservationDate).toLocaleString()}</td>
                <td>{new Date(booking.acceptedDate).toLocaleString()}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.checkInDate
                    ? new Date(booking.checkInDate).toLocaleString()
                    : "Chưa có"}
                </td>
                <td>
                  {booking.checkOutDate
                    ? new Date(booking.checkOutDate).toLocaleString()
                    : "Chưa có"}
                </td>
                <td>
                  <ul>
                    {booking.tables.map((table, index) => (
                      <li key={index}>{table}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {booking.menus.map((menu, index) => (
                      <li key={index}>
                        Menu ID: {menu.menuId},<br />
                        Quantity: {quantity},<br />
                        Price: ${menu.price},<br />
                        Discount: ${menu.discount},<br />
                        Total:  ${menu.quantity * menu.price}
                      </li>
                    ))}
                  </ul>
                </td>
                {/* <td>
                  $
                  {booking.menus.reduce((total, menu) => total + menu.total, 0)}
                </td> */}
                <td>
                  ${
                    booking.menus.reduce(
                      (total, menu) => total + (quantity * menu.price),
                      0
                    )
                  }
                </td>


                <th>
                  {booking.status == "accepted" && (
                    <Button
                      type="primary"
                      onClick={() => handleCheckin(booking)}
                    >
                      Checkin
                    </Button>
                  )}
                  {booking.status == "checkIn" && (
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleCheckout(booking)}
                    >
                      Checkout
                    </Button>
                  )}
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No reservations available</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        title="Thực hiện checkin"
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <ModalCheckin reservationId={selectedReservation} />
      </Modal>
    </div>
  );
};

export default Checkin;
