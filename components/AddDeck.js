import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addDeck } from '../actions/decks';
import { generateDeckId } from '../utils/helpers';
import { NavigationActions } from 'react-navigation'



class AddDeck extends Component {
    state = {
        title: ''
    }

    changeText = (text) => {
        this.setState({
            title: text,
        });
    }

    submit = () => {
        const title = this.state.title;
        const { deckIds, dispatch, navigation } = this.props;

        const deck = {
            id: generateDeckId(deckIds),
            title,
            cards: [],
        }

        console.log(deck);
        dispatch(addDeck(deck));

        this.setState({ title: '' });
        navigation.navigate('DeckDetail', { 
            deckId: deck.id 
        });
    }

    toHome = () => {
        this.props.navigation.navigate("Decks")
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
                <TextButton disabled={this.state.title === ""} onPress={this.submit}>
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
        fontSize: 30,
    },
    textInput: {
        margin: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        fontSize: 20,
        borderRadius: 5,
        padding: 15,

    }
})

function mapStateToProps({ decks }) {
    return {
        deckIds: Object.keys(decks)
    }
}

export default connect(mapStateToProps)(AddDeck);