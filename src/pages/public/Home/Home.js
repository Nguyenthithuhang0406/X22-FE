/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import Slider from './components/Slider'
import "./Home.css";
import Content from './components/Content';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchWeb from './components/Search';
import { request } from '../../../utils/axios-http';

import { DEFAULT_PAGE } from '../../../utils/page';
import { Pagination } from 'antd';

//hàm lấy data từ api
const getRestaurant = async () => {
    try {
        // const response = await axios.get("http://localhost:9000/api/restaurant");
        const response = await request({
            url: "/restaurant",
            method: "get"
        })

        // console.log(response);
        return response.data.data;

    } catch (error) {
        console.log(error);
    }
};
const Home = () => {
    const navigate = useNavigate();
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [searched, setSearched] = useState(false);

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE.page);

    const handleFetchData = async () => {
        const restaurants = await getRestaurant();
        setRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
        // console.log(restaurants[0].name);
    };

    // console.log(restaurants);

    const handleRestaurant = (restaurantId) => {
        navigate(`restaurant/${restaurantId}`)
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleSearch = (query) => {
        query = query.toString().trim();
        const filtered = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredRestaurants(filtered);
        setSearched(true);

        setCurrentPage(DEFAULT_PAGE.page);

        // console.log(filtered);

    };

    const startIndex = (currentPage - 1) * (+DEFAULT_PAGE.take);
    const endIndex = startIndex + (+DEFAULT_PAGE.take);

    const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    console.log("startindex", startIndex, "end", endIndex, 'currentRestaurant', currentRestaurants)
    // const renderRestaurants = searched ? filteredRestaurants : restaurants;

    const renderRestaurants = searched ? filteredRestaurants : currentRestaurants;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    return (
        <div>
            <h1>
                <SearchWeb onSearch={handleSearch} />
                <Slider />
                <Content restaurants={renderRestaurants} handleRestaurant={handleRestaurant} />
                <br/>
                <Pagination
                    total={filteredRestaurants.length}
                    pageSize={DEFAULT_PAGE.take}
                    current={currentPage}
                    onChange={handlePageChange}
                />
            </h1>
        </div>
    )
}

export default Home
