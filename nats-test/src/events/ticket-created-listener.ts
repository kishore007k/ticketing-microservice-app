import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

export class TicketCreatedListener extends Listener {
	subject = "ticket:created";
	queueGroupName = "order-service";

	onMessage(data: any, msg: Message) {
		console.log(`Processing event #${msg.getSequence()} ${data}`);
		msg.ack();
	}
}
