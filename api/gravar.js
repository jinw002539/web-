import { Client } from "pg";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Método não permitido');

    const { nome, idade } = req.body;

    // const client = new Client({
    //     host: "db.xrotdtixcursvltionue.supabase.co",
    //     user: "postgres",
    //     password: "palavrapassedabasededados",
    //     database: "postgres",
    //     port: 5432,
    //     ssl: { rejectUnauthorized: false }
    // });

    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        await client.query('INSERT INTO pessoas (nome, idade) VALUES ($1, $2)', [nome, idade]);
        res.send("Dados gravados com sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gravar");
    } finally {
        await client.end();
    }
}