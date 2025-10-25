// Letter items with optional image mapping. Add more images to assets/images and require them here.
export const LetterItems = [
  { letter: 'A', image: require('../assets/images/apple.png') },
  { letter: 'B', image: require('../assets/images/basketball.png') },
  { letter: 'C' },
  { letter: 'D' },
  { letter: 'E' },
  { letter: 'F' },
  { letter: 'G' },
  { letter: 'H' },
  { letter: 'I' },
  { letter: 'J' },
  { letter: 'K' },
  { letter: 'L' },
  { letter: 'M' },
  { letter: 'N' },
  { letter: 'O' },
  { letter: 'P' },
  { letter: 'Q' },
  { letter: 'R' },
  { letter: 'S' },
  { letter: 'T' },
  { letter: 'U' },
  { letter: 'V' },
  { letter: 'W' },
  { letter: 'X' },
  { letter: 'Y' },
  { letter: 'Z' }
]

// convenience export of just letters (keeps compatibility)
export const Letters = LetterItems.map(i => i.letter)