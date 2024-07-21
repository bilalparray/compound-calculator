import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface CardProps {
  result: string;
}

const Card: React.FC<CardProps> = ({ result }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{result || "No result available"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Card;
