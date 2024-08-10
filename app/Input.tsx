import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomInput = ({
  placeholder,
  error,
  icon,
  type = "text", // Default type is 'text'
  label,
  onChangeText,
  value,
  secureTextEntry,
  style,
  labelStyle,
  inputStyle,
  containerStyle,
}: any) => {
  const handleChangeText = (text: any) => {
    // Remove '-' and Tab characters
    text = text.replace(/[-\t]/g, "");

    // Format input based on type
    if (type === "percent") {
      text = text.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal point

      // Ensure only one decimal point is present
      const parts = text.split(".");
      if (parts.length > 2) {
        text = parts[0] + "." + parts.slice(1).join("");
      }

      text = text.slice(0, 5); // Limit to 3 digits plus 2 decimal points (e.g., 100.00)
      text = text ? `${text}%` : "";
    } else if (type === "number") {
      text = text.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal point

      // Ensure only one decimal point is present
      const parts = text.split(".");
      if (parts.length > 2) {
        text = parts[0] + "." + parts.slice(1).join("");
      }
    }

    onChangeText(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[styles.inputContainer, { borderColor: error ? "red" : "#ccc" }]}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={icon.color || "white"}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholder={error ? error : placeholder}
          placeholderTextColor={error ? "red" : "#aaa"}
          secureTextEntry={secureTextEntry}
          style={[styles.input, inputStyle]}
          onChangeText={handleChangeText}
          value={value}
          keyboardType={type === "number" ? "numeric" : "default"}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#000000",
    width: "100%",
    color: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "white",
    backgroundColor: "black",
  },
  icon: {
    marginRight: 10,
  },
});

export default CustomInput;
