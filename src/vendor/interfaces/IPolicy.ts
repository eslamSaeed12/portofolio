export interface IPolicy<T> {
  getAbilitesAsFunctions(): Array<(args: any[]) => void>;
  getAbilitesAsNames(): Array<string>;
  isAbilityExist(ablity: string): boolean;
  getPolicyEntity(): T;
  getPolicyEntityName(): string;
}
