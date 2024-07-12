/* eslint-disable*/

import React, { useState } from 'react';
import { Input, Button, AutoComplete, Select } from 'antd';
import { request } from '../../../../utils/axios-http';
const { Search } = Input;

const SearchWeb = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearchChange = (value) => {
        setSearchText(value);
        if (value) {
            fetchOptions(value);
        } else {
            setOptions([]);
        }
    };

    const fetchOptions = async (value) => {
        try {
            // Simulate fetching options from server
            const response = await fetch(`https://x22-be-3.onrender.com/api/restaurant?keyword=${value}`);
            // const response = await request({
            //     method: "get",
            //     url: `/restaurant?keyword=${value}`
            // })
            const data = await response.json();

            console.log(data);

            setOptions(data.data);
            console.log("options", options);
            setLoading(false);
            return
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleSearchSubmit = () => {
        setLoading(true);
        onSearch(searchText);
        setLoading(false);
    };

    return (
        <div className='gradient-background'>
            {/* <h1>Tìm kiếm nhà hàng</h1> */}
            <AutoComplete
                style={{ width: 500 }}
                options={options.map(option => ({
                    value: option.name, // Tên nhà hàng
                    // label: () => {
                    //     return <h1>hello</h1>
                    // } // Địa chỉ nhà hàng (hoặc bất kỳ thuộc tính nào khác bạn muốn hiển thị)
                }))}
                onSelect={handleSearchSubmit}
                onSearch={handleSearchChange}
                placeholder="Tìm kiếm theo tên nhà hàng hoặc địa chỉ"
                value={searchText}
                onChange={handleSearchChange}
            />

            <Button classNames='btn-search'
                type="primary"
                className='btntam'
                onClick={handleSearchSubmit}
            >
                Tìm kiếm
            </Button>
        </div>
    );
};

export default SearchWeb;
