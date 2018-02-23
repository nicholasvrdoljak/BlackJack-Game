class Deck {
    constructor(){
      this.deck = [];
      this.dealtCards = [];
    }

    generateDeck(){
      let card = (suit,value) => {
        let tempCard = {};
        tempCard.name = value + ' of ' + suit
        tempCard.value = value;
        tempCard.suit = suit;
        return tempCard;
      }
      let suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
      let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
      for (let s = 0; s < suits.length; s++){
        for (let v = 0; v < values.length; v++){
          this.deck.push(card(suits[s], values[v]));
        }
      }
    }

    shuffle(){
      let currentIndex = this.deck.length;
      let randomIndex, tempValue;

      while (currentIndex !== 0){
        currentIndex -= 1;
        randomIndex = Math.floor(Math.random() * currentIndex);
        tempValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = tempValue;
      }
    }

    dealCards(){
      let card = this.deck.shift();
      this.dealtCards.push(card);
      return card;
    }

}
