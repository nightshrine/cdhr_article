import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings } from './Bindings';
import { getPrismaClient } from './getPrismaClient';

const app = new Hono<{ Bindings: Bindings }>();

app.use(
    '/*',
    cors({
        origin: '*',
    })
);

app.get('/todos', async (c) => {
    const prisma = await getPrismaClient(c.env.DB);

    const todos = await prisma.todo.findMany();
    return c.json(todos);
});

app.post('/todos', async (c) => {
    const { name, done } = await c.req.json();

    const prisma = await getPrismaClient(c.env.DB);

    const todo = await prisma.todo.create({
        data: {
            name,
            done,
        },
    });

    return c.json(todo);
});

app.put('/todos/:id/toggle', async (c) => {
    const prisma = await getPrismaClient(c.env.DB);

    const todo = await prisma.todo.findUnique({
        where: { id: parseInt(c.req.param('id')) },
    });

    await prisma.todo.update({
        where: { id: parseInt(c.req.param('id')) },
        data: {
            done: todo?.done ? false : true,
        },
    });

    return c.json(todo);
});

app.delete('/todos/:id', async (c) => {
    const prisma = await getPrismaClient(c.env.DB);

    await prisma.todo.delete({
        where: { id: parseInt(c.req.param('id')) },
    });

    return c.json({ message: 'Todo deleted' });
});

export default app;
