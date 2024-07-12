import React, { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import axios from 'axios';
import { StarFilled } from '@ant-design/icons';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { request } from '../../../../utils/axios-http';


const ContentLeft = ({ restaurant, newReviewText, setNewReviewText, reviews, setReviews }) => {
    useEffect(() => {
        fetchCommentsByRestaurantId(restaurant._id);
    }, [restaurant._id]);

    const fetchCommentsByRestaurantId = async (restaurantId) => {
        try {
            // const response = await axios.get(`http://localhost:9000/api/auth/comment/${restaurantId}`);
            const response = await request({
                method: "get",
                url: `/auth/comment/${restaurantId}`
            })
            setReviews(response.data);
            console.log("comment", response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    const handleReviewSubmit = async (comment, rating) => {
        try {
            const response = await axios.post('https://x22-be-3.onrender.com/api/auth/comment', { comment, rating, restaurantId: restaurant._id });

            setReviews([...reviews, response.data]); // Cập nhật danh sách bình luận với bình luận mới
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    const rateStars = Array.from({ length: reviews.rating }, (_, index) => index + 1);
    const [menu, setMenu] = useState([]);
    const fetchMenuByRestaurantId = async (restaurantId) => {
        try {
            const response = await axios.get(`https://x22-be-3.onrender.com/api/menu?restaurantId=${restaurantId}`);
            console.log("menu:", response.data.data);
            const menudata = response.data.data
            setMenu(menudata)
            console.log("test", menudata);
        } catch (error) {
            console.error('Error fetching menu:', error);
            return [];
        }
    };
    useEffect(() => {
        fetchCommentsByRestaurantId(restaurant._id);
        fetchMenuByRestaurantId(restaurant._id)
    }, [restaurant._id]);
    useEffect(() => {
        console.log("Menu:", menu);
    }, [menu]);
    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(reviews.createdAt);


    return (
        <div className='overview' style={{ marginTop: "-70px" }}>
            <nav id='overview'>
                <ol className='buttonview'>
                    <span style={{ borderBottom: "2px solid red" }}><li><a href="#overview">Tổng quan</a></li></span>
                    <span><li><a href="#photo">Ảnh</a></li></span>
                    <span><li><a href="#menu">Menu</a></li></span>
                    <span><li><a href="#review">Đánh giá</a></li></span>
                    <span><li><a href="#booking">Đặt bàn</a></li></span>
                </ol>
            </nav>
            <h1 style={{ paddingLeft: "20px" }}>{restaurant.name}</h1>
            <h2 style={{ paddingLeft: "20px" }}>{restaurant.address}</h2>
            <p style={{ paddingLeft: "20px" }}>{restaurant.describe}</p>
            <p style={{ paddingLeft: "20px" }}> {Array.from({ length: restaurant.rate }, (_, index) => (
                <StarFilled key={index} style={{ color: "#ee4d2d" }} />
            ))}</p>
            <div id="photo" className='grid-img'>
                {restaurant.image.map((url, index) => (
                    <div key={index}>
                        <img src={url} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
            <div>

                <div className='menu' id='menu'>
                    <h2>Menu</h2>
                    <div className="menu-slider">
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={4}
                            loop={true}
                            autoplay={{ delay: 3000, pauseOnMouseEnter: false, }} // Tự động chạy
                            // navigation
                            pagination={{ clickable: true }} // Bật phân trang có thể click
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}

                        >
                            {menu.map((menuItem, index) => (
                                <SwiperSlide key={index}>
                                    <div className="menu-item">
                                        <h3>{menuItem.name}</h3>
                                        <p>Type: {menuItem.type}</p>
                                        <p>Price: {menuItem.price}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
                <div id="review">
                    <h2>Đánh giá</h2>
                    <ReviewForm
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        onSubmit={handleReviewSubmit}
                        restaurantId={restaurant._id}
                    />
                    {reviews.length === 0 ? (
                        <p>Chưa có đánh giá nào.</p>
                    ) : (
                        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
                            {sortedReviews.map((reviews, index) => (
                                <div className='reviewtext' key={index}>
                                    {/* <p>Tâm</p> */}
                                    <div style={{ display: "flex", gap: "10px", flexDirection: 'column' }}>
                                        <div>
                                            <div style={{ width: "40px", height: "40px", borderRadius: "30px", backgroundColor: "gray", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }} >User</div>
                                            {Array.from({ length: reviews.rating }, (_, index) => (
                                                <StarFilled key={index} style={{ color: "#ee4d2d" }} />
                                            ))}
                                            <span>{reviews.createdAt}</span>

                                        </div>
                                        <li style={{ listStyleType: "none" }}>{reviews.comment}</li>
                                        {/* `${reviews.createdAt.getFullYear()}-${reviews.createdAt.getMonth() + 1}-${reviews.createdAt.getDate()} ${reviews.createdAt.getHours()}:${reviews.createdAt.getMinutes()}:00` */}

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContentLeft;
