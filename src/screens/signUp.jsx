import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../config";
import Button from "../components/button";
import Input from "../components/input";
const genderOptions = ["Male", "FeMale"];
const auth = getAuth();

export default function SignUp({ navigation }) {
    const [gender, setGender] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [fullName, setFullName] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const signUp = async () => {
        //validation here for data object and then call the firebase function
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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                addDoc(collection(db, "users"), {
                    email: email,
                    fullName: fullName,
                    age: age,
                    number: number,
                    gender: gender,
                    uid: user.uid,
                }).then((docRef) => {
                    showMessage({
                        message: "Signed Up Successfully",
                        type: "default",
                        backgroundColor: "#00BFA6",
                        color: "#fff",
                        animated: true,
                        animationDuration: 500,
                        icon: "success",
                    });
                });
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
            <Text
                style={{
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.6)",
                    fontFamily: "hindsiliguri",
                }}
            >
                Sign Up to Never Forget Your Notes
            </Text>
            <View style={styles.signin}>
                <Input
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Password"
                    secrureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Full Name"
                    onChangeText={(text) => setFullName(text)}
                    autoCapitalize={"words"}
                />
                <Input
                    placeholder="Age"
                    onChangeText={(text) => setAge(text)}
                />
                <Input
                    placeholder="Phone Number"
                    onChangeText={(text) => setNumber(text)}
                />
                <View style={styles.selectGen}>
                    <Text style={styles.selectText}>Select Gender</Text>
                </View>
                {genderOptions?.map((item, index) => {
                    const sletected = item === gender;
                    return (
                        <Pressable
                            key={index}
                            style={styles.radioContainer}
                            onPress={() => setGender(item)}
                        >
                            <View style={[styles.radioBtnOutter]}>
                                <View
                                    style={[
                                        styles.radioBtnInner,
                                        sletected && styles.sletectedbtn,
                                    ]}
                                />
                            </View>
                            <Text style={styles.label}>{item}</Text>
                        </Pressable>
                    );
                })}

                {isLoading ? (
                    <ActivityIndicator size="large" color="#00BFA6" />
                ) : (
                    <Button title="Sign Up" onPress={() => signUp()} />
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
                    Already have an account ?{" "}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                    <Text
                        style={{
                            color: "#00BFA6",
                            fontFamily: "hindsiliguri",
                            fontWeight: "bold",
                        }}
                    >
                        Sign In
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
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    radioBtnOutter: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#00BFA6",
        alignItems: "center",
        justifyContent: "center",
    },
    radioBtnInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#00BFA6",
    },
    label: {
        fontSize: 16,
        color: "rgba(0,0,0,0.6)",
        fontFamily: "hindsiliguri",
        marginLeft: 15,
    },
    sletectedbtn: {
        backgroundColor: "#00BFA6",
    },
    selectGen: {
        marginBottom: 20,
    },
    selectText: {
        fontSize: 16,
        color: "rgba(0,0,0,0.6)",
        fontFamily: "hindsiliguri",
    },
});
