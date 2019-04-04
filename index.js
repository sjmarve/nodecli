#!/usr/bin/env node --harmony

const program = require('commander');

class PlayingCards {
    constructor(hand){
        this.unsanitizedCards = hand.split(',').map(v => v.trim());

        // ranks in order
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        //suits
        this.suits = ['S', 'C', 'H', 'D'];
    }

    get bestPockerHand(){
        const ranked = this.ranked();
        const isFlush = this.isFlush();
        const isStraight = this.isStraight(ranked);

        if (isStraight && isFlush && ranked[0][0].rank == 'A')
            return 'royal flush';
        else if (isStraight && isFlush)
            return 'straight flush';
        else if (ranked[0].length == 4)
            return 'four of a kind';
        else if (ranked[0].length == 3 && ranked[1].length == 2)
            return 'full house';
        else if (isFlush)
            return 'flush';
        else if (isStraight)
            return 'straight';
        else if (ranked[0].length == 3)
            return 'three of a kind';
        else if (ranked[0].length == 2 && ranked[1].length == 2)
            return 'two pair';
        else if (ranked[0].length == 2)
            return 'one pair';
        else
            return 'high card';
    }
    
    get cards() {
        //sanitize cards
        return this.unsanitizedCards.map(v => ({
            rank: v.slice(0, v.length - 1),
            suit: v.slice(-1),
        })).filter( 
            v => !!(this.ranks.indexOf(v.rank) > -1 && this.suits.indexOf(v.suit) > -1)
        );
    }

    ranked() {
        // split cards by rank
        let result = [];
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            let r = this.ranks.indexOf(card.rank);
            result[r] = result[r] || [];
            result[r].push(card);
        }
        // condense
        result = result.filter(rank => !!rank);
        // high to low
        result.reverse();
        // pairs and sets first
        result.sort((a, b) => a.length > b.length ? -1 : a.length < b.length ? 1 : 0);

        return result;
    }

    isFlush() {
        // all suits match is flush
        let suit = this.cards[0].suit;
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (card.suit != suit)
                return false;
        }
        return true;
    }

    isStraight(ranked) {
        // must have 5 different ranks
        if (!ranked[4])
            return false;
        // could be wheel if r0 is 'A' and r4 is '2'
        if (ranked[0][0].rank == 'A' && ranked[1][0].rank == '5' && ranked[4][0].rank == '2') {
            // hand is 'A' '5' '4' '3' '2'
            ranked.push(ranked.shift());
            // ace is now low
            return true;
        }
        // run of five in row is straight
        const r0 = this.ranks.indexOf(ranked[0][0].rank);
        const r4 = this.ranks.indexOf(ranked[4][0].rank);
        return (r0 - r4) == 4;
    }
}

program
  .arguments('<cardString>')
  .action((cardString) => {
    if(!cardString){
        console.error("Please pass in a card string e.g. 'AS, 10C, 10H, 3D, 3S'");
        return;
    }
    const deck = new PlayingCards(cardString);
    console.log(deck.bestPockerHand);
  })
  .parse(process.argv);
