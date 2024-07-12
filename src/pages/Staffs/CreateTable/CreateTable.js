
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../App';
import { requestWithToken } from '../../../utils/axios-http';

const CreateTable = () => {
    const { user } = useContext(AppContext);
    const [tableNo, setTableNo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [tables, setTables] = useState([]);

    useEffect(() => {
        // Gọi hàm fetchTables khi component được tạo ra
        fetchTables();
    }, []);

    // Hàm gọi API để lấy danh sách bàn ăn từ server
    const fetchTables = async () => {
        try {
            const response = await requestWithToken({
                method: 'get',
                url: `/table/getTable?restaurantId=${user.restaurantId}` // Truyền restaurantId từ user context vào URL
            });
            setTables(response.data.data); // Lưu danh sách bàn ăn vào state
            console.log("table", response.data.data);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi lấy danh sách bàn ăn:', error);
        }
    };

    const handleCreateTable = async () => {
        try {
            setIsLoading(true);
            const response = await requestWithToken({
                method: 'post',
                url: '/table/createTable',
                data: {
                    no: tableNo,
                    restaurantId: user.restaurantId // Sử dụng restaurantId từ user context
                }
            });
            console.log(response.data); // Xử lý dữ liệu trả về từ server
            setIsLoading(false);
            setError('');
            // Sau khi tạo bàn ăn thành công, gọi lại hàm fetchTables để cập nhật danh sách bàn ăn
            fetchTables();
            console.log(tables);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi tạo bàn ăn:', error);
            setError('Đã xảy ra lỗi khi tạo bàn ăn');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Tạo bàn ăn</h1>
            <label>Số bàn:</label>
            <input
                type="text"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button onClick={handleCreateTable} disabled={isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo bàn ăn'}
            </button>
            <h2>Danh sách bàn ăn</h2>
            <ul>
                {tables.map((table, index) => (
                    <li key={index}>{table.no}</li>
                ))}
            </ul>
        </div>
    );
};

export default CreateTable;
