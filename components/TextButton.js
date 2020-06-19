import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton({ children, onPress, style = {}, disabled = false }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.default, style, disabled ? styles.disabled : '']}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: '#2bbbad',
        color: '#FFF',
        textAlign: 'center',
        padding: 16,
        margin: 15,
        fontSize: 20,
    },
    disabled: {
        opacity: 0.5
    }
})