import { addDoc, collection } from "firebase/firestore";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../config";
import Button from "../components/button";
import Input from "../components/input";

const noteColorOptions = ["blue", "red", "green"];

export default function Create({ navigation, route, user }) {
    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [noteColor, setNoteColor] = React.useState("blue");
    const [isLoading, setIsLoading] = React.useState(false);

    const createNote = async () => {
        if (!title || !description) {
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
        addDoc(collection(db, "notes"), {
            title: title,
            description: description,
            noteColor: noteColor,
            uid: user.uid,
        })
            .then((docRef) => {
                showMessage({
                    message: "Note Created Successfully",
                    type: "default",
                    backgroundColor: "#00BFA6",
                    color: "#fff",
                    animated: true,
                    duration: 2000,
                    animationDuration: 500,
                    icon: "success",
                });
                navigation.goBack();
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
            <View style={styles.create}>
                <Input
                    placeholder="Title"
                    onChangeText={(text) => setTitle(text)}
                />
                <Input
                    placeholder="Description"
                    multiline={true}
                    onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.selectGen}>
                    <Text style={styles.selectText}>Select Note Color</Text>
                </View>
                <View style={styles.colorOptionsContainer}>
                    {noteColorOptions?.map((item, index) => {
                        const isSelected = item === noteColor;
                        return (
                            <Pressable
                                key={index}
                                onPress={() => setNoteColor(item)}
                                style={styles.radioContainer}
                            >
                                <View
                                    style={[
                                        styles.radioBtnOutter,
                                        isSelected && { borderColor: item },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.radioBtnInner,
                                            isSelected && { borderColor: item },
                                        ]}
                                    ></View>
                                </View>
                                <Text style={styles.label}>{item}</Text>
                            </Pressable>
                        );
                    })}
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#00BFA6" />
                ) : (
                    <Button
                        title="Add Note"
                        onPress={() => {
                            createNote();
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 0,
    },
    create: {
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        marginRight: 10, // Added margin to the right for spacing
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

    colorOptionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
});
