
// import React, { useState } from 'react';
// import { StarFilled } from '@ant-design/icons';
// const ReviewForm = ({ restaurantId, onSubmit }) => {
//     const [comment, setComment] = useState('');
//     const [rating, setRating] = useState(0);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!comment.trim() || rating === 0) return;

//         try {
//             await onSubmit(comment, rating, restaurantId);
//             setComment('');
//             setRating(0);
//             console.log(comment);
//         } catch (error) {
//             console.error('Error submitting comment:', error);
//         }
//     };
//     const [hoverRating, setHoverRating] = useState(0);

//     return (
//         <form className='formreview' onSubmit={handleSubmit}>
//             <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Viết đánh giá vào đây..."
//                 style={{ width: "600px", paddingLeft: "20px", lineHeight: "30px", borderRadius: "10px" }}
//             ></textarea>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 {[1, 2, 3, 4, 5].map((value) => (
//                     <StarFilled
//                         key={value}
//                         style={{
//                             color: rating >= value || hoverRating >= value ? '#ffc107' : '#e4e5e9',
//                             cursor: 'pointer',
//                             transition: 'color 0.2s',
//                             fontSize: '24px',
//                         }}
//                         onMouseEnter={() => setHoverRating(value)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         onClick={() => setRating(value)}
//                     />
//                 ))}
//             </div>
//             <button style={{ width: "100px" }} type="submit">Gửi</button>
//         </form>
//     );
// };

// export default ReviewForm;
import React, { useState } from 'react';
import { StarFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';

const ReviewForm = ({ restaurantId, onSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleSendButtonClick = () => {
        const storedUsername = localStorage.getItem('username');
        if (!storedUsername) {
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập',
                text: 'Vui lòng đăng nhập để viết đánh giá!',
                confirmButtonText: 'Đăng nhập',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/userlogin');
                }
            });
        } else {
            setUsername(storedUsername);
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!comment.trim() || rating === 0) return;

        try {
            await onSubmit(comment, rating, restaurantId);
            setComment('');
            setRating(0);
            console.log(comment);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const [hoverRating, setHoverRating] = useState(0);

    return (
        <form className='formreview'>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết đánh giá vào đây..."
                style={{ width: "600px", paddingLeft: "20px", lineHeight: "30px", borderRadius: "10px" }}
            ></textarea>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <StarFilled
                        key={value}
                        style={{
                            color: rating >= value || hoverRating >= value ? '#ffc107' : '#e4e5e9',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                            fontSize: '24px',
                        }}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(value)}
                    />
                ))}
            </div>
            <button onClick={handleSendButtonClick} style={{ width: "100px" }} type="button">Gửi</button>
        </form>
    );
};

export default ReviewForm;
