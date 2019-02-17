import {Event} from "../events/Event";
import {User} from "../user/User";

export class Comment {
  constructor(public id : number,
              public comment : string,
              public event : Event,
              public user : User
  ) {
  }
}
