import manageDash from '../../user-interface/modals/manage-dash'
import { models } from '../../models'
import reloadAppHome from '../../utilities/reload-app-home'

const { Slot, User } = models

export default async ({ body, ack, client }: any) => {
	try {
		await ack()

		await reloadAppHome(client, body.user.id, body.team.id, -1)

		const prefilledSlot = await Slot.findOne({
			include: [
				{
					model: User,
					as: 'user'
				}
			],
			where: {
				userID: body.user.id
			}
		})

		await client.views.open({
			trigger_id: body.trigger_id,
			view: manageDash(prefilledSlot)
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
