import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { showMessage } from "react-native-flash-message";
import { auth } from "../../config";
import Button from "../components/button";
import Input from "../components/input";

export default function SignIn({ navigation }) {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const SignIn = () => {
        if (!email || !password) {
            showMessage({
                message: "Please fill all the fields",
                type: "default",
                backgroundColor: "#ff9800",
                color: "#fff",
                animated: true,
                animationDuration: 500,
                icon: "danger",
            });
            return;
        }
        setIsLoading(true); // Start loading
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;

                showMessage({
                    message: "Signed In Successfully",
                    type: "default",
                    backgroundColor: "#00BFA6",
                    color: "#fff",
                    animated: true,
                    animationDuration: 500,
                    icon: "success",
                });
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                showMessage({
                    message: errorMessage,
                    type: "default",
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    animated: true,
                    animationDuration: 500,
                    icon: "danger",
                });
                setIsLoading(false); // Stop loading
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../../assets/signIn.png")}
                style={{
                    alignSelf: "center",
                    height: 300,
                    width: "100%",
                }}
            />
            <Text
                style={{
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.6)",
                    fontFamily: "hindsiliguri",
                }}
            >
                Never Forget Your Notes
            </Text>

            <View style={styles.signin}>
                <Input
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize={"none"}
                />
                <Input
                    placeholder="Password"
                    secrureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                {isLoading ? (
                    <ActivityIndicator size="large" color="#00BFA6" />
                ) : (
                    <Button title="Sign In" onPress={() => SignIn()} />
                )}
            </View>

            <View style={styles.signup}>
                <Text
                    style={{
                        alignSelf: "center",
                        color: "rgba(0,0,0,0.6)",
                        fontFamily: "hindsiliguri",
                    }}
                >
                    Don't have an account ?{" "}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("SingUp")}>
                    <Text
                        style={{
                            color: "#00BFA6",
                            fontFamily: "hindsiliguri",
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 0,
    },
    signin: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    signup: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
