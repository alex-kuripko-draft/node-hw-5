import { appendFile } from 'fs';

export function logError(err) {
    const errorMessage = `[${new Date().toISOString()}] ${err.message}\n`;
    appendFile('errors.log', errorMessage, (fsErr) => {
        if (fsErr) {
            console.error('Error writing into the log file:', fsErr);
        }
    });
}