import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Clipboard from "@react-native-clipboard/clipboard";

const CopyableText = ({ text, textStyle, iconColor, iconSize = 18 }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (textToCopy: any) => {
    Clipboard.setString(textToCopy);
    setIsCopied(true);

    // Reset icon after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <TouchableOpacity
      onPress={() => copyToClipboard(text)}
      style={styles.container}
    >
      <MaterialIcons
        name={isCopied ? "check" : "content-copy"}
        size={iconSize}
        color={iconColor || "black"}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CopyableText;
