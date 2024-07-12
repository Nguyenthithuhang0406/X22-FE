/* eslint-disable */
import { AimOutlined, EyeFilled, EyeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import React from 'react'

const RestaurantDetail = ({ restaurant, handleRestaurant }) => {
    const restaurantId = restaurant._id
    const rateStars = Array.from({ length: restaurant.rate }, (_, index) => index + 1);
    return (
        <div className='detail' onClick={() => handleRestaurant(restaurantId)}>
            <div className='restaurantdetail1'>
                <img src={restaurant.image[0]}></img>
                <p className='name'>{restaurant.name}</p>
                <div className='info'>
                    <p><span className="label"><AimOutlined /></span> <span className="value">{restaurant.address}</span></p>
                    <p><span className="label"></span> <span className="value">{rateStars.map((_, index) => <span key={index}><StarFilled style={{ color: "#ee4d2d" }} /></span>)}</span></p>
                    <p><span className="label"><EyeFilled /></span> <span className="value">1402</span></p>
                </div>

            </div>
        </div>
    )
}

export default RestaurantDetail