// utils/helpers/jwtHelper.ts
//@ts-ignore
import jwt from 'jsonwebtoken';
import { getCookie } from "cookies-next";

export function decodeJWT(attributeName: string): any {
  try {
    const token = getCookie('jwt')
    const decodedToken: any = jwt.decode(token);
    return decodedToken[attributeName];
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
