import {User} from "../User";
import {Event} from "../../events/Event";

export class Ticket {

  constructor(public id : number ,
              public deleted : boolean,
              public attended : boolean,
              public event : Event,
              public user : User) {
  }
}
