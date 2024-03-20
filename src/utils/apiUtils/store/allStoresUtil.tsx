import axios from 'axios';
export async function getAllStores(): Promise<any> {
    const url = 'http://localhost:3000/api/store/allStores/'
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all stores from ' + url);
    }
}