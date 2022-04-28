import reloadAppHome from '../../utilities/reload-app-home'

export const appHomeNavOpenCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 0)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const appHomeFirstCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 0)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const appHomeSecondCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 1)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const appHomeThirdCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 2)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const appHomeFourthCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 3)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const appHomeFifthCallback = async ({ body, ack, client }: any) => {
	try {
		await ack()
		await reloadAppHome(client, body.user.id, body.team.id, 4)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
