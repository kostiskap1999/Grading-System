import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { UnauthorizedError } from '../errors/errorTypes';

interface JwtToken {
  userId: number,
  role: number
}

export async function createToken(payload: JwtToken) {
  const TOKEN_KEY = process.env.TOKEN_KEY!;
  const token = sign(payload, TOKEN_KEY, {expiresIn: "168h"})

  return token
}

export async function checkToken(token?: string | null) {

  if (!token || token == 'undefined') { // FIXME
    throw new UnauthorizedError(`Token required`);
  }

  const TOKEN_KEY = process.env.TOKEN_KEY!;
  const decoded: any = verify(token, TOKEN_KEY);

  const timeLeft = (decoded.exp - Math.floor(Date.now()/1000));
  if (timeLeft <= 0)
      throw new UnauthorizedError(`Token expired`);

  return decoded
}

export async function getToken(request: Request) {
  return await checkToken(request.headers.get('token'));
}
