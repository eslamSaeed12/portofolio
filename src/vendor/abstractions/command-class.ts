import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

export abstract class Commandor implements ICommand {
  protected exec: typeof exec = exec;
  abstract call(): void;
}
