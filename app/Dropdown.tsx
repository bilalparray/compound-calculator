import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Frequency } from "unit-conversion-kit";

interface DropdownProps {
  selectedValue: any;
  onValueChange: (value: any) => void;
  items: { label: string; value: string }[]; // Define the type for the items prop
  label: string; // Add a label prop for the dropdown
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValue,
  onValueChange,
  items,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={onValueChange}
          dropdownIconColor="white"
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    width: "100%",
    alignSelf: "center",
    height: "auto",
    padding: 0,
    backgroundColor: "#1d0f4e",
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    backgroundColor: "black",
    padding: 0,
    color: "white",
  },
  picker: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
  },
});

export default Dropdown;
