// pocketbase.js

import React, { createContext, useContext, useState, useEffect } from "react";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PocketBaseContext = createContext();

export const usePocketBase = () => useContext(PocketBaseContext);

export const PocketBaseProvider = ({ children }) => {
  const [pb, setPb] = useState();

  useEffect(() => {
    const initializePocketBase = async () => {
      // This is where our auth session will be stored. It's PocketBase magic.
      const store = new AsyncAuthStore({
        save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
        initial: await AsyncStorage.getItem("pb_auth"),
        clear: async () => AsyncStorage.removeItem("pb_auth"),
      });
      const pbInstance = new PocketBase(
        process.env.EXPO_PUBLIC_POCKETBASE_URL,
        store
      );
      setPb(pbInstance);
    };

    initializePocketBase();
  }, []);

  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};
