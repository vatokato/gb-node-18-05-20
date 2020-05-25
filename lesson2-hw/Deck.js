class Deck {
  _names = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
  _suits = [
    { name: 'heart', symbol: '♥' },
    { name: 'diamond', symbol: '♦' },
    { name: 'club', symbol: '♣' },
    { name: 'spade', symbol: '♠' },
  ];
  cards = [];
  constructor() {
    this._suits.forEach(suit => {
      this._names.forEach(name => {
        this.cards.push({
          name,
          suitName: suit.name,
          suitSymbol: suit.symbol,
          fullName: `${name}${suit.symbol}`,
        });
      });
    });
    this.shuffle(this.cards);
  }

  shuffle = cards => cards.sort(() => Math.random() - 0.5);

  getCard = () => {
    if(this.getCount() > 0) {
      return {
        error: false,
        result: this.cards.shift()
      };
    }
    return {
      error: true,
      result:'Колода закончилась'
    };
  };

  getCount = () => this.cards.length;
}

module.exports = Deck;