import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeckListItem from './DeckListItem';


class DeckList extends Component {
    render() {
        return (
            <View>
                <DeckListItem />
                <DeckListItem />
                <DeckListItem />
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default DeckList;