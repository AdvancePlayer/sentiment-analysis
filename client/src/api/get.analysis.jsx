import axios from "axios";

const SERVER_URL = import.meta.VITE_SERVER_URL ||"http://127.0.0.1:5000"

export const GetAnalysisCall = async(url) =>{
    
    try {
        const response = await axios.post(`${SERVER_URL}/analyse`, {
            url: url,
        });
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong! Please try again.",
        };
    }
}