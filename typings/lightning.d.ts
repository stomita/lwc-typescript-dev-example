declare module 'lightning/uiRecordApi' {
  export type GetRecordResult<S extends Object> = {
    error: Error | undefined;
    data: {
      apiName: string;
      childRelationships: { [name: string]: any };
      recordTypeId: string | null;
      recordTypeInfo: object | null;
      systemModstamp: string;
      lastModifiedById: string;
      lastModifiedDate: string;
      fields: { [K in keyof S]: { displayValue: string | null, value: S[K] } },
    } | undefined;
  };

  export const getRecord: (config?: any) => any;
}