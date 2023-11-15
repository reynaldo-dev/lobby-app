import { Text, View, useBreakpointValue } from 'native-base';
import React from 'react';

interface LabelProps {
     value: string;
}

const LabelComponent = ({ value }: LabelProps) => {

     const topResponsive = useBreakpointValue({
          base: 32,
          sm: 32,
          md: 32,
          lg: 40,
     });

     return (
          <View
               position={"absolute"}
               left={55}
               alignItems={"flex-start"}
               width={200}
               top={-topResponsive}
          >
               <Text
                    fontSize={{
                         base: 'xs',
                         sm: 'sm',
                         md: 'md',
                         lg: 'lg',
                    }}
               >{value}</Text>
          </View>
     )
}
export default LabelComponent;
