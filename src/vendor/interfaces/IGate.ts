export type GateOperators = "ANY" | "NONE";

export interface IGate {
  define?(ability: string, cb: (args: any[]) => any): void;
  can(
    ability: string | string[],
    args: any[],
    operator?: GateOperators
  ): boolean;
  cannot(
    ability: string | string[],
    args: any[],
    operator?: GateOperators
  ): boolean;
  for?<T>(entity: T): IGate;
}
