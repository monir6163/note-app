import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Create from "./src/screens/create";

import FlashMessage from "react-native-flash-message";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import SignIn from "./src/screens/signIn";
import SignUp from "./src/screens/signUp";
const Stack = createNativeStackNavigator();
const auth = getAuth();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "white",
    },
};

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const authSubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return authSubscription;
    }, []);
    // Load fonts
    const [loaded] = useFonts({
        hindsiliguri: require("./assets/fonts/HindSiliguri-Regular.ttf"),
    });
    if (!loaded) {
        return null;
    }
    // Loading screen
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            options={{
                                headerShown: false,
                            }}
                        >
                            {(props) => <Home {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name="Create">
                            {(props) => <Create {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen name="Edit">
                            {(props) => <Edit {...props} user={user} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="SignIn"
                            component={SignIn}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="SingUp" component={SignUp} />
                    </>
                )}
            </Stack.Navigator>
            <FlashMessage position="center" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
