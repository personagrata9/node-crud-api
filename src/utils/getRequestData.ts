import { IncomingMessage } from 'http';

const getRequestData = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

export default getRequestData;
