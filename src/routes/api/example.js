import { promises as fs } from 'fs';
import { resolve, join } from 'path';

async function get({ query }) {
  const dir = resolve(join('src', 'routes', '_examples'));
  const content = await fs.readFile(join(dir, query.get('file')), 'utf-8');
  return {
    headers: {
      'content-type': 'text/plain',
    },
    body: content.trim(),
  };
}

export { get };
