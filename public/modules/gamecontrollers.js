'use strict';
/* eslint-disable no-console */
export class SinglePlayerController {
  constructor(dispatcher, apiModule, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._UserModel = UserModel;
  }

  init() {
    fetch('/public/gameresources/singleplayer.json')
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          this._pack = JSON.parse(response);

          // this._validatePack();

          for (const round of this._pack.rounds) {
            round.questionCount = round.themes[0].questions.length;
            round.questionsLeft = round.questionCount * round.themes.length;
            for (const theme of round.themes) {
              for (const question of theme.questions) {
                question.active = true;
              }
            }

            console.log(round.questionCount);
            console.log(round.questionsLeft);
          }

          const state = this._dispatcher.getState();
          this._user = [];

          if (state['User']) {
            this._user.push(state['User']);
            this._user[0].score = 0;
          } else {
            const user = {
              login: 'Guest',
              img: '/public/img/avatar.jpg',
              score: 0,
            };

            this._user.push(user);
          }

          this._round = -1;
          this._changeRound();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  _displayQuestions() {
    const users = this._user;

    const obj = {
      round: this._pack.rounds[this._round],
      users: users,
    };

    this._dispatcher.dispatchEvent('QuestionList', obj);
  }

  displayQuestion(tile) {
    if (!(tile instanceof Node)) {
      throw new TypeError('node expected');
    }

    let num = -1;
    const parent = tile.parentElement;
    for (const i in parent.childNodes) {
      if (parent.childNodes.hasOwnProperty(i)) {
        if (parent.childNodes[i] === tile) {
          num = i;
          break;
        }
      }
    }

    console.log(num);
    const actualNum = Math.floor((num - 1) / 2);
    console.log(actualNum);

    const questionNum = actualNum %
      (this._pack.rounds[this._round].questionCount + 1) - 1;
    const themeNum = Math.floor(actualNum /
      (this._pack.rounds[this._round].questionCount + 1)
    );
    console.log(questionNum);
    console.log(themeNum);

    if (questionNum !== -1) {
      const question = this._pack.rounds[this._round]
          .themes[themeNum].questions[questionNum];

      if (question.active) {
        this._theme = themeNum;
        this._question = questionNum;

        const users = this._user;
        this._dispatcher.dispatchEvent('Question', {
          question: question.question,
          users: users,
        });
      }
    }
  }

  displayAnswer(answer) {
    const users = this._user;

    const question = this._pack.rounds[this._round]
        .themes[this._theme].questions[this._question];

    let isCorrect = false;
    for (const rightAnswer of question.answers) {
      if (answer.toLowerCase() === rightAnswer.toLowerCase()) {
        isCorrect = true;
        break;
      }
    }

    let result = '';
    if (isCorrect) {
      result = 'You are right!';
      this._user[0].score += question.value;
    } else {
      result = 'Correct answer is: ' + question.answers[0];
      this._user[0].score -= question.value;
    }

    question.active = false;
    this._pack.rounds[this._round].questionsLeft--;
    let handler = this._displayQuestions;

    if (this._pack.rounds[this._round].questionsLeft === 0) {
      handler = this._changeRound;
    }

    const obj = {
      message: result,
      users: users,
    };

    setTimeout(() => {
      handler.bind(this)();
    }, 3000);
    this._dispatcher.dispatchEvent('Message', obj);
  }

  _changeRound() {
    this._round++;
    if (this._round === this._pack.rounds.length) {
      this._endGame();
      return;
    }

    const obj = {
      message: 'Round ' + (this._round + 1),
      users: this._user,
    };

    setTimeout(() => {
      this._displayQuestions();
    }, 3000);

    this._dispatcher.dispatchEvent('Message', obj);
  }

  _endGame() {
    const obj = {
      message: 'Game ended! Your score: ' + this._user[0].score,
      users: this._user,
    };

    this._dispatcher.dispatchEvent('Message', obj);
  }
}
