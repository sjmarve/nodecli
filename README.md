# Best Poker Hand
Little command line tool built on nodejs to ascertain the best poker hand for a given string of cards

For example, given a string input of:   
`'AS, 10C, 10H, 3D, 3S'`   
(the cards above are ace of spades, 10 of clubs, 10 of hearts, 3 of diamonds and 3 of spades)  
Output would be: `'two pair'`

### Instructions for setup

clone repo and run `yarn install`

### Instructions for run

From the root of the project:   
```node index {POKER HAND}```

Examples:
```
node index 'AS, 10C, 10H, 3D, 3S'  
node index 'AS, KS, QS, JS, 10S'
node index 'KD, QD, 7S, 4S, 3H'
```

### ***Extras***
Testing is done with `jest`. The suite can be run using `yarn test`

