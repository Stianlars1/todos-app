import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenType } from "./types";

export const isValid = async (accessToken: string | undefined) => {
  if (!accessToken) {
    console.error("No access token provided");
    return false;
  }

  try {
    const tokens = JSON.parse(accessToken);
    const token = tokens.accessToken;

    if (!token) {
      return false;
    }

    const hasExpired = await isTokenExpired(token);

    if (hasExpired) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error with token: ", error);
    return false;
  }
};

export async function isTokenExpired(token: string): Promise<boolean> {
  try {
    const decoded = jwt.decode(token, { json: true }) as JwtPayload | null;
    if (
      decoded &&
      typeof decoded !== "string" &&
      decoded !== undefined &&
      "exp" in decoded &&
      decoded.exp
    ) {
      return decoded.exp < Date.now() / 1000;
    }
    return true; // Assume the token is expired if no expiration field is found
  } catch (error) {
    console.error("Error decoding the token:", error);
    return true; // Assume the token is expired if an error occurs
  }
}

export const decodeToken = (tokenArgument: string) => {
  try {
    const tokens = JSON.parse(tokenArgument) as TokenType;
    const token = tokens.accessToken;
    const decoded = jwt.decode(token, { json: true });
    return decoded ? decoded : null;
  } catch (error) {
    return null;
  }
};
