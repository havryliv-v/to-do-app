import { View, TextInput, Button, StyleSheet } from "react-native"
import React, { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import UIStore from "../store/UIStore"
import { observer } from "mobx-react-lite"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()

  const handleSignIn = async () => {
    try {
      UIStore.signIn(email, password)
      navigation.navigate("My todos" as never)
    } catch (error) {
      console.error("An unexpected error occurred:", error)
    }
  }
  const handleSignUp = async () => {
    try {
      await UIStore.signUp(email, password)
      navigation.navigate("My todos" as never)
    } catch (error) {
      console.error("An unexpected error occurred:", error)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        textContentType="password"
      />
      <Button onPress={handleSignUp} title="Create account" />
      <Button onPress={handleSignIn} title="Sign In" />
    </View>
  )
}

export default observer(Login)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.2,
    padding: 10,
    borderColor: "blue",
    marginVertical: 5,
  },
})

