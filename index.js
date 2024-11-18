import http from 'http';
import { logError } from "./error-logger.js";

const server = http.createServer((req, res) => {
    try {
        if (req.url === '/throw-error') {
            throw new Error('Test error')
        }
        
        if (!req.headers.authorization) {
            res.writeHead(401, {'Content-Type': 'text/plain'});
            res.end('Unauthorized');
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Authorization header received');
        }

        if (req.method === 'PUT') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('PUT response');
        } else if (req.method === 'DELETE') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('DELETE response');
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('This method is not allowed');
        }
    } catch (err) {
        logError(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});