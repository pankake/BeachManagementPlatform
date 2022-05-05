import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendWind(city: any, wind: any) {
    this.socket.emit('eventWind', city, wind);
  }

  sendUV(city: any, uv: any) {
    this.socket.emit('eventUV', city, uv);
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('eventAlert', msg => {
        observer.next(msg);
      });
    });
  }

  onNewMessageUV() {
    return new Observable(observer => {
      this.socket.on('eventAlertUV', msg => {
        observer.next(msg);
      });
    });
  }
}
