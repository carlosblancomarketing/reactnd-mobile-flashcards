import { ADD_DECK } from '../actions/decks'
import { ADD_CARD } from '../actions/cards'


export default function decks(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            }
        case ADD_CARD:
            const { deckId } = action.card
            // console.log('state[deckId]: ', state[deckId])
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: state[deckId].cards.concat([action.card.id])
                }
            }
        default:
            return state
    }
}