import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { supabase } from '../db';

const agentRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/api/agents', async (request, reply) => {
        const { name, email } = request.body as any;
        const { data, error } = await supabase.from('agents').insert([{ name, email }]).select();

        if (error) return reply.status(400).send(error);
        return reply.send(data);
    });

    fastify.get('/api/agents', async (request, reply) => {
        const { data, error } = await supabase.from('agents').select('*');
        if (error) return reply.status(400).send(error);
        return reply.send(data);
    });
};

export default agentRoutes;
