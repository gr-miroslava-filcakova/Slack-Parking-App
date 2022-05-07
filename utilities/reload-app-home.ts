import { Op } from 'sequelize'

import parkingMainView from '../user-interface/app-home/parking-main-view'
import { models } from '../models'

const { Slot, FreeSlot, User } = models

export default async (client: any, slackUserID: string, slackWorkspaceID: string, selectedDay: any) => {
	const todayDay = new Date()

	if (selectedDay === -1) {
		// show my freeslots
		try {
			const today = new Date(`${todayDay.getFullYear()}/${todayDay.getMonth() + 1}/${todayDay.getDate()}`)
			const queryMyFreeSlots = await FreeSlot.findAll({
				include: [
					{
						model: User,
						required: false
					},
					{
						model: Slot,
						required: true,
						include: [
							{
								model: User,
								as: 'user',
								required: true,
								where: {
									id: slackUserID
								}
							}
						]
					}
				],
				where: {
					date: {
						[Op.gte]: today
					}
				},
				order: [['date', 'ASC']]
			})

			await client.views.publish({
				user_id: slackUserID,
				view: parkingMainView([], [], selectedDay, queryMyFreeSlots, slackUserID)
			})
			return
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const date = new Date()
	date.setDate(todayDay.getDate() + selectedDay)

	try {
		const startDate = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
		const endDate = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
		endDate.setDate(startDate.getDate() + 1)

		const queryFreeSlots = await FreeSlot.findAll({
			include: [
				{
					model: User
				},
				{
					model: Slot,
					include: [{ model: User, as: 'user' }]
				}
			],
			where: {
				[Op.and]: [{ userID: { [Op.is]: null } }, { date: { [Op.between]: [startDate, endDate] } }]
			}
		})

		const queryReservedSlots = await FreeSlot.findAll({
			include: [
				{
					model: User
				},
				{
					model: Slot,
					include: [{ model: User, as: 'user' }]
				}
			],
			where: {
				date: {
					[Op.between]: [startDate, endDate]
				},
				userID: {
					[Op.not]: null
				}
			}
		})

		await client.views.publish({
			user_id: slackUserID,
			view: parkingMainView(queryFreeSlots, queryReservedSlots, selectedDay, [], slackUserID)
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}
