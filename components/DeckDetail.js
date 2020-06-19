import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';
import DeckListItem from './DeckListItem';


class DeckDetail extends Component {
    render() {
        const { deck } = this.props;
        
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.cards.length} cards</Text>

                <TextButton style={styles.addCard}
                    key={deck.id}
                    onPress={() => this.props.navigation.navigate(
                        'Add Card',
                        { deck: deck }
                    )}
                >
                    Add Card
                </TextButton>

                <TextButton style={styles.startQuiz}>
                    Start Quiz
                </TextButton>

                <TextButton style={styles.deleteDeck}>
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
    }
})

function mapStateToProps({ decks }, { route }) {
    const { deckId } = route.params;
    const deck = decks[deckId]

    return {
        deck: deck,
    }

}

export default connect(mapStateToProps)(DeckDetail);