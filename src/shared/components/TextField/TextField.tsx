import { Box, FormControl, Input } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface ValidatedInputTextProps {
     isInvalid: boolean;
     formControlLabel?: string;
     placeholder: string;
     placeholderTextColor: string;
     onChangeText: any;
     value: string;
     bgColor?: string;

     errors: any;
}

export default function TextField({
     isInvalid,
     formControlLabel,
     placeholder,
     placeholderTextColor,
     onChangeText,
     value,
     errors,
     bgColor,
}: ValidatedInputTextProps) {
     const { colors } = theme;
     return (
          <Box alignItems="center" mb={10} mt={5}>
               <FormControl w={['90%', '80%']}>
                    {formControlLabel ? (
                         <FormControl.Label
                              _text={{
                                   fontSize: 'sm',
                              }}
                         >
                              {formControlLabel}
                         </FormControl.Label>
                    ) : null}

                    <Input
                         height={[44, 60]}
                         style={styles.input}
                         placeholder="Password"
                         onChangeText={onChangeText}
                         value={value}
                         autoCapitalize="none"
                         type="password"
                         borderColor="transparent"
                    />
               </FormControl>
          </Box>
     );
}

const styles = StyleSheet.create({
     input: {
          fontSize: 16,
          backgroundColor: '#fff',
     },
});
