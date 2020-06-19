import { ADD_CARD } from '../actions/cards';
import { DELETE_DECK } from '../actions/decks';

export default function cards(state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                [action.card.id]: action.card
            }
        case DELETE_DECK:
            const cardIds = action.deck.cards;
            cardIds.forEach((cardId) => delete state[cardId])
            return {
                ...state,
            }
        default:
            return state
    }
}