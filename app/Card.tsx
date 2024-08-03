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
  // Check if interestAmount is valid
  const showCard = interestAmount !== "" && Number(interestAmount) !== 0;

  return showCard ? (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        Principal Amount : {Number(principalAmount).toFixed(2)}
      </Text>
      <Text style={styles.cardText}>
        Interest Amount : {Number(interestAmount).toFixed(2)}
      </Text>
      <Text style={styles.cardText}>
        Total Amount : {totalAmount.toFixed(2)}
      </Text>
    </View>
  ) : null; // Render null if interestAmount is empty or zero
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
  },
  cardText: {
    fontSize: 20,
    color: "#333",
  },
});

export default Card;
