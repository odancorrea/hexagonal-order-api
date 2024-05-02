import 'dotenv/config'
import 'reflect-metadata'
import dataSource from './adapter/driver/infra/dataSource'
import server from './adapter/driven/server/server'
import queue from './adapter/driver/queue/queue'

const bootstrap = async () => {
    queue.connect()
    await dataSource.init()
    await server.init()
}

bootstrap()
