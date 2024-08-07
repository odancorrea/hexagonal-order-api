import amqp from 'amqplib/callback_api'
import IOrderQueue from '../../../core/domain/repositories/iOrderQueue'
import orderController from '../../driven/controller/orderController'

class Queue implements IOrderQueue {
    channel: amqp.Channel | undefined

    async connect () {
        amqp.connect(process.env.QUEUE_URI || 'amqp://localhost:5672', (error0, connection) => {
            if (error0) throw error0
            connection.createChannel((error1, channel) => {
                if (error1) throw error1
                this.channel = channel
                channel.assertQueue(process.env.PENDING_PAYMENT || 'pagamento_pendente', { durable: false })
                channel.assertQueue(process.env.DISAPPROVED_PAYMENT || 'pagamento_reprovado', { durable: false })
                channel.assertQueue(process.env.ERROR_ORDER || 'pedido_erro', { durable: false })
                channel.assertQueue(process.env.CONFIRMED_ORDER || 'pedido_confirmado', { durable: false })
                
                channel.consume(process.env.DISAPPROVED_PAYMENT || 'pagamento_reprovado', orderController.cancel, { noAck: true})
                channel.consume(process.env.CONFIRMED_ORDER || 'pedido_confirmado', orderController.confirm, { noAck: true})
                channel.consume(process.env.ERROR_ORDER || 'pedido_erro', orderController.cancel, { noAck: true})
            })
        })
    }

    async sendToQueue (message: string, queue: string) {
        this.channel?.sendToQueue(queue, Buffer.from(message))
    }
}

export default new Queue()