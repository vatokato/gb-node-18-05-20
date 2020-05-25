const { getRandom } = require('./helpers');
const Deck = require('./Deck');

const WINNER_VALUE = 21;

const CARD_POINTS = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': 11,
};

class Blackjack {
  #defaults = {
    onWin: (userScore, aiScore) => {
      console.log(`Вы выйграли, набрав ${userScore}. У компьютера ${aiScore}`);
    },
    onLose: (userScore, aiScore) => {
      console.log(`Вы проиграли, набрав ${userScore}. У компьютера ${aiScore}`);
    },
    onDraw: (userScore, aiScore) => {
      console.log(`Ничья, вы набрали ${userScore}. У компьютера ${aiScore}`);
    },
    afterUserTurn: (userScore, card) => {
      console.log(`Вы вытянули ${card.fullName}, текущий счет: ${userScore}`);
    },
    afterAiTurn: (userScore, card) => {
      console.log(`Компьютер вытянул ${card.fullName}, У него: ${userScore}`);
    },
    onWrongTurn: () => {
      console.log('Игра окончена. Начните заново');
    },
    afterUserStop: () => {
      console.log('Теперь ход компьютера.');
    },
    afterStartGame: () => {
    },
    afterEndGame: result => console.log(result),
  };

  #gameInProcess = false;

  constructor(params) {
    this.settings = Object.assign( {}, this.#defaults, params);
  }

  isGaming = () => this.#gameInProcess;

  newGame = () => {
    const { afterStartGame } = this.settings;
    this.deck = new Deck();
    this.deck.cards.forEach(card => {
      card.value = CARD_POINTS[card.name];
    });
    this.userPulledCards = [];
    this.aiPulledCards = [];
    this.aiRedLine = Math.round(getRandom(15, WINNER_VALUE - 3));
    this.#gameInProcess = true;
    afterStartGame();
  };

  #stopGame = result => {
    const { afterEndGame } = this.settings;
    this.deck = [];
    this.#gameInProcess = false;
    afterEndGame(result);
  };

  getUserScore = () =>
    this.userPulledCards.reduce((sum, card) => sum + card.value, 0);

  #getAiScore = () =>
    this.aiPulledCards.reduce((sum, card) => sum + card.value, 0);

  userTurn = () => {
    const { afterUserTurn, onWrongTurn } = this.settings;
    if(!this.#gameInProcess) return onWrongTurn();
    const { result: card} = this.deck.getCard();
    this.userPulledCards.push(card);
    const score = this.getUserScore();
    afterUserTurn(score, card);
    if(score > WINNER_VALUE) {
      this.userStop();
    }
  };

  userStop = () => {
    const { afterUserStop, onWrongTurn } = this.settings;
    if(!this.#gameInProcess) return onWrongTurn();
    afterUserStop();
    this.#aiTurn();
  };

  #aiTurn = () => {
    const { afterAiTurn } = this.settings;
    const { result: card} = this.deck.getCard();
    this.aiPulledCards.push(card);
    const score = this.#getAiScore();
    afterAiTurn(score, card);
    if(score < this.aiRedLine) {
      setTimeout(this.#aiTurn.bind(this), 500);
    } else {
      this.#stopGame(this.#getResult());
    }
  };

  #getResult = () => {
    const { onWin, onLose, onDraw } = this.settings;
    const userScore = this.getUserScore();
    const aiScore = this.#getAiScore();
    if(
      userScore <= WINNER_VALUE && userScore > aiScore
      || userScore <= WINNER_VALUE && aiScore > WINNER_VALUE
    ) {
      return onWin(userScore, aiScore);
    }
    if(userScore > WINNER_VALUE || userScore < aiScore) {
      return onLose(userScore, aiScore);
    }
    if(userScore === aiScore) {
      return onDraw(userScore, aiScore);
    }
  };
}

module.exports = Blackjack;