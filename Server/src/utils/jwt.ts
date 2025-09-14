
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { _Config } from "../config/config";



type TimeUnit = "s" | "m" | "h" | "d" | "w" | "y"
type TimeString = `${number}${TimeUnit}`

export type AccessTokenPayload = {
  userId: string
}

type SignOptsAndSecret = SignOptions & {
  secret: string;
  expiresIn?: TimeString | number
}

const defaults: SignOptions = {
  audience: ['user']
}
const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: _Config.JWT_EXPIRES_IN as TimeString,
  secret: _Config.JWT_SECRET as string
}

export const signJwtToken = (payload: AccessTokenPayload, option?: SignOptsAndSecret) => {

   const { secret, ...opts } = option ?? accessTokenSignOptions;
  const token = jwt.sign(payload, secret, {
    ...defaults, ...opts,
  });

  const decoded = jwt.decode(token) as JwtPayload | null;
  const expiresAt = decoded?.exp ? decoded.exp * 1000 : undefined;

  return {
    token,
    expiresAt
  }
}