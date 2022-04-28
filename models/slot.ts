import { Model, Sequelize, DataTypes } from 'sequelize'
import { SLOT_TYPE, SLOT_TYPES } from '../utilities/enums'
// eslint-disable-next-line import/no-cycle
import { ModelsType } from './index'
import { Reservation } from './reservation'

export class Slot extends Model {
	id: number
	slotNumber: string
	type: SLOT_TYPE

	reservations: Reservation[]

	static associate(models: ModelsType) {
		Slot.hasMany(models.Reservation, { foreignKey: 'SlotId', as: 'reservations' })
	}
}

export default (sequelize: Sequelize) => {
	Slot.init(
		{
			// Model attributes are defined here
			slotNumber: {
				type: DataTypes.STRING,
				allowNull: false
			},
			type: {
				type: DataTypes.ENUM,
				values: SLOT_TYPES
			}
		},
		{
			sequelize,
			modelName: 'Slot'
		}
	)
	return Slot
}
