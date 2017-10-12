import {Component, OnInit} from '@angular/core';

import {GrowlItem, GrowlService} from './growl.service';

export interface MyGrowlItem extends GrowlItem {
  closing?: boolean;
}

@Component({
  selector: 'ngx-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.scss']
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

