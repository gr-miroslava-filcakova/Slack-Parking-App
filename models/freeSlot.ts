import { Model, Sequelize, DataTypes } from 'sequelize'
// eslint-disable-next-line import/no-cycle
import { ModelsType } from './index'
// eslint-disable-next-line import/no-cycle
import { User } from './user'
// eslint-disable-next-line import/no-cycle
import { Slot } from './slot'

export class FreeSlot extends Model {
	id: number
	date: Date
	// FK
	userID: string
	slotID: number
	user: User
	slot: Slot

	static associate(models: ModelsType) {
		FreeSlot.belongsTo(models.Slot, { foreignKey: 'slotID' })
		FreeSlot.belongsTo(models.User, { foreignKey: 'userID' })
	}
}

export default (sequelize: Sequelize) => {
	FreeSlot.init(
		{
			// Model attributes are defined here
			date: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'freeSlot'
		}
	)
	return FreeSlot
}
