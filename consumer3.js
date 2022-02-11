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

	const queue = "clientsQ";
	const enterprise = "Facebook";

	try {
		const conn = await amqp.connect(rabbitSettings);
		console.log("Connection Created...");

		const channel = await conn.createChannel()
		console.log("Channel Created...");

		const res = await channel.assertQueue(queue);
		console.log("Queue Created...");

		console.log("Waiting for messages from" + enterprise);
		channel.consume(queue, message => {
			let employee = JSON.parse(message.content.toString());
			console.log("Received employee:" + employee.name );
			console.log(employee);

			if (employee.enterprise == enterprise) {
				channel.ack(message);
				console.log("Deleted message from queue...\n");
			}
			else {
				console.log("That message is not for me I'll not delete it...");
			}
		});

	}
	catch(err) {
		console.log(err);
	}
}