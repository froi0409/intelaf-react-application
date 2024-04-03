import { NextRequest } from "next/server";

export function getJwt(req: any) {
    return req.headers.authorization;
}