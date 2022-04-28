import { Op } from 'sequelize'

import { filter } from 'lodash'
import parkingMainView from '../user-interface/app-home/parking-main-view'
import { models } from '../models'

const { Slot, Reservation, User } = models

export default async (client: any, slackUserID: string, slackWorkspaceID: string, selectedDay: any) => {
	const todayDay = new Date()
	const date = new Date()

	date.setDate(todayDay.getDate() + selectedDay)

	try {
		const slots = await Slot.findAll({
			include: [
				{
					model: Reservation,
					include: [User]
				}
			],
			order: [['slotNumber', 'ASC']]
		})

		const startDate = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
		const endDate = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 1}`)

		const queryReservedSlots = await Slot.findAll({
			include: [
				{
					model: Reservation,
					include: [User],
					required: true,
					where: {
						date: {
							[Op.between]: [startDate, endDate]
						}
					}
				}
			],
			order: [['slotNumber', 'ASC']]
		})

		const reservedSlotsId = queryReservedSlots.map((slot) => slot.id)
		const queryFreeSlots = filter(slots, (item) => !reservedSlotsId.includes(item.id))

		const reservedSlotsByUser = await Slot.findAll({
			include: [
				{
					model: Reservation,
					include: [User],
					where: {
						date: {
							[Op.between]: [startDate, endDate]
						},
						UserId: slackUserID
					}
				}
			],
			order: [['slotNumber', 'ASC']]
		})

		await client.views.publish({
			user_id: slackUserID,
			view: parkingMainView(queryFreeSlots, queryReservedSlots, selectedDay, reservedSlotsByUser)
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
