const { Kafka } = require('kafkajs')

exports.kafka = new Kafka({
    clientId:"my-app",
    brokers:["172.23.160.1:9092"]
})