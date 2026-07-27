import { ServerResponse } from 'node:http';

export function sendJson(res: ServerResponse, statusCode: number, data: any): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export function sendError(res: ServerResponse, statusCode: number, message: string, details: any = null): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ mensaje: message, error: details }));
}