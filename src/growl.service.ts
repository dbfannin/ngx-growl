import {Injectable, EventEmitter} from '@angular/core';
import {NGXLogger} from 'ngx-logger'

export interface GrowlItem {
  heading?: string;
  message?: string;
  type: 'ERROR'|'WARN'|'INFO'|'SUCCESS';
  id: number;
}

export interface Message {
  heading?: string;
  message?: string;
}

@Injectable()
export class GrowlService {

  constructor() {
  }

  private timeout: number = 5000;
  OnAddMessage: EventEmitter<any> = new EventEmitter();
  OnRemoveMessage: EventEmitter<any> = new EventEmitter();

  static _createMessage(msg: Message | string): Message {
    return typeof msg === 'string' ? {message: msg} : msg;
  }

  private addMessage(msg: Message | string, type: 'ERROR'|'WARN'|'INFO'|'SUCCESS') {
    if (!msg) return;

    msg = GrowlService._createMessage(msg);

    //need id to know that the right one is being removed
    let message: GrowlItem = {
      heading: msg.heading,
      message: msg.message,
      type: type,
      id: Math.floor((Math.random() * 999999999999) + 1)
    };

    this.OnAddMessage.emit(message);
    setTimeout(() => {
      this.OnRemoveMessage.emit(message);
    }, this.timeout)
  }


  addError(msg: Message | string) {
    this.addMessage(msg, 'ERROR');
  }

  addWarn(msg: Message | string) {
    this.addMessage(msg, 'WARN');
  }

  addInfo(msg: Message | string) {
    this.addMessage(msg, 'INFO');
  }

  addSuccess(msg: Message | string) {
    this.addMessage(msg, 'SUCCESS');
  }


}
