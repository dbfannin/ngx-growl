import {Component, OnInit} from '@angular/core';

import {GrowlItem, GrowlService} from './growl.service';

export interface MyGrowlItem extends GrowlItem {
  closing?: boolean;
}

@Component({
  selector: 'ngx-growl',
  template: `
<div class="message-container {{item.type.toLowerCase()}}" *ngFor="let item of growlItems; let idx = index;" [ngClass]="{closing: item.closing}">
  <span class="close" (click)="close(idx)">×</span>
  <strong class="heading">{{item.heading}}</strong>
  <span class="message">{{item.message}}</span>
</div>
`,
  styles: ['@keyframes slideIn{0%{transform:translateX(100%)}100%{transform:translateX(0)}}',
    '@keyframes slideOut{0%{transform:translateX(0)}100%{transform:translateX(100%)}}',
    ':host{position:fixed;top:0;right:0;z-index:500}',
    '.message-container{transform-origin:top right;animation:.3s ease-out 0s 1 forwards slideIn;position:relative;padding:1rem;margin:.75rem 0;width:27rem;background-color:rgba(250,250,250,.9);border:.15rem solid #e8e8e8;border-radius:.5rem 0 0 .5rem;box-shadow:-.1rem .1rem .5rem #666}',
    '.message-container.closing{animation:.3s ease-out 0s 1 forwards slideOut}',
    '.message-container.error{border-left:.5rem solid #BC5543}',
    '.message-container.warn{border-left:.5rem solid #E7E232}',
    '.message-container.info{border-left:.5rem solid #146587}',
    '.message-container.success{border-left:.5rem solid #477529}',
    '.close{position:absolute;top:.5rem;right:.5rem;cursor:pointer;font-size:2rem;font-weight:700;line-height:0;padding:.5rem .2rem}',
    '.heading{display:block}']
})
export class GrowlComponent implements OnInit {

  constructor(private growlService: GrowlService) {

    this.growlService.OnAddMessage.subscribe((msg: GrowlItem) => this.onAddMessage(msg));
    this.growlService.OnRemoveMessage.subscribe((msg: GrowlItem) => this.onRemoveMessage(msg));

  }

  growlItems: MyGrowlItem[] = [];

  ngOnInit() {
  }

  private _remove(msg: MyGrowlItem) {
    if (!msg || !this.growlItems || !this.growlItems.length) return;

    let curMsg;
    let curMsgIdx;
    for (curMsgIdx = 0; curMsgIdx < this.growlItems.length; curMsgIdx++) {
      if (this.growlItems[curMsgIdx] && this.growlItems[curMsgIdx].id === msg.id) {
        curMsg = this.growlItems[curMsgIdx];
        break;
      }
    }


    if (!curMsg || curMsg.closing) return;

    curMsg.closing = true;
    setTimeout(() => {
      this.growlItems.splice(curMsgIdx, 1);
    }, 500);
  }

  close(index: number) {
    if (typeof index !== 'number') return;

    this._remove(this.growlItems[index]);
  }

  onAddMessage(msg: GrowlItem) {
    this.growlItems.push(msg);
  }

  onRemoveMessage(msg: MyGrowlItem) {
    this._remove(msg);
  }

}

