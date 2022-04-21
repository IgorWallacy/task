import { useState } from "react";

import Login from "./src/components/Login";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";

import TaskList from "./src/components/TaskList";

export default function App() {
  const [user, setUser] = useState();
  const [task, setTask] = useState();

  let tasks = [
    {
      key: "1",
      nome: "Comprar coca cola",
    },
    {
      key: "2",
      nome: "Estudar java",
    },
  ];

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  function handleDelete(key) {
    alert(key);
  }

  function handleEdit( item ) {
    alert (`Recebeu o item ` + item.nome)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containertask}>
        <TextInput
          placeholder=" O que vai fazer hoje ?"
          style={styles.input}
          value={task}
          onChangeText={(e) => setTask(e)}
        />

        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <TaskList editItem={handleEdit}  deleteItem={handleDelete} item={item} />}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 25,
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F2f6fc",
  },
  containertask: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 45,
  },
  buttonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
