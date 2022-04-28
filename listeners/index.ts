import eventsListener from './events'
import actionsListener from './actions'

export default (app: any) => {
	eventsListener(app)
	actionsListener(app)
}
