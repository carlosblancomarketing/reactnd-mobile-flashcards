import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';

class Quiz extends Component {

    state = {
        completed: false,
        showAnswer: false,
    }

    toogleShowAnswer = () => {
        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }))
    }

    render() {
        const { completed, showAnswer } = this.state;

        if (completed) {
            return (
                <View style={styles.center}>
                    <Text style={styles.question}>Score</Text>
                    <Text style={styles.score}> 1/3 </Text>

                    <TextButton >
                        Repeat Quiz
                    </TextButton>

                    <TextButton >
                        Return to Deck
                    </TextButton>
                </View>
            )
        }

        return (
            <View style={styles.center}>
                <Text style={styles.cardNumber}>Card #1</Text>
                <Text style={styles.question}>How cool is to be cool</Text>
                {showAnswer && (<Text style={styles.answer}>It's so cool</Text>)}

                <TextButton onPress={this.toogleShowAnswer}>
                    Show Answer
                </TextButton>

                <TextButton style={styles.correct}>
                    Correct
                </TextButton>

                <TextButton style={styles.incorrect}>
                    Incorrect
                </TextButton>
            </View>
        )
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
    score:{
        fontSize: 50,
        fontWeight: 'bold',
    },
    correct: {
        backgroundColor: '#e53935',
    },
    incorrect: {
        backgroundColor: '#43a047',
    }
})

export default Quiz;