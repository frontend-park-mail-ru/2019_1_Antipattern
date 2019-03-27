import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';

class LeaderboardController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  getLeaderboard(page) {
    console.log('controller started working');
    apiModule.getUsers(page)
        .then((object) => {
          console.log('controller got request');
          this._dispatcher.dispatchEvent('LeaderboardLoaded', {
            users: object.users,
            pageCount: Math.ceil(object.count / 10),
            currentPage: page - 1,
          });
          console.log('event emitted');
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

const leaderboardController = new LeaderboardController(dispatchAdapter);

export {leaderboardController};
