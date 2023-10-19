import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

interface ValidatedInputTextProps {
  isInvalid: boolean;
  formControlLabel?: string;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: any;
  value: string;
  bgColor?: string;
  type?: "text" | "password" | undefined;
  errors: any;
  onBlur?: (e: any) => void;
  keyboardType?:
    | "numeric"
    | "phone-pad"
    | "default"
    | "email-address"
    | "number-pad"
    | "decimal-pad"
    | undefined;
}

const ValidatedInputText = ({
  isInvalid,
  formControlLabel,
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  errors,
  bgColor,
  type = "text",
  onBlur,
  keyboardType,
}: ValidatedInputTextProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Box alignItems="center" w="full">
      <FormControl isInvalid={isInvalid} borderRadius={10} w={["90%", "80%"]}>
        <FormControl.Label>{formControlLabel}</FormControl.Label>
        <Input
          height={[44, 60]}
          onBlur={onBlur}
          autoCorrect={true}
          bgColor={bgColor}
          style={styles.input}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize="none"
          borderColor="transparent"
          type={type === "password" && !showPassword ? "password" : "text"}
          InputRightElement={
            type === "password" ? (
              <Button onPress={togglePasswordVisibility} variant="unstyled">
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </Button>
            ) : undefined
          }
        />
        {errors && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
});

export default React.memo(ValidatedInputText);
