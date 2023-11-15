import {
     View,
     useBreakpointValue
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import useTransformedData from '../../hooks/useTransformedData';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import Layout from '../../shared/layout/Layout';
//TODO: hacer que se vea más grande en pantallas grandes, y además quitar la escala de abajo y dejar el puntaje en la barra
const { width, height } = Dimensions.get('window');

const RecognitionChartBar = () => {
     const { transformedData, noOfSections, maxValue } = useTransformedData();

     const stepValue = Math.max(maxValue / noOfSections, 1);

     const heightBar = useBreakpointValue({
          base: height / 1.5,
          sm: height / 1.6,
          md: height / 2.5,
          lg: height / 2,
     });

     const widthBar = useBreakpointValue({
          base: width / 1.2,
          sm: width / 1.6,
          md: width / 1.1,
          lg: width / 1.2,
     });

     if (transformedData.length === 0) {
          return (
               <CustomSpinner />
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
                         spacing={30}
                    />
               </View>
          </Layout>
     );
};

export default RecognitionChartBar;
