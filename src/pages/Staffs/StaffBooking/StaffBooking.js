import React, { useContext, useState } from 'react';
import { requestWithToken } from '../../../utils/axios-http';
import { Button, Input, DatePicker } from 'antd';
import moment from 'moment'; // Import thư viện moment
import Swal from 'sweetalert2';
import { AppContext } from '../../../App';

const StaffBooking = () => {
    const { user } = useContext(AppContext);
    const [bookingInfo, setBookingInfo] = useState({
        name: '',
        phone: '',
        restaurantId: user?.restaurantId, // Kiểm tra user và user.restaurantId trước khi sử dụng
        quantity: 1,
        reservationDate: moment(),
        menus: [] // Thêm món ăn muốn đặt vào đây
    });

    const handleBooking = async () => {
        try {
            const response = await requestWithToken({
                method: 'post',
                url: '/reservation/staffCreateReservation',
                data: bookingInfo
            });
            console.log(response.data); // Xử lý dữ liệu phản hồi từ server
            // Hiển thị thông báo Sweet Alert khi đặt bàn thành công
            Swal.fire({
                icon: 'success',
                title: 'Đặt bàn thành công!',
                confirmButtonText: 'OK'
            });
            // Cập nhật lại danh sách yêu cầu đặt bàn sau khi đặt thành công
            // Đoạn code cập nhật danh sách ở đây
        } catch (error) {
            console.error('Error when booking:', error);
        }
    };

    // Kiểm tra xem user và user.restaurantId có tồn tại không
    if (!user || !user.restaurantId) {
        return <div>Không thể hiển thị phần đặt bàn vì không có thông tin nhà hàng.</div>;
    }

    return (
        <div>
            <h2>Đặt bàn hộ khách hàng</h2>
            <label>Tên:</label>
            <Input
                value={bookingInfo.name}
                onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
            />
            <label>Số điện thoại:</label>
            <Input
                value={bookingInfo.phone}
                onChange={(e) => setBookingInfo({ ...bookingInfo, phone: e.target.value })}
            />
            <label>Số lượng người:</label>
            <Input
                type="number"
                value={bookingInfo.quantity}
                onChange={(e) => setBookingInfo({ ...bookingInfo, quantity: e.target.value })}
            />
            <label>Ngày đặt:</label>
            <DatePicker
                value={moment(bookingInfo.reservationDate)} // Chuyển đổi thành moment
                onChange={(date, dateString) => setBookingInfo({ ...bookingInfo, reservationDate: date })}
            />
            {/* Thêm các trường thông tin khác (món ăn, ...) vào đây */}
            <Button type="primary" onClick={handleBooking}>Đặt bàn</Button>
        </div>
    );
};

export default StaffBooking;
