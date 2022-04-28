import { Model, Sequelize, DataTypes } from 'sequelize'
// eslint-disable-next-line import/no-cycle
import { ModelsType } from './index'
import { User } from './user'

export class Reservation extends Model {
	id: number
	date: Date
	// FK
	UserId: string
	SlotId: number
	user: User

	static associate(models: ModelsType) {
		Reservation.belongsTo(models.Slot)
		Reservation.belongsTo(models.User)
	}
}

export default (sequelize: Sequelize) => {
	Reservation.init(
		{
			// Model attributes are defined here
			date: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Reservation'
		}
	)
	return Reservation
}
