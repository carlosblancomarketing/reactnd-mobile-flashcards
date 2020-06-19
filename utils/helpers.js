
export function generateDeckId(taken_ids) {
    let id = 'DECK_' + Math.random().toString(36).substr(2, 9);

    while (id in taken_ids) {
        id = 'DECK_' + Math.random().toString(36).substr(2, 9);
    }

    return id
}


export function generateCardId(taken_ids) {
    let id = 'CARD_' + Math.random().toString(36).substr(2, 9);

    while (id in taken_ids) {
        id = 'CARD_' + Math.random().toString(36).substr(2, 9);
    }

    return id
}