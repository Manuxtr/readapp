// Letter items with optional image mapping. Add more images to assets/images and require them here.
export const LetterItems = [
  { letter: 'A', image: require('../assets/images/apple.png') },
  { letter: 'B', image: require('../assets/images/basketball.png') },
  { letter: 'C', image: require('../assets/images/cat.png') },
  { letter: 'D', image: require('../assets/images/dog.png')},
  { letter: 'E', image: require('../assets/images/elephant.png')},
  { letter: 'F',image: require('../assets/images/fish.png')},
  { letter: 'G' ,image: require('../assets/images/goat.png')},
  { letter: 'H' ,image: require('../assets/images/house.png') },
  { letter: 'I',image: require('../assets/images/ink-bottle.png') },
  { letter: 'J' ,image: require('../assets/images/lemon-juice.png')},
  { letter: 'K',image: require('../assets/images/kettle.png') },
  { letter: 'L',image: require('../assets/images/lion.png') },
  { letter: 'M' ,image: require('../assets/images/monkey.png')},
  { letter: 'N' ,image: require('../assets/images/nail.png')},
  { letter: 'O' ,image: require('../assets/images/orange.png') },
  { letter: 'P' ,image: require('../assets/images/pencil.png')},
  { letter: 'Q' ,image: require('../assets/images/girl.png')},
  { letter: 'R' ,image: require('../assets/images/rat.png')},
  { letter: 'S',image: require('../assets/images/snake.png') },
  { letter: 'T',image: require('../assets/images/table.png') },
  { letter: 'U' ,image: require('../assets/images/umbrella.png')},
  { letter: 'V' ,image: require('../assets/images/violin.png')},
  { letter: 'W',image: require('../assets/images/window.png') },
  { letter: 'X',image: require('../assets/images/xylophone.png') },
  { letter: 'Y' ,image: require('../assets/images/sailing-boat.png')},
  { letter: 'Z' ,image: require('../assets/images/zebra.png')}
]

// convenience export of just letters (keeps compatibility)
export const Letters = LetterItems.map(i => i.letter)