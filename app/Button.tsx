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
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    width: "auto",
    minWidth: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
