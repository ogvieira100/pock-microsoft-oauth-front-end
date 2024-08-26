export class Token {
    login!: string;
    name!: string;
    auth_token!: string;
    token!: string;
 
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }