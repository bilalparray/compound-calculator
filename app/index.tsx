import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import CompoundingCalculator from "@/components/CompoundingCalculator";

const index = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <CompoundingCalculator />
      </SafeAreaView>
    </ScrollView>
  );
};

export default index;
