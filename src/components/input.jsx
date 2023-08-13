import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
    placeholder,
    secrureTextEntry,
    onChangeText,
    autoCapitalize,
    multiline,
    value,
}) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.inputBox}
            secureTextEntry={secrureTextEntry}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            value={value}
        />
    );
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});
