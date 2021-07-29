import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      console.log('connecting')
      this.socket$ = this.getNewWebSocket();
      this.socket$.subscribe(res => {
        console.log(res);
      })
      // const messages = this.socket$.pipe(
      //   tap({
      //     error: error => console.log(error),
      //   }), catchError(_ => EMPTY));
      // this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket() {
    console.log('getting new socket');
    return webSocket('ws://192.168.0.14:8999');
  }

  sendMessage(msg: any) {
    console.log('sending message')
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete();
  }
}


