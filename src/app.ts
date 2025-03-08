import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import { setupDatabase } from './db/index';
import ticketRoutes from './routes/tickets';
import agentRoutes from './routes/agents';

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });

// Database Setup
setupDatabase().catch(console.error);

// Register Routes
fastify.register(ticketRoutes);
fastify.register(agentRoutes);

// Add a default route
fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the Ticketing API' };
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
