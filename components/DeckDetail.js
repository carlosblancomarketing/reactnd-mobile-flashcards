import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';


import TextButton from './TextButton';
import DeckListItem from './DeckListItem';

import { deleteDeck } from '../actions/decks';


class DeckDetail extends Component {
    state = {
        opacity: new Animated.Value(0),
    }

    componentDidMount() {
        const { opacity } = this.state;



        Animated.timing(opacity, { toValue: 1, duration: 1000 })
            .start()

    }

    delete = () => {
        const { deck, dispatch, navigation } = this.props;
        dispatch(deleteDeck(deck))
        navigation.navigate("Decks")
    }

    render() {
        const { deck } = this.props;
        const { opacity } = this.state;

        return (
            <Animated.View style={[{ opacity }]}>
                <Animated.Text style={styles.title}>{deck.title}</Animated.Text>
                <Text style={styles.cards}>{deck.cards.length} cards</Text>

                <TextButton style={styles.addCard}
                    onPress={() => this.props.navigation.navigate(
                        'Add Card',
                        { deck: deck }
                    )}
                >
                    Add Card
                </TextButton>

                <TextButton
                    style={styles.startQuiz}
                    disabled={this.props.deck.cards.length < 1}
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

            </Animated.View>
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