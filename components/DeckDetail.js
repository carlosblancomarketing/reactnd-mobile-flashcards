import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import DeckListItem from './DeckListItem';


class DeckDetail extends Component {
    render() {
        return (
            <View>
                <DeckListItem />
                <TextButton style={styles.addCard}>
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
        backgroundColor:'#fff',
        color:'#000'
    },
    startQuiz: {
        backgroundColor:'#000',
    },
    deleteDeck: {
        color:'#e53935',
        borderColor: '#e53935',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor:'#fff',
    }
})

export default DeckDetail;