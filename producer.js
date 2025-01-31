const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})




async function init() {
    const producer = kafka.producer();
    console.log("Connecting producer");
    await producer.connect();
    console.log("Producer connected successfully");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async(line)=>{
        const [riderName, location] = line.split(" ");
        // console.log("location ---------------------", location)
        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition:location.toLowerCase()==="north"? 0 : 1,
                    key: "location-update", 
                    value: JSON.stringify({
                        name: riderName,
                        location: location
                    })
                }
            ]
        })
    }).on("close", async()=>{
        // console.log(first)
        await producer.disconnect()
    })


}
init()