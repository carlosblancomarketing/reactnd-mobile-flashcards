import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import TextButton from './TextButton';


class AddDeck extends Component {
    state = {
        title: ''
    }

    changeText = (text) => {
        this.setState({
            title: text,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add a new Deck</Text>
                <TextInput
                    value={this.state.title}
                    onChangeText={this.changeText}
                    style={styles.textInput}
                    placeholder='Deck title'
                >

                </TextInput>
                <TextButton disabled={this.state.title === ""}>
                    Create Deck
                </TextButton>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize:30,
    },
    textInput: {
        margin:50,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent:'center',
        fontSize: 20,
        borderRadius:5,
        padding:15,

    }
})

export default AddDeck;