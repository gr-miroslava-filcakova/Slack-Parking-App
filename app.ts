import { App, LogLevel } from '@slack/bolt'
import sequelize from './models'
import registerListeners from './listeners'

let logLevel
switch (process.env.LOG_LEVEL) {
	case 'debug':
		logLevel = LogLevel.DEBUG
		break
	case 'info':
		logLevel = LogLevel.INFO
		break
	case 'warn':
		logLevel = LogLevel.WARN
		break
	case 'error':
		logLevel = LogLevel.ERROR
		break
	default:
		logLevel = LogLevel.INFO
}

// Initializes your app with your bot token and signing secret
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
	logLevel
})
registerListeners(app)
;(async () => {
	try {
		await sequelize.sync()
		// eslint-disable-next-line no-console
		console.log('All models were synchronized successfully.')
		// eslint-disable-next-line no-console
		console.log('Connection has been established successfully.')
		// Start your app
		await app.start()

		// eslint-disable-next-line no-console
		console.log('⚡️ Parking app is running!')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Unable to start App', error)
		process.exit(1)
	}
})()
