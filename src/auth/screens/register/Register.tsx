import React from "react";
import { Input, Button, Text, Box, Center, Image, Link } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const { navigate } = useNavigation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Box
      flex={1}
      justifyContent="space-around"
      alignItems="center"
      padding={20}
      backgroundColor="primary"
    >
      <Center>
        <Image
          source={require("../../../../assets/icon.png")}
          alt="Logo"
          width={150}
          height={150}
        />
      </Center>
      <Center>
        <Text color="white" fontSize={20} fontWeight="bold" marginBottom={5}>
          Bienvenido, por favor registrese
        </Text>
      </Center>
      <Center>
        <Input
          borderColor="white"
          placeholder="Nombre de usuario"
          placeholderTextColor="white"
          onChangeText={(text) => setUsername(text)}
          value={username}
          marginBottom={5}
        />
        <Input
          borderColor="white"
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(text) => setUsername(text)}
          value={username}
          marginBottom={5}
        />

        <Input
          borderColor="white"
          placeholder="Contraseña"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </Center>

      <Button
        onPress={handleLogin}
        marginTop={5}
        backgroundColor="white"
        width="100%"
        _dark={{ backgroundColor: "white" }}
      >
        <Text color="primary" fontWeight="bold">
          Registrarse
        </Text>
      </Button>

      <Link
        marginTop={5}
        alignSelf="flex-start"
        _text={{ color: "white", fontSize: "sm", fontWeight: "bold" }}
        onPress={() => navigate("Login" as never)}
      >
        Ya tienes una cuenta? Inicia sesión
      </Link>
    </Box>
  );
}
