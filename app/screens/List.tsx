import { View, Button, StyleSheet, TextInput, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import TodoStore, { Todo } from "../store/TodoStore"
import UIStore from "../store/UIStore"

import ListItem from "../components/ListItem"
import { auth } from "../../firebaseConfig"

interface ListProps {
  navigation: {
    navigate: (route: string) => void
  }
}

const List: React.FC<ListProps> = ({ navigation }) => {
  const [todo, setTodo] = useState("")
  useEffect(() => {
    TodoStore.fetchTodos()
  }, [])

  const handleSignOut = async () => {
    try {
      await UIStore.SignOut()
      navigation.navigate("Login")
    } catch (error) {
      console.error("Error signing out:", error)
      alert("Error. Please try again.")
    }
  }

  const addTodo = () => {
    TodoStore.addTodo(todo)
    setTodo("")
  }

  const renderTodo = ({ item }: { item: Todo }) => {
    const toggleTodo = () => {
      TodoStore.toggleTodo(item.id)
    }

    const deleteTodo = () => {
      TodoStore.deleteTodo(item.id)
    }

    const editTodo = () => {}
    return auth.currentUser ? (
      <ListItem
        todo={item}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    ) : null
  }
  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Add new todo"
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
          />
          <Button
            onPress={() => addTodo()}
            title="Add Todo"
            disabled={todo === ""}
          />
        </View>
        {TodoStore.todos.length > 0 && (
          <View>
            <FlatList
              data={TodoStore.todos}
              renderItem={renderTodo}
              keyExtractor={(todo: Todo) => todo.id}
            />
          </View>
        )}
      </View>
      <View style={styles.signOutButton}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  )
}

export default observer(List)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  context: { flex: 1 },
  form: {
    marginVertical: 20,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.2,
    padding: 10,
    borderColor: "blue",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 3,
  },
  todoText: {
    flex: 1,
    paddingLeft: 10,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  signOutButton: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginRight: 20,
    marginBottom: 40,
  },
})

