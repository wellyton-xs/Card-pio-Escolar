import Fastify from 'fastify'
import view from '@fastify/view'
import ejs from 'ejs'
import { fileURLToPath } from "url";
import path from "path";
import fastifyStatic from '@fastify/static'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "src"),
    prefix: "/src/", // Define o prefixo de URL para acessar os arquivos estáticos
});

fastify.register(view, {
    engine: { ejs },
    root: path.join(__dirname, "views"), // Diretório das views
    viewExt: "ejs", // Extensão padrão dos arquivos de view
});

fastify.get("/", async function handler(request, reply) {
    return reply.view("index", { title: "home" }); // Retorne para garantir que a resposta seja enviada corretamente
});

fastify.get("/segunda-feira", async function handler(request, reply){
    return reply.view("segunda");
});

// Executa o servidor!
try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor rodando em http://localhost:3000");
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
