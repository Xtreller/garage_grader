import { EventEmitter } from "@angular/core";

export class LoginEmitter{
  static login = new EventEmitter<boolean>();
}
