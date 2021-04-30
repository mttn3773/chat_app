String.prototype.toCapitalize = function (this: string) {
  return this[0].toUpperCase() + this.slice(1);
};

export {};
