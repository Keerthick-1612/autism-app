import React, { useState } from "react";
import {
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const ButtonContent = () => (
    <View
      style={[
        styles.button,
        isPressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </View>
  );

  const handlePressIn = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        background={TouchableNativeFeedback.Ripple(
          "rgba(255,255,255,0.3)",
          false
        )}
      >
        {ButtonContent()}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={{ borderRadius: style.borderRadius || 8 }}
      activeOpacity={0.7}
    >
      {ButtonContent()}
    </TouchableOpacity>
  );
};

const DEFAULT_COLOR = "#38bdf8";
const DEFAULT_BORDER_COLOR = "#0ea5e9";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    height: 48,

    backgroundColor: DEFAULT_COLOR,
    borderColor: DEFAULT_BORDER_COLOR,

    borderWidth: 2,
    borderBottomWidth: 5,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Ensures ripple effect stays within borders
  },
  pressed: {
    borderBottomWidth: 2, // Reduce the border bottom width when pressed
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "DinRound",
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
});

export default Button;
