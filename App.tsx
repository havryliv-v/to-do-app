import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import "react-native-reanimated"

import List from "./app/screens/List"
import Login from "./app/screens/Login"
import { useEffect, useState } from "react"
import { auth } from "./firebaseConfig"
import { User } from "firebase/auth"

const Stack = createNativeStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      if (initializing) {
        setInitializing(false)
      }
    })

    return unsubscribe
  }, [initializing])

  if (initializing) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="My todos" component={List} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

