import { Sequelize } from 'sequelize-typescript'
import env from '../../../env'
import { ISequelizeORM } from '../../data/protocols/utils/sequelize'

export class SequelizeORM implements ISequelizeORM {
  private static instance: SequelizeORM

  public client: Sequelize

  private constructor() { }

  public static getInstance(): SequelizeORM {
    if (!SequelizeORM.instance) {
      SequelizeORM.instance = new SequelizeORM()
      SequelizeORM.instance.client = new Sequelize({
        database: env.database.NAME,
        dialect: 'postgres',
        username: env.database.USERNAME,
        password: env.database.PASSWORD,
        host: env.database.HOST,
        port: parseInt(env.database.PORT),
        models: [__dirname + '/../database/entities'],
        repositoryMode: true
      })
    }
    return SequelizeORM.instance
  }

  public async testConnection(): Promise<void> {
    if (!SequelizeORM.instance) {
      await SequelizeORM.getInstance()
    }
    try {
      await SequelizeORM.instance.client.authenticate();
      console.log('[SequelizeORM][testConnection] Connection has been established successfully.')
    } catch (error) {
      console.error('[SequelizeORM][testConnection] Unable to connect to the database:', error)
    }
  }

  public async getClient(): Promise<Sequelize> {
    const instance = SequelizeORM.getInstance()
    return instance.client
  }
}
