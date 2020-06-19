import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import TextButton from './TextButton';


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    changeQuestion = (text) => {
        this.setState({
            question: text,
        });
    }

    changeAnswer = (text) => {
        this.setState({
            answer: text,
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={styles.container}>
                            <Text style={styles.title}>Add a new Deck</Text>

                            <TextInput
                                value={this.state.title}
                                onChangeText={this.changeQuestion}
                                style={styles.textInput}
                                placeholder='Question'
                                multiline={true}
                            />

                            <TextInput
                                value={this.state.answer}
                                onChangeText={this.changeAnswer}
                                style={styles.textInput}
                                placeholder='Answer'
                                multiline={true}
                            />

                            <TextButton disabled={this.state.question === '' || this.state.answer === ''}>
                                Add Card
                                </TextButton>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    textInput: {
        margin: 50,
        marginBottom: 0,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        fontSize: 20,
        borderRadius: 5,
        padding: 15,
        minHeight: 80,

    }
})

export default AddCard;