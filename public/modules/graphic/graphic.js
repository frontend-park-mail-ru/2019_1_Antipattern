'use strict';
import * as f from './figures.js';

class GraphicController {
  constructor(canvas, gameDispatcher) {
    this._canvas = null;
    this._ctx = null;
    this._figures = [];
  }

  getCanvasSize() {
    return {width: this._canvas.width, height: this._canvas.height};
  }

  initController() {
    const canvas = document.getElementById('gameCanvas');
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }

  addFigure(figure) {
    this._figures.push(figure);
  }

  _clr() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  draw() {
    if (this._canvas === null) {
      throw new Error('Controller hasn\'t been initialized!');
    }

    this._clr();
    // ~~~TEST~~~
    // this.addFigure(new f.Rectangle((this._canvas.width - 10) / 2, (this._canvas.height - 10) / 2, 10, 10));
    // ~~~TEST~~~

    for (const figure of this._figures) {
      figure.draw(this._ctx);
    }

    this._figures = [];
  }
}
export {
  GraphicController,
};
