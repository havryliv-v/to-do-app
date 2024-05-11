import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { makeAutoObservable } from "mobx"
import { auth } from "../../firebaseConfig"

class UIStore {
  constructor() {
    makeAutoObservable(this)
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Signed in successfully!")
    } catch (error) {
      if (error instanceof Error) {
        alert("Error signing in. Please check your credentials.")
        console.error("Error signing in:", error.message)
      } else {
        alert("Error signing in. Please check your credentials.")
        console.error("An unexpected error occurred:", error)
      }
    }
  }
  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert("Account created successfully!")
    } catch (error) {
      if (error instanceof Error) {
        alert("Error creating account. Please try again.")
        console.error("Error creating account:", error.message)
      } else {
        alert("Error creating account. Please try again.")
        console.error("An unexpected error occurred:", error)
      }
    }
  }

  async SignOut() {
    try {
      await auth.signOut()
    } catch (error) {
      alert("Error. Please try again.")
      console.error("Error signing out, server problems:", error)
    }
  }
}
export default new UIStore()

