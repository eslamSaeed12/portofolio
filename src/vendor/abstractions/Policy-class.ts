import { intersectionBy } from "lodash";
import { AbilitySymb } from "../decorators/Ability";
import { IAuthorizable } from "../interfaces/Authorizable";
import { GateOperators, IGate } from "../interfaces/IGate";
import { IPolicy } from "../interfaces/IPolicy";

export abstract class Policy<T> implements IPolicy<T>, IGate {
  abstract readonly Entity: T;

  abstract abilities: { key: string; ability: (args: any[]) => any }[];

  getAbilitesAsFunctions(): ((args: any[]) => void)[] {
    return this.abilities.map((ab) => ab.ability);
  }

  getAbilitesAsNames(): string[] {
    return this.abilities.map((ab) => ab.key);
  }

  isAbilityExist(ability: string): boolean {
    return !!this.abilities.findIndex((a) => a.key === ability);
  }

  getPolicyEntity(): T {
    return this.Entity;
  }

  getPolicyEntityName(): string {
    let name = typeof this.Entity === "function" ? this.Entity.name : "";
    return name;
  }

  private assignAbilites() {
    let abilites: ((args: any[]) => any)[] =
      Reflect.getMetadata(AbilitySymb, Object.getPrototypeOf(this)) || [];
    this.abilities = abilites.map((ab) => ({ key: ab.name, ability: ab }));
  }

  constructor(private User: IAuthorizable) {
    this.assignAbilites();
  }

  can(
    ability: string | string[],
    args: any[],
    operator?: GateOperators
  ): boolean {
    let result;

    if (!Array.isArray(ability)) {
      // check ability exist
      if (!this.isAbilityExist(ability)) {
        throw new Error("ability is not exist");
      }

      let invokedAbility = this.abilities.find((a) => a.key === ability)
        ?.ability;

      return typeof invokedAbility === "function"
        ? <boolean>invokedAbility([this.User, ...args])
        : false;
    }

    ability.forEach((a) => {
      if (!this.isAbilityExist(a)) {
        throw new Error(`ability is not exist ${a}`);
      }
    });

    let MatchedAbilites = intersectionBy(
      ability.map((a) => {
        return {
          key: a,
        };
      }),
      this.abilities,
      "key"
    );

    let invoked = this.abilities
      .filter((a) => MatchedAbilites.findIndex((m) => m.key === a.key))
      .map((m) => {
        return m.ability([this.User, ...args]);
      });

    if (!operator) {
      result = !!invoked.every((one) => one === true);
    } else if (operator == "NONE") {
      result = !!invoked.every((one) => one === false);
    } else if (operator === "ANY") {
      result = !!invoked.some((one) => one === true);
    }

    return Boolean(result);
  }

  cannot(
    ability: string | string[],
    args: any[],
    operator?: GateOperators
  ): boolean {
    let result;

    if (!Array.isArray(ability)) {
      // check ability exist
      if (!this.isAbilityExist(ability)) {
        throw new Error("ability is not exist");
      }

      let invokedAbility = this.abilities.find((a) => a.key === ability)
        ?.ability;

      return typeof invokedAbility === "function"
        ? !(<boolean>invokedAbility([this.User, ...args]))
        : false;
    }

    ability.forEach((a) => {
      if (!this.isAbilityExist(a)) {
        throw new Error(`ability is not exist ${a}`);
      }
    });

    let MatchedAbilites = intersectionBy(
      ability.map((a) => {
        return {
          key: a,
        };
      }),
      this.abilities,
      "key"
    );

    let invoked = this.abilities
      .filter((a) => MatchedAbilites.findIndex((m) => m.key === a.key))
      .map((m) => {
        return m.ability([this.User, ...args]);
      });

    if (!operator) {
      result = !!invoked.every((one) => one !== true);
    } else if (operator == "NONE") {
      result = !!invoked.every((one) => one === true);
    } else if (operator === "ANY") {
      result = !!invoked.some((one) => one !== true);
    }

    return Boolean(result);
  }
}
