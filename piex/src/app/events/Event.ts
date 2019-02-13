import {User} from "../user/User";

export class Event {
  constructor(public id : number ,
              public name : string,
              public time : string,
              public seats : number,
              public taken : number,
              public location : string,
              public organizer : User) {
  }
}
