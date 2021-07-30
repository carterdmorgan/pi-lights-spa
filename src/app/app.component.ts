import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { DrawingService } from './core/drawing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pi-lights-spa';
  inputValue = 'begin';
  color;
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
    private dataService: DataService,
    private drawingService: DrawingService
  ) {
    this.dataService.connect();
    this.dataService.socket$.subscribe(res => {
      console.log(res);
    })
    console.log(this.drawingService.drawB({
      x: 0,
      y: 4
    }));
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
    this.iterateRainbow();
  }

  iterateRainbow(index = 0) {
    setTimeout(() => {
        this.changeColor(this.rainbowColors[index]);
        index++;
        if (index > 6) {
          index = 0;
        }
        if (!this.breakRecursive) {
          this.iterateRainbow(index);
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
}
