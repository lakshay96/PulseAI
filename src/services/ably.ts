import Ably from 'ably';
import { ABLY_API_KEY } from '../config/env';

const ably = new Ably.Realtime(ABLY_API_KEY);
const channel = ably.channels.get('ticket-updates');

export const publishUpdate = async (event: string, data: any) => {
    await channel.publish(event, data);
};
