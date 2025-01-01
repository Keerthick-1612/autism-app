import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import GameGrid from './components/GameGrid';

export default function App() {
  return (

    <SafeAreaView style={styles.outerContainer}>
      <GameGrid />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "plum",
    // Ensures the entire screen background is filled
  },

});
