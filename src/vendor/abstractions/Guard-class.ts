import { Request, NextFunction, Handler, Response } from "express";
import { singleton } from "tsyringe";
import { Authenticatble } from "../interfaces/Authenticatable";
import { IGuard } from "../interfaces/IGuard";

@singleton()
export class Guard implements IGuard {
  private default!: Authenticatble;

  SetDefault(default_: Authenticatble) {
    this.default = default_;
  }

  useGuardMiddleware(this: this, g?: Authenticatble): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
      Object.defineProperty(req, "auth", { value: g ? g : this.default });
      next();
    };
  }
}
