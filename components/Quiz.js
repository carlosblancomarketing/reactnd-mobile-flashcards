import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';


class Quiz extends Component {

    state = {
        completed: false,
        showAnswer: false,
        remainingCardsIds: [],
        correctCards: [],
        incorrectCards: [],
    }

    toogleShowAnswer = () => {
        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }))
    }

    componentDidMount() {
        this.setState({
            remainingCardsIds: this.props.remainingCardsIds
        })
    }

    submitCorrect = () => {
        let { remainingCardsIds, correctCards } = this.state;

        const currentCardId = remainingCardsIds[0];
        correctCards = correctCards.concat([currentCardId])

        remainingCardsIds = remainingCardsIds.filter((cardIds) => {
            return cardIds !== currentCardId
        });

        const completed = remainingCardsIds.length === 0;

        this.setState((prevState) => ({
            remainingCardsIds,
            correctCards,
            completed,
            showAnswer: false,
        }))
    }

    submitIncorrect = () => {
        let { remainingCardsIds, incorrectCards } = this.state;

        const currentCardId = remainingCardsIds[0];
        incorrectCards = incorrectCards.concat([currentCardId])

        remainingCardsIds = remainingCardsIds.filter((cardIds) => {
            return cardIds !== currentCardId
        });

        const completed = remainingCardsIds.length === 0;

        this.setState((prevState) => ({
            remainingCardsIds,
            incorrectCards,
            completed,
            showAnswer: false,
        }))
    }

    reset = () => {

        this.setState((prevState) => ({
            remainingCardsIds: prevState.remainingCardsIds.concat(prevState.correctCards, prevState.incorrectCards),
            completed: false,
            showAnswer: false,
            correctCards: [],
            incorrectCards: [],
        }))
    }

    render() {
        const { completed, showAnswer, remainingCardsIds, correctCards, incorrectCards } = this.state;
        const { cards, deckId } = this.props
        const answeredQuestions = correctCards.length + incorrectCards.length
        const totalQuestions = remainingCardsIds.length + answeredQuestions

        if (completed) {
            return (
                <View style={styles.center}>
                    <Text style={styles.question}>Score</Text>
                    <Text style={styles.score}> {`${correctCards.length} / ${correctCards.length + incorrectCards.length}`} </Text>

                    <TextButton onPress={this.reset}>
                        Repeat Quiz
                    </TextButton>

                    <TextButton
                        onPress={() => this.props.navigation.navigate(
                            'DeckDetail',
                            { deckId: deckId }
                        )}
                    >
                        Return to Deck
                    </TextButton>
                </View>
            )
        } else if (remainingCardsIds.length === 0) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>)
        } else {
            const currentCard = cards[remainingCardsIds[0]];

            return (

                <View style={styles.center}>
                    <Text style={styles.cardNumber}>Card {answeredQuestions + 1} of {totalQuestions}</Text>
                    <Text style={styles.question}>{currentCard.question}</Text>
                    {showAnswer && (<Text style={styles.answer}>{currentCard.answer}</Text>)}

                    <TextButton onPress={this.toogleShowAnswer}>
                        Show Answer
                    </TextButton>

                    <TextButton style={styles.correct} onPress={this.submitCorrect}>
                        Correct
                    </TextButton>

                    <TextButton style={styles.incorrect} onPress={this.submitIncorrect}>
                        Incorrect
                    </TextButton>
                </View>
            )
        }



    }
}

const styles = StyleSheet.create({
    center: {
        textAlign: 'center',
    },
    cardNumber: {
        fontSize: 20,
        textAlign: 'center',
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    answer: {
        fontSize: 30,
        textAlign: 'center',
    },
    score: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    incorrect: {
        backgroundColor: '#e53935',
    },
    correct: {
        backgroundColor: '#43a047',
    }
})

function mapStateToProps({ decks, cards }, { route }) {
    const { deckId } = route.params;
    const remainingCardsIds = decks[deckId].cards

    return {
        remainingCardsIds,
        cards,
        deckId
    }

}

export default connect(mapStateToProps)(Quiz);