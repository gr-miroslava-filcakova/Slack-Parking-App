import { Modal, Blocks } from 'slack-block-builder'

function getPrettyDate(pDate: Date) {
	return `${pDate.getDate()}.${pDate.getMonth() + 1}.${pDate.getFullYear()}`
}

export default (date: Date) =>
	Modal({ title: 'Slot is free' })
		.blocks(
			Blocks.Section({
				text: `Your slot is now free on ${getPrettyDate(date)}`
			})
		)
		.buildToJSON()
