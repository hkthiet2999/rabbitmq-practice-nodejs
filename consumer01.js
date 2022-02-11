const amqp = require("amqplib");

const rabbitSettings = {
	protocol: 'amqp',
	hostname: 'localhost',
	port: 5672,
	username: 'guest',
	password: 'guest',
	vhost: '/',
	authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
};

connect();

async function connect() {

	const queue = "socialNetworkQ";
	const enterprise = "Youtube";

	try {
		const conn = await amqp.connect(rabbitSettings);
		console.log("Connection Created...");

		const channel = await conn.createChannel()
		console.log("Channel Created...");

		const res = await channel.assertQueue(queue);
		
		console.log("================");
		console.log("socialNetworkQ Queue Created...");

		console.log("================");
		console.log("Waiting for messages from: " + enterprise);


		channel.consume(queue, message => {

			let employee = JSON.parse(message.content.toString());

			
			console.log("================");
			console.log("Received employee: " + employee.name);

			// console.log(employee);

			if (employee.enterprise == enterprise) {

				channel.ack(message);
				
				console.log("I got the message from queue: " + employee.msg);
			}
			else {
				console.log("That message is not for me");
			}
		});

	}
	catch(err) {
		console.log(err);

	}
}