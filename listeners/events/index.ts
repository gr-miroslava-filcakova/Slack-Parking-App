import appHomeOpenedCallback from './app_home_opened'

export default (app: any) => {
	app.event('app_home_opened', appHomeOpenedCallback)
}
