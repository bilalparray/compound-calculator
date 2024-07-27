import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface CardProps {
  interestAmount: string;
  principalAmount: string;
  totalAmount: Number;
}

const Card: React.FC<CardProps> = ({
  interestAmount,
  principalAmount,
  totalAmount,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Principal Amount : {principalAmount}</Text>
      <Text style={styles.cardText}>Interest Amount : {interestAmount}</Text>
      <Text style={styles.cardText}>
        Total Amount : {totalAmount.toString()}
      </Text>
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
    justifyContent: "center", // Center vertically
    alignItems: "flex-start",
    // textAlign: "center",
  },
  cardText: {
    fontSize: 20,
    color: "#333",
  },
});

export default Card;
