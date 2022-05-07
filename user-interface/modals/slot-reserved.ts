import { Modal, Blocks } from 'slack-block-builder'

export default () => {
	return Modal({ title: 'Slot reserved', callbackId: 'slot-reserved-modal' })
		.blocks(
			Blocks.Section({
				text: `:mano_police: Reservation successful`
			})
		)
		.buildToJSON()
}
