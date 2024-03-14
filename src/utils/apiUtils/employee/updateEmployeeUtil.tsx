import axios from 'axios';
export async function putUpdateEmployee(data:any): Promise<any> {
    const url ='http://localhost:3000/api/user/updateEmployee/'
    try {      
      const response = await axios.put(url,data);
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error updating the employee from' + url);
    }
}