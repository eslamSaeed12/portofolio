import "reflect-metadata";
import { container } from "tsyringe";
import { application } from "./vendor/application";

const server = container.resolve(application);

server.bootstrap().catch((err) => {
  console.error(err);
  process.exit(0);
});
