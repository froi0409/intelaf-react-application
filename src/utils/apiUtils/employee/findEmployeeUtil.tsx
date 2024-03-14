import axios from 'axios';
export async function getEmployeeByUsernamePath(username: string): Promise<any> {
  try {
    const url = `http://localhost:3000/api/user/findEmployee?username=${username}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el empleado desde el dominio especificado');
  }
}