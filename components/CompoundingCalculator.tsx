import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import CustomInput from "./Input";
import Dropdown from "./Dropdown";
import MyButton from "./Button";
import Card from "./Card";
import {
  calculateCompoundInterest,
  Frequency,
  TimePeriod,
} from "unit-conversion-kit";

const CompoundingCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState("");
  const [time, setTime] = useState("");
  const [percent, setPercent] = useState("");
  const [numberError, setNumberError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [percentError, setPercentError] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(
    Frequency.Annually
  );
  const [selectedTime, setSelectedTime] = useState(TimePeriod.Years);
  const [result, setResult] = useState("");

  const handlePrincipalAmount = (text: string) => {
    setPrincipalAmount(text);
    setNumberError("");
  };

  const handleTime = (text: string) => {
    setTime(text);
    setTimeError("");
  };

  const handlePercentChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, ""); // Remove any non-numeric characters except for "."
    let value = cleanedText;

    // Ensure only one decimal point is present
    if (value.includes(".")) {
      const parts = value.split(".");
      value = parts[0] + "." + parts.slice(1).join("");
    }

    const numericValue = parseFloat(value);

    // Ensure value is within 0-100 range
    if (numericValue > 100) {
      value = "100";
    }

    setPercent(value);
    setPercentError("");
  };

  const handleCompoundingFrequencyChange = (value: any) => {
    setSelectedFrequency(value);
  };

  const handleTimeChange = (value: TimePeriod) => {
    setSelectedTime(value);
  };

  const validateFields = () => {
    let valid = true;
    if (principalAmount === "" || isNaN(Number(principalAmount))) {
      setNumberError(
        "Principal amount is required and should be a valid number"
      );
      valid = false;
    }
    if (
      percent === "" ||
      isNaN(Number(percent)) ||
      Number(percent) < 0 ||
      Number(percent) > 100
    ) {
      setPercentError(
        "Rate of interest is required and should be a valid percent between 0 and 100"
      );
      valid = false;
    }
    if (time === "" || isNaN(Number(time))) {
      setTimeError("Time is required and should be a valid number");
      valid = false;
    }
    return valid;
  };

  const clearInputFields = () => {
    setPrincipalAmount("");
    setTime("");
    setPercent("");
    setNumberError("");
    setTimeError("");
    setPercentError("");
    setSelectedFrequency(Frequency.Annually);
    setSelectedTime(TimePeriod.Years);
    setResult(""); // Clear the result when inputs are cleared
  };

  const handleButtonClick = () => {
    if (validateFields()) {
      const numericPercent = parseFloat(percent);
      const dataFromCInpm = calculateCompoundInterest(
        Number(principalAmount),
        Number(time),
        numericPercent,
        selectedFrequency,
        selectedTime
      );
      setResult(`The calculated compound interest is ${dataFromCInpm}`);
    }
  };

  const compoundingFrequencyItems = [
    { label: "Annually", value: Frequency.Annually },
    { label: "Semi-Annually", value: Frequency.SemiAnnually },
    { label: "Quarterly", value: Frequency.Quarterly },
    { label: "Monthly", value: Frequency.Monthly },
    { label: "Weekly", value: Frequency.Weekly },
    { label: "Daily", value: Frequency.Daily },
  ];

  const timeItems = [
    { label: "Year", value: TimePeriod.Years },
    { label: "Semi-Annually", value: TimePeriod.SemiAnnually },
    { label: "Quarterly", value: TimePeriod.Quarters },
    { label: "Monthly", value: TimePeriod.Months },
    { label: "Weekly", value: TimePeriod.Weeks },
    { label: "Daily", value: TimePeriod.Days },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="black" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Compounding Calculator</Text>
        <CustomInput
          label="Enter Principal Amount"
          placeholder="Enter Principal Amount"
          type="number"
          icon="numbers"
          value={principalAmount}
          onChangeText={handlePrincipalAmount}
          error={numberError}
        />
        <CustomInput
          label="Enter Rate of Interest"
          placeholder="Enter Rate of Interest"
          type="percent"
          icon="percent"
          value={percent}
          onChangeText={handlePercentChange}
          error={percentError}
        />
        <Dropdown
          label="Choose Compounding Frequency"
          selectedValue={selectedFrequency}
          onValueChange={handleCompoundingFrequencyChange}
          items={compoundingFrequencyItems}
        />
        <CustomInput
          label="Enter Time"
          placeholder="Enter Time"
          type="number"
          icon="numbers"
          value={time}
          onChangeText={handleTime}
          error={timeError}
        />
        <Dropdown
          label="Choose Time Unit"
          selectedValue={selectedTime}
          onValueChange={handleTimeChange}
          items={timeItems}
        />
        <View style={styles.buttonContainer}>
          <MyButton onPress={handleButtonClick} text="Calculate" />
          <MyButton onPress={clearInputFields} text="Clear" />
        </View>
        <Card result={result} />
      </View>
    </SafeAreaView>
  );
};

export default CompoundingCalculator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 15,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    width: "100%",
  },
});
