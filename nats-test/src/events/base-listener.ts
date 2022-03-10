import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
	abstract subject: string;
	abstract queueGroupName: string;
	abstract onMessage(data: any, msg: Message): void;
	private client: Stan;
	protected ackWait = 5 * 1000;

	constructor(client: Stan) {
		this.client = client;
	}

	subscriptionOptions() {
		return this.client
			.subscriptionOptions()
			.setDeliverAllAvailable()
			.setManualAckMode(true)
			.setAckWait(this.ackWait)
			.setDurableName(this.queueGroupName);
	}

	listen() {
		const subscription = this.client.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		);

		subscription.on("message", (msg: Message) => {
			console.log(`Received message #${msg.getSequence()}`);

			const parsedData = this.parseMessage(msg);

			this.onMessage(parsedData, msg);

			setTimeout(() => {
				msg.ack();
			}, this.ackWait);
		});
	}

	parseMessage(msg: Message) {
		const data = msg.getData();

		if (typeof data === "string") {
			return JSON.parse(data);
		}

		return JSON.parse(data.toString("utf8"));
	}
}
