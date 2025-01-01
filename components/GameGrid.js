import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import useGameStore from '../stores/useGameStore'; // Using Zustand for game state
import { shuffleArray, images } from '../utils/gameUtils'; // Utility for shuffling cards

export default function GameGrid() {
  const [cards, setCards] = useState(shuffleArray(images));
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const { tries, score, incrementTries, incrementScore, resetGameState, loadGameState } =
    useGameStore();

  useEffect(() => {
    // Load game state when the component mounts
    loadGameState();
  }, []);

  useEffect(() => {
    // Match logic: Check after 2 cards are revealed
    if (revealedCards.length === 2) {
      const [firstIndex, secondIndex] = revealedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        incrementScore(); // Increment the score for a match
      }
      setTimeout(() => setRevealedCards([]), 1000);
    }
  }, [revealedCards]);

  const handleCardPress = (index) => {
    if (
      revealedCards.length < 2 &&
      !revealedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setRevealedCards([...revealedCards, index]);
      incrementTries();
    }
  };

  const handleRestart = async () => {
    setCards(shuffleArray(images));
    setRevealedCards([]);
    setMatchedCards([]);
    await resetGameState(); // Reset tries and score
  };

  useEffect(() => {
    // Check for game completion
    if (matchedCards.length === cards.length) {
      Alert.alert('Congratulations!', `You won the game with a score of ${score} in ${tries} tries!`, [
        { text: 'Restart', onPress: handleRestart },
      ]);
    }
  }, [matchedCards]);

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Tries: {tries}</Text>
        <Text style={styles.statsText}>Score: {score}</Text>
      </View>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              revealedCards.includes(index) || matchedCards.includes(index)
                ? styles.revealedCard
                : styles.hiddenCard,
            ]}
            onPress={() => handleCardPress(index)}
          >
            {revealedCards.includes(index) || matchedCards.includes(index) ? (
              <Image source={card} style={styles.cardImage} />
            ) : (
              <Text style={styles.cardText}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E55870',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E55870',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    width: '40%',
    height: 125,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  hiddenCard: {
    backgroundColor: 'white',
  },
  revealedCard: {
    backgroundColor: 'yellow',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
});
