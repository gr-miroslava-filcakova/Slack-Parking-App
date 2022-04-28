import {
	appHomeNavOpenCallback,
	appHomeFirstCallback,
	appHomeSecondCallback,
	appHomeThirdCallback,
	appHomeFourthCallback,
	appHomeFifthCallback
} from './block_app-home-nav-open'
import freeSlotCallback from './block_free-slot'
import reserveSlotCallback from './block_reserve_slot'

export default (app: any) => {
	app.action({ action_id: 'app-home-nav-open', type: 'block_actions' }, appHomeNavOpenCallback)
	app.action({ action_id: 'app-home-nav-first-day', type: 'block_actions' }, appHomeFirstCallback)
	app.action({ action_id: 'app-home-nav-second-day', type: 'block_actions' }, appHomeSecondCallback)
	app.action({ action_id: 'app-home-nav-third-day', type: 'block_actions' }, appHomeThirdCallback)
	app.action({ action_id: 'app-home-nav-fourth-day', type: 'block_actions' }, appHomeFourthCallback)
	app.action({ action_id: 'app-home-nav-fifth-day', type: 'block_actions' }, appHomeFifthCallback)

	app.action({ action_id: 'free-slot', type: 'block_actions' }, freeSlotCallback)
	app.action({ action_id: 'reserve-slot', type: 'block_actions' }, reserveSlotCallback)
}
