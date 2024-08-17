import React, { useRef, useState, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
} from "react-native";
import CustomInput from "./Input";
import Dropdown from "./Dropdown";
import MyButton from "./Button";
import Card from "./Card";
import {
  calculateCompoundInterest,
  Frequency,
  TimePeriod,
} from "unit-conversion-kit";
import {
  BannerAd,
  BannerAdSize,
  useForeground,
} from "react-native-google-mobile-ads";
import Modal from "react-native-modal";
import { environment } from "@/environment";
import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CompoundingCalculator = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const bannerRef = useRef<BannerAd>(null);
  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

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

  useEffect(() => {
    // Load the banner ad when the component mounts
    if (bannerRef.current) {
      bannerRef.current.load();
    }

    const backAction = () => {
      setModalVisible(true);
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handlePrincipalAmount = (text: string) => {
    setPrincipalAmount(text);
    setNumberError("");
    setResult("");
  };

  const handleTime = (text: string) => {
    setTime(text);
    setTimeError("");
    setResult("");
  };

  const handlePercentChange = (text: string) => {
    let cleanedText = text.replace(/[^0-9.]/g, "");

    const parts = cleanedText.split(".");
    if (parts.length > 2) {
      cleanedText = parts[0] + "." + parts.slice(1).join("");
    }

    let numericValue = parseFloat(cleanedText);
    if (!isNaN(numericValue) && numericValue > 100) {
      cleanedText = "100";
    }

    setPercent(cleanedText);
    setPercentError("");
    setResult("");
  };

  const handleCompoundingFrequencyChange = (value: any) => {
    setSelectedFrequency(value);
    setResult("");
  };

  const handleTimeChange = (value: TimePeriod) => {
    setSelectedTime(value);
    setResult("");
  };

  const validateFields = () => {
    let valid = true;
    if (principalAmount === "" || isNaN(Number(principalAmount))) {
      setNumberError("Please Enter a Valid Amount!");
      valid = false;
    }
    if (
      percent === "" ||
      isNaN(Number(percent)) ||
      Number(percent) < 0 ||
      Number(percent) > 100
    ) {
      setPercentError("Please Enter a Valid Percentage!");
      valid = false;
    }
    if (time === "" || isNaN(Number(time))) {
      setTimeError("Please Enter a Valid Time!");
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
    setResult("");
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
      setResult(dataFromCInpm.toFixed(3));
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
    { label: "Semi-Annual", value: TimePeriod.SemiAnnually },
    { label: "Quarters", value: TimePeriod.Quarters },
    { label: "Months", value: TimePeriod.Months },
    { label: "Weeks", value: TimePeriod.Weeks },
    { label: "Days", value: TimePeriod.Days },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const exitApp = () => {
    clearInputFields();
    BackHandler.exitApp();
    toggleModal();
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.titleContainer, { height: windowHeight }]}>
            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <Text style={styles.title}>Compounding Calculator</Text>
            <CustomInput
              label="Enter Principal Amount"
              placeholder="Please Enter Principal Amount here."
              type="number"
              icon="numbers"
              value={principalAmount}
              onChangeText={handlePrincipalAmount}
              error={numberError}
            />
            <CustomInput
              label="Enter Rate of Interest"
              placeholder="Please Enter Rate of Interest here."
              type="number"
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
              placeholder="Please Enter Time Here"
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
              <MyButton
                onPress={clearInputFields}
                text="Clear"
                backGround="blue"
                color="white"
              />
              <MyButton
                onPress={handleButtonClick}
                text="Calculate"
                backGround="green"
                color="white"
              />
            </View>
            {/* Conditional rendering of Card */}
            {result !== "" && (
              <Card
                totalAmount={Number(principalAmount) + Number(result)}
                principalAmount={principalAmount}
                interestAmount={result}
              />
            )}

            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
      </ScrollView>

      {/* Custom Modal for Exit Confirmation */}
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <BannerAd
            ref={bannerRef}
            unitId={environment.adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
          <Text style={styles.modalText}>Are you sure you want to exit?</Text>
          <View style={styles.modalButtons}>
            <MyButton
              onPress={toggleModal}
              text="Cancel"
              backGround="green"
              color="white"
            />
            <MyButton
              onPress={exitApp}
              text="OK"
              backGround="red"
              color="white"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CompoundingCalculator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    minHeight: 100,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    width: "90%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: windowWidth - 40,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalAd: {
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
