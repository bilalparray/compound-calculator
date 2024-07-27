import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface MyButtonProps {
  onPress: () => void;
  text: string;
}

const MyButton: React.FC<MyButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
