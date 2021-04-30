declare global {
  interface StringConstructor {
    toCapitalize: () => string;
  }
  interface String {
    toCapitalize: () => string;
  }
}

export {};
