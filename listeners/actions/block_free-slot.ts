import { models } from '../../models'
import reloadAppHome from '../../utilities/reload-app-home'

const { FreeSlot } = models

export default async ({ ack, action, client, body }: any) => {
	await ack()
	const freeSlotID = action.value.split('-')[0]
	let dateString = action.value.split('-')[1]
	dateString = Number(dateString)

	await FreeSlot.update({ userID: null }, { where: { id: freeSlotID } })
	await reloadAppHome(client, body.user.id, body.team.id, dateString)
}
