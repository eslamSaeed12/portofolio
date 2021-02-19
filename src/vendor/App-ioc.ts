import { join } from "path";
import requireAll from "require-all";
import { container } from "tsyringe";

export class appIoc {

  private providers: { token: string; value: any }[] = [];

  private contexts: { path: string; filePattern: any }[] = [
    {
      path: join(__dirname, "..", "Config"),
      filePattern: /(.+conf)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Logic", "Services"),
      filePattern: /(.+service)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Logic", "Helpers"),
      filePattern: /(.+helper)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Context", "events"),
      filePattern: /(.+event)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Context", "jobs"),
      filePattern: /(.+job)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Context", "tasks"),
      filePattern: /(.+task)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Context", "commands"),
      filePattern: /(.+command)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Core", "errors"),
      filePattern: /(.+err)\.ts$/,
    },
    {
      path: join(__dirname, "..", "Database", "Connections"),
      filePattern: /(.+con)\.ts$/,
    },
  ];

  public setProviders() {
    this.contexts.forEach((ctx) => {
      let providers_ = requireAll({
        dirname: ctx.path,
        filter: ctx.filePattern,
        recursive: true,
      });

      for (const c in providers_) {
        this.providers.push({
          token: providers_[c]?.default.name,
          value: providers_[c]?.default,
        });
      }
    });
  }

  public registerProviders() {
    this.providers.forEach((p) => {
      container.register<typeof p>(p.token, p.value);
    });
  }
}
