export class User {
  constructor(public id : number = null,
              public first_name : string,
              public middle_name : string,
              public last_name : string,
              public password : string,
              public email : string,
              public phone : string,
              public birth : string,
              public role : number) {

  }
}
