import { GetRecordResult } from "lightning/uiRecordApi";

/**
 *
 */
export function flattenGetRecordResultData<S extends object>(
  data: NonNullable<GetRecordResult<S>["data"]>
): S {
  return (Object.keys(data.fields) as (keyof S)[]).reduce(
    (m, key) => ({
      ...m,
      [key]: data.fields[key].value
    }),
    {}
  ) as S;
}
