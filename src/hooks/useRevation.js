/* eslint-disable */
import axios from "axios";
import { request, requestWithToken } from "../utils/axios-http";

function useRevation() {
  const fetchBookingRequests = async () => {
    try {
      const response = await requestWithToken({
        url: `/reservation/staffGetReservations`,
        method:"get"
      });
      return response.data;
    } catch (error) {
      console.error("đã xảy ra lỗi",error);
    }
  };
  const acceptRevation = async(reservationId)=>{
    try {
      const response = await requestWithToken({
        url: `/reservation/accept-reservation/${reservationId}`,
        method:"post"
      });
    } catch (error) {
      console.error("đã xảy ra lỗi",error);
    }
  }
  const rejectRevation = async(reservationId)=>{
    try {
      const response = await requestWithToken({
        url: `/reservation/reject-reservation/${reservationId}`,
        method:"post"
      });
    } catch (error) {
      console.error("đã xảy ra lỗi",error);
    }
  }
  const rePendingRevation = async(reservationId)=>{
    try {
      const response = await requestWithToken({
        url: `/reservation/repending-reservation/${reservationId}`,
        method:"post"
      });
    } catch (error) {
      console.error("đã xảy ra lỗi",error);
    }
  }
  const checkinRevation = async (reservationId, selectedTable, selectedMenus) => {
    try {
      const response = await requestWithToken({
        url: `/reservation/checkin-reservation/${reservationId}`,
        method: "post",
        data: {
          tableIds: selectedTable,
          menus:selectedMenus
        },
      });
      return response.data;
    } catch (error) {
      console.error("đã xảy ra lỗi", error);
      throw error;
    }
  };
  const checkoutRevation = async (reservationId) => {
    const _id = reservationId._id
    try {
      const response = await requestWithToken({
        url: `/reservation/checkout-reservation/${_id}`,
        method: "post",
      });
      return response.data;
    } catch (error) {
      console.error("đã xảy ra lỗi", error);
      throw error;
    }
  };
  return { checkoutRevation,fetchBookingRequests,acceptRevation ,rejectRevation,rePendingRevation,checkinRevation};
}
export default useRevation;
