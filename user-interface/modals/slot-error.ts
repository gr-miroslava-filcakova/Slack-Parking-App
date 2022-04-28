import { Modal, Blocks } from 'slack-block-builder'

export default () => {
	Modal({ title: 'Reservation error', callbackId: 'slot-error-modal' })
		.blocks(
			Blocks.Section({
				text: `Slot reservation failed! Please choose another slot.`
			})
		)
		.buildToJSON()
}
