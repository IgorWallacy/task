import { useState, useEffect, useRef } from "react";

import Login from "./src/components/Login";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Keyboard,
} from "react-native";

import firebase from "./src/services/firebaseConnection";

import TaskList from "./src/components/TaskList";

export default function App() {
  const [user, setUser] = useState();
  const [task, setTask] = useState();

  const [tasks, setTasks] = useState([]);

  const [key, setKey] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .once("value", (s) => {
          setTasks([]);
          s.forEach((e) => {
            let data = {
              key: e.key,
              nome: e.val().nome,
            };

            setTasks((old) => [...old, data]);
          });
        });
    } else {
      getUser();
    }
  }, [user]);

  function getUser() {
    if (!user) {
      return;
    }
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findtasks = tasks.filter((item) => item.key !== key);
        setTasks(findtasks);
      });
  }

  function handleEdit(item) {
    //   alert(`Recebeu o item ` + item.nome);
    setKey(item.key);
    setTask(item.nome);
    inputRef.current.focus();
  }

  function handleAdd() {
    if (!task) {
      alert("Informe a tarefa para adicionar");
      return;
    }

    if (key) {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: task,
        })
        .then(() => {
          alert("Tarefa atualizada com sucesso!");
          const taskIndex = tasks.findIndex( item => item.key === key)
          let taskClone = tasks
          taskClone[taskIndex].nome = task
          setTasks([...taskClone])
        });

      Keyboard.dismiss();
      setTask("");
      setKey("");

      return;
    }

    let tarefas = firebase.database().ref("tarefas").child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: task,
      })
      .then(() => {
        alert(`Tarefa  adicionado com sucesso!`);
        const data = {
          key: chave,
          nome: task,
        };

        setTasks((oldTask) => [...oldTask, data]);
        Keyboard.dismiss();
        setTask("");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containertask}>
        <TextInput
          placeholder=" O que vc vai fazer hoje ?"
          style={styles.input}
          value={task}
          ref={inputRef}
          onChangeText={(e) => setTask(e)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            editItem={handleEdit}
            deleteItem={handleDelete}
            item={item}
          />
        )}
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
