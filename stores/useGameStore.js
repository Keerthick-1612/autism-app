import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGameStore = create((set) => ({
  tries: 0,
  score: 0,

  incrementTries: () =>
    set((state) => {
      const newTries = state.tries + 1;
      AsyncStorage.setItem('tries', newTries.toString());
      return { tries: newTries };
    }),

  incrementScore: () =>
    set((state) => {
      const newScore = state.score + 100;
      AsyncStorage.setItem('score', newScore.toString());
      return { score: newScore };
    }),

  resetGameState: async () => {
    await AsyncStorage.multiRemove(['tries', 'score']);
    set({ tries: 0, score: 0 });
  },

  loadGameState: async () => {
    const savedTries = await AsyncStorage.getItem('tries');
    const savedScore = await AsyncStorage.getItem('score');
    set({
      tries: savedTries ? parseInt(savedTries, 10) : 0,
      score: savedScore ? parseInt(savedScore, 10) : 0,
    });
  },
}));

export default useGameStore;
