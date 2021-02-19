import { Handler } from "express";
import { Authenticatble } from "./Authenticatable";

export interface IGuard {
  SetDefault(default_: Authenticatble): void;
  useGuardMiddleware(guard?: Authenticatble): Handler;
}
