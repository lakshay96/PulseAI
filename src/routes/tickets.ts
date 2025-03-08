import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { supabase } from '../db';
import { publishUpdate } from '../services/ably';

const ticketRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/api/tickets', async (request, reply) => {
        const { title, description, status, priority, assigned_to } = request.body as any;
        const { data, error } = await supabase
            .from('tickets')
            .insert([{ title, description, status, priority, assigned_to }])
            .select();

        if (error) return reply.status(400).send(error);
        await publishUpdate('ticket_created', data);
        return reply.send(data);
    });

    fastify.get('/api/tickets', async (request, reply) => {
        const { data, error } = await supabase.from('tickets').select('*');
        if (error) return reply.status(400).send(error);
        return reply.send(data);
    });

    fastify.get('/api/tickets/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { data, error } = await supabase.from('tickets').select('*').eq('id', id);
        if (error || !data.length) return reply.status(404).send({ message: 'Ticket not found' });
        return reply.send(data[0]);
    });

    fastify.patch('/api/tickets/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { status, priority, assigned_to } = request.body as any;

        const { data, error } = await supabase
            .from('tickets')
            .update({ status, priority, assigned_to })
            .eq('id', id)
            .select();

        if (error) return reply.status(400).send(error);
        await publishUpdate('ticket_updated', data);
        return reply.send(data);
    });

    fastify.delete('/api/tickets/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { error } = await supabase.from('tickets').delete().eq('id', id);
        if (error) return reply.status(400).send(error);
        await publishUpdate('ticket_deleted', { id });
        return reply.send({ message: 'Ticket deleted successfully' });
    });
};

export default ticketRoutes;
