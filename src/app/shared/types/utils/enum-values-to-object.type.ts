export type EnumValuesToObject<Enum extends string, ObjectValuesType = string> = {
  readonly [O in Enum]: ObjectValuesType
};
