import { Modal, Blocks, Elements } from 'slack-block-builder'

export default (prefilledSlot: any) => {
	if (!prefilledSlot) {
		return Modal({ title: 'Manage my parking place' })
			.blocks(Blocks.Section({ text: `You do not own any parking place.` }))
			.buildToJSON()
	}

	return Modal({ title: 'Manage my parking place', submit: 'Apply', callbackId: 'new-free-slot-modal' })
		.blocks(
			Blocks.Section({ text: `Number of your parking place is *${prefilledSlot.slotNumber}*` }),

			Blocks.Input({ label: 'Set your parking place as free', blockId: 'freeSlotDate' }).element(
				Elements.DatePicker({
					actionId: 'freeSlotDate'
				})
			)
		)
		.buildToJSON()
}
