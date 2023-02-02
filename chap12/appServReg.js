import { createServer } from "http";
import consul from 'consul'
import portfinder from 'portfinder'
import { nanoid } from 'nanoid'

const serviceType = process.argv[2]
const { pid } = process

async function main() {
    const consulClient = consul()

    const port = await portfinder.getPortPromise()
    const address = process.env.ADDRESS || 'localhost'
    const serviceId = nanoid()

    function registerService() {
      consulClient.agent.service.register({
        id: serviceId,
        name: serviceType,
        address,
        port,
        tags: [serviceType]
      }, () => {
        console.log(`${serviceType} registered successfully`)
      })
    }
}