import { Sequelize, Model, DataTypes } from 'sequelize'
// eslint-disable-next-line import/no-cycle
import { ModelsType } from './index'

export class User extends Model {
	id: string
	slackOrganizationID: string
	slackWorkspaceID: string
	slackUsername: string

	static associate(models: ModelsType) {
		User.hasMany(models.Reservation, { foreignKey: 'UserId' })
	}
}

export default (sequelize: Sequelize) => {
	User.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.STRING,
				allowNull: false
			},
			slackOrganizationID: {
				type: DataTypes.STRING
			},
			slackWorkspaceID: {
				type: DataTypes.STRING,
				allowNull: false
			},
			slackUsername: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'User'
		}
	)
	return User
}
