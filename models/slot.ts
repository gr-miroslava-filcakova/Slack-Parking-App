import { Model, Sequelize, DataTypes } from 'sequelize'
import { SLOT_TYPE, SLOT_TYPES } from '../utilities/enums'
// eslint-disable-next-line import/no-cycle
import { ModelsType } from './index'
// eslint-disable-next-line import/no-cycle
import { FreeSlot } from './freeSlot'
// eslint-disable-next-line import/no-cycle
import { User } from './user'

export class Slot extends Model {
	id: number
	slotNumber: string
	type: SLOT_TYPE

	freeSlots: FreeSlot[]
	user: User
	userID: number

	static associate(models: ModelsType) {
		Slot.hasMany(models.FreeSlot, { foreignKey: 'slotID' })
		Slot.belongsTo(models.User, { as: 'user', foreignKey: 'userID' })
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
			modelName: 'slots'
		}
	)
	return Slot
}
