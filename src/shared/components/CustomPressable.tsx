import { Box, Pressable } from 'native-base';
import React from 'react';

type DimensionProp = number | string | (number | string)[];

type Props = {
  children: React.ReactElement;
  widthCard: DimensionProp;
  heightCard: DimensionProp;
  onPress: () => void;
};

const CustomPressable = ({ children, widthCard, heightCard, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
    >
      {({ isPressed }) => {
        return (
          <Box
            style={{
              marginRight: 10,
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            width={widthCard}
            height={heightCard}
          >
            {children}
          </Box>
        );
      }}
    </Pressable>
  );
};

export default CustomPressable;