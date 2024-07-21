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
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    height: "auto",
    padding: 0,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 0,
  },
  picker: {
    // height: 50,
    width: "100%",
    color: "black",
  },
});

export default Dropdown;
