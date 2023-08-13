import { AntDesign } from "@expo/vector-icons";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../config";

export default function Home({ navigation, route, user }) {
    const [notes, setNotes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "notes"), where("uid", "==", user.uid));
        const notesListener = onSnapshot(q, (querySnapshot) => {
            const notes = [];
            querySnapshot.forEach((doc) => {
                notes.push({ ...doc.data(), id: doc.id });
            });
            setNotes(notes);
            setIsLoading(false);
        });
        return () => notesListener();
    }, []);

    const deleteNote = async (itemId) => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Delete from the database
                        deleteDoc(doc(db, "notes", itemId))
                            .then(() => {
                                showMessage({
                                    message: "Note Deleted Successfully",
                                    type: "default",
                                    backgroundColor: "#00BFA6",
                                    color: "#fff",
                                    animated: true,
                                    duration: 2000,
                                    animationDuration: 500,
                                    icon: "success",
                                });
                            })
                            .catch((error) => {
                                const errorMessage = error.message;
                                showMessage({
                                    message: errorMessage,
                                    type: "default",
                                    backgroundColor: "#FF3D71",
                                    color: "#fff",
                                    animated: true,
                                    duration: 2000,
                                    animationDuration: 500,
                                    icon: "danger",
                                });
                            })
                            .finally(() => {
                                setIsLoading(false);
                            });
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeview}>
                <Text style={styles.myNotes}>My Notes</Text>
                <Text onPress={() => navigation.navigate("Create")}>
                    <AntDesign name="pluscircleo" size={20} color="black" />
                </Text>
            </View>
            {notes.length === 0 && !isLoading && (
                <TouchableOpacity
                    style={styles.addNote}
                    onPress={() => navigation.navigate("Create")}
                >
                    <Text style={styles.addNoteText}>Add Note</Text>
                </TouchableOpacity>
            )}
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#00BFA6"
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            ) : (
                <FlatList
                    contentContainerStyle={{ padding: 10 }}
                    data={notes}
                    renderItem={({ item }) => (
                        <>
                            <View
                                style={[
                                    styles.notes,
                                    { backgroundColor: item.noteColor },
                                ]}
                            >
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.editIcon}
                                onPress={() =>
                                    navigation.navigate("Edit", { note: item })
                                }
                            >
                                <AntDesign
                                    name="edit"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteIcon}
                                onPress={() => {
                                    deleteNote(item.id);
                                }}
                            >
                                <AntDesign
                                    name="delete"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 0,
    },
    homeview: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    myNotes: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "hindsiliguri",
    },
    notes: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginTop: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "hindsiliguri",
        color: "#fff",
        paddingBottom: 10,
    },
    description: {
        fontSize: 16,
        fontFamily: "hindsiliguri",
        color: "#fff",
    },
    editIcon: {
        position: "absolute",
        right: 10,
        bottom: 20,
    },
    deleteIcon: {
        position: "absolute",
        right: 10,
        top: 30,
    },
    addNote: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 300,
    },
    addNoteText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "hindsiliguri",
        color: "#fff",
        backgroundColor: "#00BFA6",
        padding: 10,
        borderRadius: 10,
    },
});
