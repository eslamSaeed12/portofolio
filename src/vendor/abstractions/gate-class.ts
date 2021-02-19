import { IAuthorizable } from "../interfaces/Authorizable";
import { GateOperators, IGate } from "../interfaces/IGate";
import { Policy } from "./Policy-class";
import { flatten, intersectionBy } from "lodash";

export class Gate implements IGate {
    
  private ablities: { key: string; ability: (args: any[]) => any }[] = [];

  constructor(private User: IAuthorizable, policies: Array<Policy<any>>) {
    let policiesAbilites = flatten(
      policies.map((p) => p.getAbilitesAsFunctions())
    );

    this.ablities = policiesAbilites.map((p) => ({ key: p.name, ability: p }));
  }

  public isAbilityExist(key: string) {
    return !!this.ablities.findIndex((a) => a.key === key);
  }

  define(ability: string, cb: (args: any[]) => any): void {
    this.ablities.push({ key: ability, ability: cb });
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

      let invokedAbility = this.ablities.find((a) => a.key === ability)
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
      this.ablities,
      "key"
    );

    let invoked = this.ablities
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

  // cannot
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

      let invokedAbility = this.ablities.find((a) => a.key === ability)
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
      this.ablities,
      "key"
    );

    let invoked = this.ablities
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

  for<T>(entity: T) {
    this.User = entity;
    return this;
  }
}
