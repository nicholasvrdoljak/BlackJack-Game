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

//check your card values
let checkValues = (cardArray) => {
  //add up card values in the given array's cards
  let total = 0;
  let containsAce = false;
  let numOfAces = 0;
  for (let i = 0; i < cardArray.length; i++){
    if (['J', 'Q', 'K'].includes(cardArray[i].value)){
      total += 10;
    } else if (cardArray[i].value !== 'A'){
      total += cardArray[i].value;
    } else if (cardArray[i].value === 'A'){
      containsAce = true;
      numOfAces += 1;
    }
  }

  let aces = (containsAce, numOfAces, total) => {
    if (containsAce === true){
      let tempTotal = total;
      tempTotal += numOfAces * 11;
      if (tempTotal > 21 && numOfAces > 0){
        tempTotal = total + 1;
        if (numOfAces - 1 === 0){
          return [tempTotal, containsAce];
        } else {
          return aces(containsAce, numOfAces - 1, tempTotal);
        }
      } else {
        return [tempTotal, containsAce];
      }
    } else {
      return [total, containsAce];
    }
  }
  return aces(containsAce, numOfAces, total);
}

//check for the dealer to hit
let dealerHitting = (dealerCards) => {
  //hit dealer if necessary
  let total = checkValues(dealerCards)[0];
  let aces = checkValues(dealerCards)[1];
    //<17, hit, update
    if (total<17){
      dealerCards.push(Deck.dealCards());
      return dealerHitting(dealerCards);
    //soft 17, hit, hard 17, hold
    }else if (total === 17 && aces){
      dealerCards.push(Deck.dealCards());
      return dealerHitting(dealerCards);
    }else if (total >= 17 && total <21){
      checkWinner(yourCards, dealerCards);
    }
}

let checkWinner = (yourCards, dealerCards) => {
  let yTotal = checkValues(yourCards)[0];
  let dTotal = checkValues(dealerCards)[0];
  if (yTotal > dTotal){
    //you win
  }else if (dTotal > yTotal){
    //you lose
  }else {
    //tie
  }

}
//compare your cards and dealer cards
// let whoWon = () => {
//
// }
