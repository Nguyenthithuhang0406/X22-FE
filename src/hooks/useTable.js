/* eslint-disable */
import axios from "axios";
import { request, requestWithToken } from "../utils/axios-http";
function useTable(){
    const getFreeTable = async()=>{
        try {
            const response = await requestWithToken({
                url: `/table/getFreeTable`,
                method:"get"
              });
              return response.data;
        } catch (error) {
            console.log("đã xảy ra lỗi : " , error);
        }
    }
    return {
        getFreeTable,
    };
}


export default useTable
