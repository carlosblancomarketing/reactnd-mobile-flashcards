import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeckListItem from './DeckListItem';
import { setInitialState } from '../actions/index';
import { connect } from 'react-redux';

class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setInitialState({}));
        console.log(this.props)
    }

    render() {
        const { decks, deckIds } = this.props;

        return (
            <View>

                {deckIds.map((deckId) => {
                    return (
                        <TouchableOpacity
                            key={deckId}
                            onPress={() => this.props.navigation.navigate(
                                'DeckDetail',
                                { deckId: deckId }
                            )}
                        >
                            <DeckListItem deckId={deckId} />
                        </TouchableOpacity>
                    )

                })}

            </View>
        )
    }
}

const styles = StyleSheet.create({

})

function mapStateToProps({ decks }) {
    return {
        decks,
        deckIds: Object.keys(decks)
    }
}


export default connect(mapStateToProps)(DeckList);