import React from "react";
import { Octicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Use this for icon rendering
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
    // Format input based on type
    if (type === "percent") {
      text = text.replace(/[^0-9]/g, ""); // Allow only numbers
      text = text.slice(0, 3); // Limit to 3 digits (0-100%)
      text = text ? `${text}%` : "";
    } else if (type === "number") {
      text = text.replace(/[^0-9]/g, ""); // Allow only numbers
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
            color={icon.color || "#000"}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[styles.input, inputStyle]}
          onChangeText={handleChangeText}
          value={value}
          keyboardType={type === "number" ? "numeric" : "default"}
          autoCapitalize="none"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%", // Ensure the container takes full width
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
    paddingVertical: 5,
    backgroundColor: "#fff",
    width: "100%", // Ensure the input container takes full width
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  error: {
    marginTop: 5,
    color: "red",
    fontSize: 14,
  },
});

export default CustomInput;
