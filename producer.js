const amqp = require("amqplib");

const rabbitSettings = {
	protocol: 'amqp',
	hostname: 'localhost',
	port: 5672,
	username: 'kienthiet',
	password: '123456',
	vhost: '/',
	authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
};

connect();

async function connect() {

	const queue = "socialNetworkQ";

    const queue2 =  "clientsQ"

	const msgs = [
		{ "name": "utuber", "enterprise": "Youtube", "msg": "This is message from Youtube" },

		{ "name": "facebooker01", "enterprise": "Facebook", "msg": "Hi all Facebooker" },

		{ "name": "userYT", "enterprise": "Youtube", "msg": "Hi, Youtuber" },

		{ "name": "userFB1", "enterprise": "Facebook", "msg": "Hello Facebook"},

	];

	try {
		const conn = await amqp.connect(rabbitSettings);
		console.log("Connection Created...");

		const channel = await conn.createChannel()
		console.log("Channel Created...");

        console.log("================");
		const res = await channel.assertQueue(queue);
		console.log("socialNetworkQ Queue Created...");

		for (let msg in msgs) {
			await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
			console.log("Message sent to queue: " + queue);
		}

        // const res2 = await channel.assertQueue(queue2);
        // console.log("================");
		// console.log("clientsQ Queue Created...");

		// for (let msg in msgs) {
		// 	await channel.sendToQueue(queue2, Buffer.from(JSON.stringify(msgs[msg])));
		// 	console.log("Message sent to queue: " + queue2 );
		// }
	}
	catch(err) {
		console.log(err);
	}
}
