import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import React from "react";

interface ValidatedInputTextProps {
  isInvalid: boolean;
  formControlLabel: string;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: any;
  value: string;
  bgColor?: string;

  errors: any;
}

export default function ValidatedInputText({
  isInvalid,
  formControlLabel,
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  errors,
  bgColor,
}: ValidatedInputTextProps) {
  return (
    <Box alignItems="center">
      <FormControl
        isInvalid={isInvalid}
        w="100%"
        maxW="300px"
        borderRadius={10}
      >
        {/* <FormControl.Label
          _text={{
            fontSize: "sm",

            color: theme.colors.muted["400"],
          }}
        >
          {formControlLabel}
        </FormControl.Label> */}
        <Input
          bgColor={bgColor}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize="none"
          borderColor="transparent"
        />
        {errors && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,

    backgroundColor: "#fff",
    width: "100%",
  },
});
