import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface MyButtonProps {
  onPress: () => void;
  text: string;
  backGround: string;
  color: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  text,
  backGround,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backGround }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    width: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
