import { ADD_DECK } from '../actions/decks'
import { ADD_CARD } from '../actions/cards'
import { DELETE_DECK } from '../actions/decks';


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
        case DELETE_DECK:
            delete state[action.deck.id]
            
            return {
                ...state
            }
        default:
            return state
    }
}