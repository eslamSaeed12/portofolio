import { Response, Request } from "express";
import { Controller, Get, Req, Res } from "routing-controllers";

@Controller("/")
export default class HomeController {
  @Get("home")
  public index(@Res() res: Response, @Req() req: Request) {
    return res.json("done").status(200);
  }
}
