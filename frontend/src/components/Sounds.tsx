import hover from '../assets/sounds/hover1.wav'
import click from '../assets/sounds/click.wav'
import score from '../assets/sounds/score.wav'
import start from '../assets/sounds/start.wav'
import incorrect from '../assets/sounds/incorrect.mp3'
import gameOver from '../assets/sounds/gameOver.wav'
import timer from '../assets/sounds/timer.wav'
import theme from '../assets/sounds/theme.mp3'
import notification from '../assets/sounds/notification.wav'
import message from '../assets/sounds/message.wav'

export const clickSound = (): Promise<void> => new Audio(click).play() 
export const messageSound = (): Promise<void> => new Audio(message).play() 
export const hoverSound = (): Promise<void> => new Audio(hover).play()
export const startSound = (): Promise<void> => new Audio(start).play()
export const scoreSound = (): Promise<void> => new Audio(score).play()
export const failSound = (): Promise<void> => new Audio(incorrect).play()
export const gameOverSound = (): Promise<void> => new Audio(gameOver).play()
export const timerSound = (): Promise<void> => new Audio(timer).play()
export const invitationSound = (): Promise<void> => new Audio(notification).play()
export const themeMusic: HTMLAudioElement = new Audio(theme)

export const func = async() => {
    await clickSound()
}
