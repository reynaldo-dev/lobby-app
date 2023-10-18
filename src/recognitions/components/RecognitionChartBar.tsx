import React from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Center, Spinner, Text, View } from "native-base";
import Layout from "../../shared/layout/Layout";
import useTransformedData from "../../hooks/useTransformedData";
import { theme } from "../../theme";

const { width } = Dimensions.get("window");

const RecognitionChartBar = () => {
  const { transformedData, noOfSections, maxValue } = useTransformedData();

  const stepValue = Math.max(maxValue / noOfSections, 1);

  if (transformedData.length === 0) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Layout showCredits={false}>
      <View mt={5}>
        <BarChart
          data={transformedData}
          width={width}
          horizontal
          maxValue={maxValue}
          noOfSections={noOfSections}
          stepValue={stepValue}
          isAnimated
          disableScroll
          barBorderTopRightRadius={5}
          barBorderTopLeftRadius={5}
        />
      </View>
    </Layout>
  );
};

export default RecognitionChartBar;
