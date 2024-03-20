import axios from 'axios';
export async function getAllStores(): Promise<any> {
    try {
        const response = await axios.get('/api/store/allStores')
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error to get all stores')
    }
}

export async function getAllStoresPath(path: string): Promise<any> {
    try {
        const url = `http://${path}/v1/store/getAll/`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error to get all stores from the path domain')
    }
}
