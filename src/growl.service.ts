import {Injectable, EventEmitter} from '@angular/core';

export type InputMessage = Message | string | Message[] | string[];


export interface GrowlItem {
  heading?: string;
  message?: string;
  type: 'ERROR' | 'WARN' | 'INFO' | 'SUCCESS';
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

  private message(msg: Message | string, type: 'ERROR' | 'WARN' | 'INFO' | 'SUCCESS') {
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

  private addMessage(msg: InputMessage, type: 'ERROR' | 'WARN' | 'INFO' | 'SUCCESS') {
    if (!msg) return;

    const arrayMsg: Message[] | string[] = msg instanceof Array ? msg : [msg];

    arrayMsg.forEach((item) => {
      this.message(item, type);
    })
  }


  addError(msg: InputMessage) {
    this.addMessage(msg, 'ERROR');
  }

  addWarn(msg: InputMessage) {
    this.addMessage(msg, 'WARN');
  }

  addInfo(msg: InputMessage) {
    this.addMessage(msg, 'INFO');
  }

  addSuccess(msg: InputMessage) {
    this.addMessage(msg, 'SUCCESS');
  }


}
