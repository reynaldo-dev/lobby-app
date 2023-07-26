import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "native-base";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../../shared/layout/Layout";

export default function Register() {
  const { colors } = theme;
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Layout backgroundColor={colors.background}>
      <View style={styles.container}>
        <Text style={{ ...styles.title, color: colors.primary }}>
          Registrate
        </Text>
        <View style={styles.form}>
          <TextInput
            style={{
              ...styles.input,
              color: colors.text,
              backgroundColor: colors.white,
            }}
            placeholder="Email"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={{
              ...styles.input,
              color: colors.text,
              backgroundColor: colors.white,
            }}
            placeholder="Password"
            placeholderTextColor={colors.primary}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={{ ...styles.loginButton, backgroundColor: colors.primary }}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Link
          _text={{ color: colors.primary }}
          mt={5}
          onPress={() => navigation.navigate("Login" as never)}
        >
          Ya tienes una cuenta?
        </Link>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
  },
  form: {
    width: "80%",
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
