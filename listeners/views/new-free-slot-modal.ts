import { models } from '../../models'
import reloadAppHome from '../../utilities/reload-app-home'
import errorModal from '../../user-interface/modals/slot-error'
import slotAsFree from '../../user-interface/modals/slot-set-as-free-successful'

const { User, FreeSlot, Slot } = models

export default async ({ ack, view, body, client }: any) => {
	const providedValues = view.state.values

	const selectedDate = providedValues.freeSlotDate.freeSlotDate.selected_date

	try {
		const ownSlot = await Slot.findAll({
			include: [{ model: User, as: 'user' }],
			where: { userID: body.user.id }
		})

		if (selectedDate !== null) {
			const selectedDatePlusHour = new Date(selectedDate)
			selectedDatePlusHour.setHours(selectedDatePlusHour.getHours() + 1)

			const today = new Date()
			today.setDate(today.getDate() - 1)
			if (selectedDatePlusHour < today) {
				throw new Error('Error. You can not set slot as free.')
			}

			const isFree = await FreeSlot.findAll({
				where: {
					date: selectedDatePlusHour,
					slotID: ownSlot[0].id
				}
			})

			if (isFree.length !== 0) {
				throw new Error('Your slot is already free.')
			}

			const freeSlot = await FreeSlot.build({ date: selectedDatePlusHour, slotID: ownSlot[0].id })
			await freeSlot.save()
		}

		await ack({
			response_action: 'update',
			view: slotAsFree(new Date(selectedDate))
		})

		await reloadAppHome(client, body.user.id, body.team.id, -1)
	} catch (error) {
		await ack({
			response_action: 'update',
			view: errorModal(error.message)
		})
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
