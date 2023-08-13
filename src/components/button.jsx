import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ title, onPress, customStyle }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.InBtn, customStyle]}>
            <Text style={styles.btntext}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    InBtn: {
        backgroundColor: "#00BFA6",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    btntext: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "hindsiliguri",
    },
});
