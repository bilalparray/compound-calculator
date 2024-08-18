import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Button,
} from "react-native";
import CustomInput from "./Input";
import Dropdown from "./Dropdown";
import MyButton from "./Button";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
      handleOpenPress();
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
    toggleModal();
    handleClosePress();
    BackHandler.exitApp();
  };
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.titleContainer, { height: windowHeight }]}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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

            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </ScrollView>
          <StatusBar style="auto" />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
          backgroundStyle={{ backgroundColor: "#2c1387" }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <BottomSheetScrollView>
              <Text style={styles.resultTitle}>Calculation Results</Text>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Principal Amount:</Text>
                <Text style={styles.resultValue}>{principalAmount}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Interest Amount:</Text>
                <Text style={styles.resultValue}>{result}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Total Amount:</Text>
                <Text style={styles.resultValue}>
                  {Number(principalAmount) + Number(result)}
                </Text>
              </View>
              <MyButton
                text="Close"
                backGround="green"
                color="white"
                onPress={handleClosePress}
              />
            </BottomSheetScrollView>
            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
        </BottomSheet>

        {/* Custom Modal for Exit Confirmation */}
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
            <BannerAd
              ref={bannerRef}
              unitId={environment.adUnitId}
              size={BannerAdSize.BANNER}
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
      </SafeAreaView>
    </GestureHandlerRootView>
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
    backgroundColor: "#1d0f4e",
    minHeight: 100,
  },

  title: {
    paddingVertical: 10,
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

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#2c1387",
  },
  resultTitle: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 0,
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultLabel: {
    fontSize: 18,
    color: "#666",
    flex: 3,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 2,
    flexWrap: "wrap",
  },
});
