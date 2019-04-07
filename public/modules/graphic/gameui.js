'use strict';

import {GraphicController} from "./graphic.js";

class GameUI {
  constructor(graphicController) {
    this._graphicController = graphicController;
    this._baseUI = null;
  }

  initUI() {
    this._graphicController.initController();
    this.this._baseUI = [];
  }
}