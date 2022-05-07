import reloadAppHome from '../../utilities/reload-app-home'
import errorModal from '../../user-interface/modals/slot-error'
import { models } from '../../models'

const { FreeSlot } = models

export default async ({ ack, action, client, body }: any) => {
	await ack()
	const freeslotId = action.value.split('-')[0]
	let dateString = action.value.split('-')[1]
	dateString = new Date(dateString)
	dateString.setHours(dateString.getHours() + 4)

	const freeSlot = await FreeSlot.findAll({
		where: {
			id: freeslotId,
			userID: null
		}
	})

	if (freeSlot.length === 0) {
		try {
			await ack()
			await client.views.open({
				trigger_id: body.trigger_id,
				view: errorModal('This slot is already reserved. You can not cancel it.')
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	} else {
		await FreeSlot.destroy({ where: { id: freeslotId } })
	}

	await reloadAppHome(client, body.user.id, body.team.id, -1)
}
