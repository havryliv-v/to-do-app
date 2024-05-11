import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { makeAutoObservable } from "mobx"
import { FIRESTORE_DB, auth } from "../../firebaseConfig"
import { User } from "firebase/auth"

export interface Todo {
  title: string
  done: boolean
  id: string
}

class TodoStore {
  todos: Todo[] = []
  todo: string = ""

  constructor() {
    makeAutoObservable(this)
    this.fetchTodos()
  }

  fetchTodos = async () => {
    const user: User | null = auth.currentUser

    if (user) {
      const todoRef = collection(FIRESTORE_DB, `${user.email} todos`)
      const subscribe = onSnapshot(todoRef, {
        next: (snapshot) => {
          console.log("updated")
          const todos: Todo[] = []
          snapshot.docs.forEach((doc) => {
            todos.push({
              id: doc.id,
              ...doc.data(),
            } as Todo)
          })
          this.setTodos(todos)
        },
      })
      return () => subscribe()
    }
  }

  async addTodo(todo: string) {
    console.log("test")
    const user: User | null = auth.currentUser
    try {
      console.log("test2", user?.email)

      if (user) {
        console.log("test3")

        const docRef: DocumentReference<DocumentData> = await addDoc(
          collection(FIRESTORE_DB, `${user.email} todos`),
          {
            title: todo,
            done: false,
          }
        )
        console.log("Todo added with ID: ", docRef.id, `${user.email}`)
      }
    } catch (error) {
      console.error("Error adding todo: ", error)
    }
  }

  async toggleTodo(id: string) {
    const user: User | null = auth.currentUser

    try {
      if (user) {
        const todoRef: DocumentReference<DocumentData> = doc(
          FIRESTORE_DB,
          `${user.email} todos/${id}`
        )
        const todoSnapshot = await getDoc(todoRef)
        const todoData = todoSnapshot.data()
        if (todoData) {
          await updateDoc(todoRef, { done: !todoData.done })
          console.log("Todo toggled successfully")
        } else {
          console.error("Todo not found")
        }
      }
    } catch (error) {
      console.error("Error toggling todo: ", error)
    }
  }

  async editTodo() {}

  async deleteTodo(id: string) {
    const user: User | null = auth.currentUser

    try {
      if (user) {
        const todoRef: DocumentReference<DocumentData> = doc(
          FIRESTORE_DB,
          `${user.email} todos/${id}`
        )
        await deleteDoc(todoRef)
        console.log("Todo deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting todo: ", error)
    }
  }

  setTodos(todos: Todo[]) {
    this.todos = todos
  }

  setTodo(todo: string) {
    this.todo = todo
  }
}

export default new TodoStore()

