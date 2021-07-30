import { Injectable } from '@angular/core';
import { Coordinate } from '../model/coordinate';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  WIDTH = 4;
  HEIGHT = 5;

  setDimensions(width: number, height: number) {
    this.WIDTH = width;
    this.HEIGHT = height;
  }

  drawA(topLeft: Coordinate): Coordinate[] {
    const result: Coordinate[] = [];

    // draw leftmost vertical
    for (let i = 2; i <= this.HEIGHT; i++) {
      result.push({
        x: topLeft.x,
        y: this.HEIGHT - i,
      })
    }
    // draw rightmost vertical
    for (let i = 2; i <= this.HEIGHT; i++) {
      result.push({
        x: topLeft.x + this.WIDTH - 1,
        y: this.HEIGHT - i,
      })
    }

    // draw top horizontal
    result.push(...this.drawConnectingHorizontal({
      x: topLeft.x + 1,
      y: this.HEIGHT - 1
    }))

    // draw middle horizontal
    result.push(...this.drawConnectingHorizontal({
      x: topLeft.x + 1,
      y: (this.HEIGHT - 1) / 2
    }))

    return result;
  }

  drawB(topLeft: Coordinate): Coordinate[] {
    const result: Coordinate[] = [];

    // draw top horizontal
    result.push(...this.drawConnectingHorizontal({
      x: topLeft.x + 1,
      y: topLeft.y
    }))
    // draw middle horizontal
    result.push(...this.drawConnectingHorizontal({
      x: topLeft.x + 1,
      y: (this.HEIGHT - 1) / 2
    }))
    // draw bottom horizontal
    result.push(...this.drawConnectingHorizontal({
      x: topLeft.x + 1,
      y: 0
    }))
    // draw leftmost vertical
    result.push(...this.drawFullLine(topLeft))
    // draw rightmost top vertical
    // draw leftmost top vertical

    return result;
  }

  drawConnectingHorizontal(leftMost: Coordinate): Coordinate[] {
    const result: Coordinate[] = [];

    for (let i = 0; i < this.WIDTH - 2; i++) {
      result.push({
        x: leftMost.x + i,
        y: leftMost.y,
      })
    }

    return result;
  }

  drawFullLine(topMost: Coordinate): Coordinate[] {
    const result: Coordinate[] = [];

    for(let i = 0; i < this.HEIGHT; i++) {
      result.push({
        x: topMost.x,
        y: topMost.y - i
      })
    }

    return result;
  }
}


