import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { AntDesign, Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons"
import { Todo } from "../store/TodoStore"
import { observer } from "mobx-react-lite"

interface ListItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: () => void
}

const ListItem: React.FC<ListItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [editable, setEditable] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity style={styles.todo} onPress={onToggle}>
        {todo.done && <AntDesign name="checkcircle" size={24} color="green" />}

        {!todo.done && <Entypo name="circle" size={24} color="black" />}
        <Text style={styles.todoText}>{todo.title}</Text>
      </TouchableOpacity>
      <FontAwesome6
        paddingRight={10}
        onPress={onEdit}
        name="pencil"
        size={24}
        color="black"
      />
      <Ionicons
        name="trash-bin-outline"
        size={24}
        color="red"
        onPress={onDelete}
      />
    </View>
  )
}

export default observer(ListItem)

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 3,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  todoText: {
    paddingLeft: 10,
  },
})

