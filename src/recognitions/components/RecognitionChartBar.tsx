import {
     Center,
     Spinner,
     View,
     useBreakpointValue,
     Box,
     Text,
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import useTransformedData from '../../hooks/useTransformedData';
import Layout from '../../shared/layout/Layout';

const { width, height } = Dimensions.get('window');

const RecognitionChartBar = () => {
     const { transformedData, noOfSections, maxValue } = useTransformedData();

     const stepValue = Math.max(maxValue / noOfSections, 1);

     const heightBar = useBreakpointValue({
          base: height / 1.5,
          sm: height / 1.5,
          md: height / 2.5,
     });

     const widthBar = useBreakpointValue({
          base: width / 1.2,
          sm: width / 1.2,
          md: width / 1.1,
     });

     const renderTooltip = (item, index) => {
          return (
               <View
                    style={{
                         position: 'absolute',
                         top: -20,
                         left: 4,
                         backgroundColor: 'white',
                         borderRadius: 5,
                         shadowColor: '#000',
                         transform: [{ rotate: '-90deg' }],
                    }}
               >
                    <Text>Total: {item.value}</Text>
               </View>
          );
     };

     if (transformedData.length === 0) {
          return (
               <Center flex={1}>
                    <Spinner />
               </Center>
          );
     }

     return (
          <Layout>
               <View
                    height={height}
                    _android={{ marginTop: 5 }}
                    marginX={{ md: 5 }}
               >
                    <BarChart
                         data={transformedData}
                         width={widthBar}
                         height={heightBar}
                         horizontal
                         maxValue={maxValue}
                         noOfSections={noOfSections}
                         stepValue={stepValue}
                         showScrollIndicator
                         isAnimated
                         barBorderTopRightRadius={5}
                         barBorderTopLeftRadius={5}
                         renderTooltip={renderTooltip}
                    />
               </View>
          </Layout>
     );
};

export default RecognitionChartBar;
