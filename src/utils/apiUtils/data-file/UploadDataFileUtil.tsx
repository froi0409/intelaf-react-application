import axios from "axios";

export async function uploadDataFile(data: any): Promise<any> {
    try {
        console.log("DATA UTIL");
        console.log(data);
        const response = await axios.post('/api/data-file/uploadDataFile', data);
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(error.message);
    }
}