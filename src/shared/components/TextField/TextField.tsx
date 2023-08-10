import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Box, FormControl, Input } from "native-base";
import { theme } from "../../../theme";

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
      <FormControl w="100%" maxW="300px">
        {formControlLabel ? (
          <FormControl.Label
            _text={{
              fontSize: "sm",
              color: colors.muted["400"],
            }}
          >
            {formControlLabel}
          </FormControl.Label>
        ) : null}

        <Input
          bgColor={colors.muted["200"]}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.muted["400"]}
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
    backgroundColor: "#fff",
  },
});
