declare module '@salesforce/user/Id' {
  const field: string;
  export default field;
}

declare module '@salesforce/user/isGuest' {
  const field: boolean;
  export default field;
}

declare module '@salesforce/schema/*' {
  const object: string;
  export default object;
}