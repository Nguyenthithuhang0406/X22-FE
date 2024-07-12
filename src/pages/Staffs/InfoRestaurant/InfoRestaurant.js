
// export default InfoRestaurant
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import { request } from '../../../utils/axios-http';

const InfoRestaurant = () => {
    const { user } = useContext(AppContext);
    const [restaurantInfo, setRestaurantInfo] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchRestaurantInfo = async () => {
                try {
                    const response = await request({
                        method: 'get',
                        url: `/restaurant/${user.restaurantId}`
                    });
                    setRestaurantInfo(response.data.data); // Lưu thông tin nhà hàng vào state
                } catch (error) {
                    console.error('Error fetching restaurant info:', error);
                }
            };

            if (user.restaurantId) {
                fetchRestaurantInfo(); // Gọi hàm fetchRestaurantInfo nếu user.restaurantId tồn tại
            } else {
                setRestaurantInfo(null); // Nếu không tồn tại user.restaurantId, set restaurantInfo thành null
            }
        }
    }, [user]);

    if (!user) {
        return null; // Trả về null nếu không có user trong AppContext
    }

    return (
        <div>
            {restaurantInfo ? (
                <div>
                    <h2>{restaurantInfo.name}</h2>
                    <p>Địa chỉ: {restaurantInfo.address}</p>
                    {/* Thêm các thông tin khác của nhà hàng */}
                </div>
            ) : (
                <p>No restaurant info available</p> // Hiển thị thông báo khi không có thông tin nhà hàng
            )}
        </div>
    );
};

export default InfoRestaurant;
