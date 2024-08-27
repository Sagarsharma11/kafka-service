const {kafka} = require("./client")

async function init(){
    const admin = kafka.admin();
    await admin.connect();
    console.log("Admin connecting successfully ...");

    console.log("Creating Topic [rider-updates] ")
    await admin.createTopics({
        topics:[{
            topic:"rider-updates",
            numPartitions:2
        }]
    })
    console.log("Topic created Successfully Topic[rider-updates]")
    await admin.disconnect();
    console.log("Admin disconnected")
}

init()