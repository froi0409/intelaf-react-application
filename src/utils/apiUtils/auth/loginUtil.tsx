import axios from "axios";

export async function login(data: any): Promise<any> {
    try {
        const response = await axios.post('/api/auth/login', data);
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(error);
    }
}
