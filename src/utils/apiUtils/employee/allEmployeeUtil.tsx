import axios from 'axios';
export async function getAllEmployeePath(path: string): Promise<any> {
    try {
      const url = 'http://' + path + '/api/user/allEmployees/'
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all employees from the path domain');
    }
}