import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';
import DeckListItem from './DeckListItem';

import { deleteDeck } from '../actions/decks';


class DeckDetail extends Component {
    delete = () => {
        const { deck, dispatch, navigation } = this.props;
        dispatch(deleteDeck(deck))
        navigation.navigate("Decks")
    }

    render() {
        const { deck } = this.props;

        return (
            <View>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.cards}>{deck.cards.length} cards</Text>

                <TextButton style={styles.addCard}
                    onPress={() => this.props.navigation.navigate(
                        'Add Card',
                        { deck: deck }
                    )}
                >
                    Add Card
                </TextButton>

                <TextButton style={styles.startQuiz}
                    onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { deckId: deck.id }
                    )}
                >
                    Start Quiz
                </TextButton>


                <TextButton
                    onPress={this.delete}
                    style={styles.deleteDeck}>
                    Delete Deck
                </TextButton>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    addCard: {
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#fff',
        color: '#000'
    },
    startQuiz: {
        backgroundColor: '#000',
    },
    deleteDeck: {
        color: '#e53935',
        borderColor: '#e53935',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    cards: {
        textAlign: 'center',
        fontSize: 20,
    },
})

function mapStateToProps({ decks }, { route }) {
    const { deckId } = route.params;
    const deck = decks[deckId]

    return {
        deck: deck,
    }

}

export default connect(mapStateToProps)(DeckDetail);