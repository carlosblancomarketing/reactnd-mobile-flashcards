import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


const NOTIFICATION_KEY = 'MobileFlashcards:notifications'


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



export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Time to study',
        body: "👋 don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(19)
                            tomorrow.setMinutes(0)

                            console.log('tomorrow', tomorrow)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}