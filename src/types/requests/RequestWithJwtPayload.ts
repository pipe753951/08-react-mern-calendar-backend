import type { Request } from "express";

interface AppJwtPayload {
  uid: string;
  name: string;
}

interface RequestWithJwtPayload extends Request {
  jwtPayload: AppJwtPayload;
}

export { AppJwtPayload, RequestWithJwtPayload };
