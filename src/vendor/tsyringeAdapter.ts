import { ClassConstructor } from "class-transformer";
import { Action, IocAdapter } from "routing-controllers";
import { DependencyContainer } from "tsyringe";

export class TsyringeAdapter implements IocAdapter {
  constructor(private readonly container: DependencyContainer) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    return this.container.resolve(someClass);
  }
}
