import { AnyAbility } from "@casl/ability";

export interface IAuthorizable {
  defineAbilites(): void;
  getAbilites(): AnyAbility;
}
