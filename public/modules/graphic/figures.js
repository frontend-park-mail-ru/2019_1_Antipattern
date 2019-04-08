'use strict';

class Figure {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  set coordinates({x = this._x, y = this._y}) {
    this._x = x;
    this._y = y;
  }

  get coordinates() {
    return {x: this._x, y: this._y};
  }

  draw(ctx) {
    if (!ctx instanceof CanvasRenderingContext2D) {
      throw new TypeError('CanvasRenderingContext2D expected');
    }
  }
}

class Rectangle extends Figure {
  constructor(x, y, width, height, colour = 'white') {
    super(x, y);
    this._width = width;
    this._height = height;
    this._colour = colour;
  }

  draw(ctx) {
    super.draw(ctx);

    ctx.beginPath();
    ctx.rect(this._x, this._y, this._width, this._height);
    ctx.fillStyle = this._colour;
    ctx.fill();
    ctx.closePath();
  }
}


export {
  Figure,
  Rectangle,
};
