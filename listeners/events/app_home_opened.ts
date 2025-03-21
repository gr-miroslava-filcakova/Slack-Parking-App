import reloadAppHome from '../../utilities/reload-app-home'

export default async ({ client, event, body }: any) => {
	if (event.tab !== 'home') {
		// Ignore the `app_home_opened` event for everything
		// except home as we don't support a conversational UI
		return
	}
	try {
		if (event.view) {
			await reloadAppHome(client, event.user, body.team_id, 0)
			return
		}

		// For new users where we've never set the App Home,
		// the App Home event won't send a `view` property
		await reloadAppHome(client, event.user, body.team_id, 0)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
