import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  socket$: WebSocketSubject<any>;

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
    }
  }

  private getNewWebSocket() {
    return webSocket('ws://192.168.0.7:8999'); // Replace this with some kind of process variable
  }

  sendMessage(msg: any) {
    console.log('sending message')
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete();
  }
}


