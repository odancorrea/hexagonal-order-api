import 'dotenv/config'
import 'reflect-metadata'
import dataSource from './adapter/driver/infra/dataSource'
import server from './adapter/driven/server/server'

const bootstrap = async () => {
    await dataSource.init()
    await server.init()
}

bootstrap()
