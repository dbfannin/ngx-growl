import {Component, OnInit} from '@angular/core';

import {GrowlItem, GrowlService} from './growl.service';
import {GrowlConfig} from './growl.config';

export interface MyGrowlItem extends GrowlItem {
  closing?: boolean;
}

@Component({
  selector: 'ngx-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.scss']
})
export class GrowlComponent implements OnInit {

  constructor(private config: GrowlConfig, private growlService: GrowlService) {
    this.growlService.OnAddMessage.subscribe((msg: GrowlItem) => this.onAddMessage(msg));
    this.growlService.OnRemoveMessage.subscribe((msg: GrowlItem) => this.onRemoveMessage(msg));
  }

  growlItems: MyGrowlItem[] = [];

  ngOnInit() {
  }

  private _remove(msg: MyGrowlItem, done?: () => void) {
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
      if (done) {
        done();
      }
    }, 350);
  }

  close(index: number, done?: () => void) {
    if (typeof index !== 'number') return;

    this._remove(this.growlItems[index], done);
  }

  onAddMessage(msg: GrowlItem) {
    if (this.growlItems.length && this.config.maxMessages && this.config.maxMessages <= this.growlItems.length) {
      this.close(this.growlItems.length - 1, () => {
        this.growlItems.unshift(msg);
      });
    } else {
      this.growlItems.unshift(msg);
    }

  }

  onRemoveMessage(msg: MyGrowlItem) {
    this._remove(msg);
  }

}

