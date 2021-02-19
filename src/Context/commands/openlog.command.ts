import { exec, ExecException } from "child_process";
import { injectable } from "tsyringe";
import { Commandor } from "../../vendor/abstractions/command-class";
import { ICommand } from "../../vendor/interfaces/ICommand";

@injectable()
export default class openlog extends Commandor implements ICommand {
  public call() {
    this.exec(
      ".gitignore",
      (err: ExecException | null, stdout: string, stdin: string) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
}
