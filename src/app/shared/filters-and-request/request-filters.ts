/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFilter {
  field: string;

  apply(list: any[]): any[];
}

export class SubStringFilter implements IFilter {
  field: string;
  value: string;

  constructor(field: string, value: string) {
    this.field = field;
    this.value = value;
  }

  apply(list: any[]): any[] {
    return list.filter((item) =>
      item[this.field].toLowerCase().includes(this.value.toLowerCase())
    );
  }
}

export class DateEqualFilter implements IFilter {
  field: string;
  value: Date;

  constructor(field: string, value: Date) {
    this.field = field;
    this.value = value;
  }

  apply(list: any[]): any[] {
    return list.filter((item) => {
      const itemDate = new Date(item[this.field]);
      return itemDate.toDateString() === this.value.toDateString();
    });
  }
}

export class EqualFilter implements IFilter {
  field: string;
  value: any;

  constructor(field: string, value: string | number) {
    this.field = field;
    this.value = value;
  }

  apply(list: any[]): any[] {
    return list.filter((item) => {
      return item[this.field] === this.value;
    });
  }
}

export class BooleanFilter implements IFilter {
  field: string;
  value: boolean;

  constructor(field: string, value: boolean) {
    this.field = field;
    this.value = value;
  }

  apply(list: any[]): any[] {
    return list.filter((item) => {
      return item[this.field] === this.value;
    });
  }
}
