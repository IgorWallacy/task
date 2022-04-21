import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
  },
});

export default function TaskList({ item, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => deleteItem(item.key)}
      >
        <Feather name="trash" color="#fff" size={20} />
      </TouchableOpacity>

      <View>
        <TouchableWithoutFeedback
        onPress={ () => editItem(item)}
        >
          <Text style={styles.text}>{item.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
