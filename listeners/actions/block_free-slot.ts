import { models } from '../../models'
import reloadAppHome from '../../utilities/reload-app-home'

const { Reservation } = models

export default async ({ ack, action, client, body }: any) => {
	await ack()
	const reservationId = action.value.split('-')[0]
	let dateString = action.value.split('-')[1]
	dateString = Number(dateString)

	await Reservation.destroy({
		where: {
			id: reservationId
		}
	})
	await reloadAppHome(client, body.user.id, body.team.id, dateString)
}
