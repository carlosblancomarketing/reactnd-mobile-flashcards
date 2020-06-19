import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DeckListItem extends Component {
    render() {

        const { deck } = this.props;

        return (
            <View style={styles.deck}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.title}>{deck.cards.length} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    deck: {
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignContent: 'center',
        height: 50,
    },
    title: {
        textAlign: 'center'
    }
})

export default DeckListItem;