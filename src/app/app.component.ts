import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './core/data.service';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pi-lights-spa';
  inputValue = 'begin';
  color;
  subject = webSocket({
    url: 'ws://localhost:8999'
  });
  rainbowColors = [
    '#ff0000',
    '#ffa500',
    '#ffff00',
    '#008000',
    '#0000ff',
    '#4b0082',
    '#ee82ee'
  ]
  breakRecursive = false;
  rainbowInterval = 1000;

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.dataService.connect();
    // this.dataService.messages$.subscribe(res => {
    //   console.log(res);
    // })
    // this.subject.subscribe(
    //   msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );
  }

  submit() {
    console.log('submitting')
    this.dataService.sendMessage({
      r: 255,
      g: 0,
      b: 0
    });
    // this.subject.next(this.inputValue);
  }

  onColorPickerChanged(hex) {
    this.stopRainbow();
    this.changeColor(hex);
  }

  changeColor(hex) {
    const body = this.hexToRgb(hex);
    this.dataService.sendMessage(body);
  }

  stopRainbow() {
    this.breakRecursive = true;
    setTimeout(() => {
      this.breakRecursive = false
    }, 2000)
  }

  clear() {
    this.stopRainbow();
    this.changeColor('#000000');
  }

  flashRainbow() {
    // let index = 0;

    // while (true) {
    //   console.log('in loop')
    //   setTimeout(() => {
    //     this.onColorChanged(rainbowColors[index]);
    //     index++;
    //     if (index > 6) {
    //       index = 0;
    //     }
    //   },1000);
    // }
    this.timeout();
  }

  timeout(index = 0) {
    setTimeout(() => {
        this.changeColor(this.rainbowColors[index]);
        index++;
        if (index > 6) {
          index = 0;
        }
        if (!this.breakRecursive) {
          this.timeout(index);
        }
    }, this.rainbowInterval);
}

  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  get() {
    this.http.get('/api').subscribe(res => {
      console.log(res);
    })
  }

  red() {
    const body = {
      value: 'red'
    }
    this.http.post('/api', body).subscribe(res => {
      console.log(res);
    })
  }

  green() {
    const body = {
      value: 'green'
    }
    this.http.post('/api', body).subscribe(res => {
      console.log(res);
    })
  }

  blue() {
    const body = {
      value: 'blue'
    }
    this.http.post('/api', body).subscribe(res => {
      console.log(res);
    })
  }
}
