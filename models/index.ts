import fs from 'fs'
import { Sequelize } from 'sequelize'
import { filter, forEach } from 'lodash'

import defineReservation from './reservation'
import defineSlot from './slot'
import defineUser from './user'

const sequelize = new Sequelize(process.env.DB_URI)
sequelize
	.authenticate()
	.then(() => console.log(`Database connection has been established successfully`))
	.catch((err) => console.log(`Unable to connect to the database: ${err}`))

const modelsBuilder = (instance: Sequelize) => ({
	Reservation: defineReservation(instance),
	Slot: defineSlot(instance),
	User: defineUser(instance)
})

const buildModels = () => {
	const models = modelsBuilder(sequelize)

	// get all models
	const modelsEntities = fs.readdirSync(__dirname, { withFileTypes: true })
	const modelsFiles = filter(modelsEntities, (modelsEntity) => modelsEntity.isFile())

	// check if every model is imported (-2 because index.ts and init.ts can not be counted)
	if (Object.keys(models).length !== modelsFiles.length - 1) {
		throw new Error('You probably forgot import database model!')
	}

	forEach(models, (model: any) => {
		if (model.associate) {
			model.associate(models)
		}
	})
	return models
}

const models = buildModels()
type ModelsType = typeof models

export { models }
export type { ModelsType }

export default sequelize
