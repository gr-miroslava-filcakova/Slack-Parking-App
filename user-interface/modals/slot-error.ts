import { Modal, Blocks } from 'slack-block-builder'

export default (message: string) => {
	return Modal({ title: 'Error', callbackId: 'slot-error-modal' })
		.blocks(
			Blocks.Section({
				text: message
			})
		)
		.buildToJSON()
}
