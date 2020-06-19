import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/cards';
import TextButton from './TextButton';
import { generateCardId } from '../utils/helpers';


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    changeQuestion = (text) => {
        this.setState({
            question: text,
        });
    }

    changeAnswer = (text) => {
        this.setState({
            answer: text,
        });
    }

    submit = () => {
        const { cardIds, dispatch, deck, navigation } = this.props;
        
        const card = {
            question: this.state.question,
            answer: this.state.answer,
            deckId: deck.id,
            id: generateCardId(cardIds)
        }

        console.log('card: ', card)
        dispatch(addCard(card));
        // navigation.goBack()
        navigation.navigate({ name: "DeckDetail", deckId: deck.id });

    }

    render() {
        const { deck } = this.props;

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={styles.container}>
                            <Text style={styles.title}>Add a new card to {deck.title}</Text>

                            <TextInput
                                value={this.state.title}
                                onChangeText={this.changeQuestion}
                                style={styles.textInput}
                                placeholder='Question'
                                multiline={true}
                            />

                            <TextInput
                                value={this.state.answer}
                                onChangeText={this.changeAnswer}
                                style={styles.textInput}
                                placeholder='Answer'
                                multiline={true}
                            />

                            <TextButton
                                disabled={this.state.question === '' || this.state.answer === ''}
                                onPress={this.submit}
                            >
                                Add Card
                                </TextButton>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    textInput: {
        margin: 50,
        marginBottom: 0,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        fontSize: 20,
        borderRadius: 5,
        padding: 15,
        minHeight: 80,

    }
})

function mapStateToProps(state, { route }) {
    const { deck } = route.params;
    const cardIds = Object.keys(state.cards);

    return {
        cardIds,
        deck
    }
}

export default connect(mapStateToProps)(AddCard);