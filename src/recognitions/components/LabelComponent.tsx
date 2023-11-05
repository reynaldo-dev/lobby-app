import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

interface LabelProps {
     value: string;
}

const LabelComponent = ({ value }: LabelProps) => (
     <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{value}</Text>
     </View>
);

const styles = StyleSheet.create({
     labelContainer: {
          position: 'absolute',
          left: 55,
          alignItems: 'flex-start',
          width: 200,
          top: -30,
     },
     labelText: {
          fontSize: 12,
     },
});

export default LabelComponent;
