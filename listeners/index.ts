import eventsListener from './events'
import actionsListener from './actions'
import viewsListener from './views'

export default (app: any) => {
	eventsListener(app)
	actionsListener(app)
	viewsListener(app)
}
