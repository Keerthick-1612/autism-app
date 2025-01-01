export const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export const images = [
  require('../assets/images/card1.png'),
  require('../assets/images/card2.png'),
  require('../assets/images/card3.png'),
  require('../assets/images/card4.png'),
  require('../assets/images/card5.png'),
  require('../assets/images/card1.png'),
  require('../assets/images/card2.png'),
  require('../assets/images/card3.png'),
  require('../assets/images/card4.png'),
  require('../assets/images/card5.png'),
  
];
