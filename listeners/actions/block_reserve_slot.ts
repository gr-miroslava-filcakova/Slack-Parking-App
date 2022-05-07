import { Op } from 'sequelize'
import { models } from '../../models'
import reloadAppHome from '../../utilities/reload-app-home'
import slotReserved from '../../user-interface/modals/slot-reserved'
import slotError from '../../user-interface/modals/slot-error'

const { User, FreeSlot } = models

export default async ({ ack, action, client, body }: any) => {
	await ack()

	const freeSlotId = action.value.split('-')[2]
	let day = action.value.split('-')[3]
	day = Number(day)

	const todayDay = new Date()
	const date = new Date(`${todayDay.getFullYear()}/${todayDay.getMonth() + 1}/${todayDay.getDate()}`)

	date.setDate(todayDay.getDate() + day)

	const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

	try {
		const queryUser = await User.findOne({
			where: {
				id: body.user.id
			}
		})

		let userID
		if (!queryUser) {
			const user = User.build({
				id: body.user.id,
				slackWorkspaceID: body.team.id,
				slackUsername: body.user.username
			})
			await user.save()
			userID = user.id
		} else {
			userID = queryUser.id
		}

		const existReservation = await FreeSlot.findAll({
			where: {
				[Op.and]: [{ id: freeSlotId }, { userID: { [Op.is]: null } }]
			}
		})

		const pDate = new Date(dateString)
		pDate.setHours(pDate.getHours() + 3) // TODO na oracle len +1

		const usersReservations = await FreeSlot.findAll({
			where: {
				[Op.and]: [{ date: pDate }, { userID }]
			}
		})

		if (usersReservations.length > 0) {
			throw new Error('Slot reservation failed! You already have reservations on this day.')
		}

		if (existReservation.length === 1) {
			await FreeSlot.update({ userID }, { where: { id: freeSlotId } })

			try {
				await ack()
				await client.views.open({
					trigger_id: body.trigger_id,
					view: slotReserved()
				})
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		} else {
			throw new Error('Slot reservation failed! Please choose another slot.')
		}
	} catch (err) {
		try {
			await ack()
			await client.views.open({
				trigger_id: body.trigger_id,
				view: slotError(err.message)
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	await reloadAppHome(client, body.user.id, body.team.id, day)
}
