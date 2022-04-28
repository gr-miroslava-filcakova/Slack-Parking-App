import { Modal, Blocks } from 'slack-block-builder'

export default () => {
	Modal({ title: 'Slot reserved', callbackId: 'slot-reserved-modal' })
		.blocks(
			Blocks.Section({
				text: `Reservation successful`
			})
		)
		.buildToJSON()
}
