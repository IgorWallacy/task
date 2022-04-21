import React, { useState } from "react";
import firebase from "../../services/firebaseConnection";

import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login( { changeStatus }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: "#F2f6fc",
      paddingHorizontal: 10,
      padding: 10,
    },
    input: {
      marginBottom: 10,
      backgroundColor: "#FFF",
      borderRadius: 4,
      height: 75,
      padding: 10,
      borderWidth: 1,
      borderColor: "#141414",
      fontSize: 20,
    },
    handleLogin: {
      alignItems: "center",
      justifyContent: "center",

      height: 45,
      margin: 10,
      padding: 10,
      borderRadius: 40,
    },
    loginText: {
      color: "#FFF",
      fontSize: 17,
    },
    criarContaText: {
      textAlign: "center",
      fontSize: 15,
    },
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [type, setType] = useState("login");

  function handleLogin() {
    switch (type) {
      case "login":
      
        const user = firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            alert(response.user.email + ' logado com sucesso !');
            changeStatus(response.user.uid)
          })
          .catch((error) => {
            alert(error);
          });
        break;
      case "cadastrar":
       
        const user2 = firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            alert(response.user.email + ' cadastrado com sucesso !');
            changeStatus(response.user.uid)
            
          })
          .catch((error) => {
            alert(error);
            
          });
        break;

      default:
        "login";
        break;
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Seu e-mail"
        value={email}
        onChangeText={(e) => setEmail(e)}
        style={styles.input}
      />

      <TextInput
        placeholder="******"
        value={password}
        onChangeText={(e) => setPassword(e)}
        style={styles.input}
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === "login" ? "blue" : "black" },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === "login" ? "cadastrar" : "login"))
        }
      >
        <Text style={styles.criarContaText}>
          {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
