import axios from "axios"
import { getCookieJwt } from "src/utils/cookieUtils";

export async function getStoreByIdLogin(idStore: any): Promise<any> {
    try {
        const response = await axios.get(`/api/store/findStoreByIdLogin?idStore=${idStore}`, {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response; 
    } catch (error) {
        throw new Error('Error al obtener tienda con código: ' + idStore);
    }    
}