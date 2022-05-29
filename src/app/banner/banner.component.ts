import { Component, OnInit } from '@angular/core';
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  uvMsg: any;
  msg: any;
  uvAlertType: any;
  visibility: any;
  visible = 'visible';
  hidden = 'hidden';
  animation = '';
  fadeInAndOut = '25s fadeInAndOut';
  display = '';
  enableAnimation = true;
  notify = false;
  warning = false;
  danger = false;
  color = '';
  buttonNotify = false;
  buttonWarning = false;
  buttonDanger = false;
  writeUVMessage = true;


  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    //this.visibility = this.visible;
    //this.showBanner()
    this.receiveMessage();
    this.receiveMessageUV();
  }

  hideBanner(): any {
    this.animation = 'none';
    this.visibility = this.hidden;
  }

  showBanner(): any {
    this.enableAnimation = false;
    this.animation = this.fadeInAndOut;

    setTimeout(() => {
      if(this.uvMsg) {
        this.msg = this.uvMsg;
        this.setBannerStyle(this.uvAlertType);
      }
      else
        this.animation = 'none';
      this.writeUVMessage = false;
    }, 12500)

    setTimeout(() => {
      this.animation = 'none';
      this.enableAnimation = true;
      this.writeUVMessage = true;
    }, 25000)
  }

  receiveMessage() {
    this.alertService.onNewMessage()
      .subscribe(msg => {
      // @ts-ignore
      console.log('got a msg: ' + msg.message + ', ' + msg.alertType);

      if(this.enableAnimation) {
        // @ts-ignore
        this.msg = msg.message;
        this.showBanner()
        // @ts-ignore
        this.setBannerStyle(msg.alertType);
      }
    }, error => console.error('receiveMessage got an error: ' + error));
  }

  receiveMessageUV() {
    this.alertService.onNewMessageUV()
      .subscribe(msg => {
        // @ts-ignore
        console.log('got UV message: ' + msg.message + ', ' + msg.alertType);
        if(this.writeUVMessage) {
          // @ts-ignore
          this.uvMsg = msg.message;
          // @ts-ignore
          this.uvAlertType = msg.alertType;
        }
      }, error => console.error('receiveMessage got an error: ' + error));
  }

  setBannerStyle(type: any) {
    this.notify = false;
    this.warning = false;
    this.danger = false;
    this.buttonNotify = false;
    this.buttonWarning = false;
    this.buttonDanger = false;

    if(type == 'Notify') {
      this.notify = true;
      this.buttonNotify = true;
    }
    else if(type == 'Warning') {
      this.warning = true;
      this.buttonWarning = true;
    }
    else if(type == 'Danger') {
      this.danger = true;
      this.buttonDanger = true;
    }
  }
}
