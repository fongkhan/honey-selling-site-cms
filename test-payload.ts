import { getPayload } from 'payload';
import config from './payload.config';

async function main() {
  console.log('Initializing payload...');
  const payloadInstance = await getPayload({ config });
  console.log('Payload initialized!');
  const users = await payloadInstance.find({
    collection: 'users',
  });
  console.log('Users found:', users);
  process.exit(0);
}

main().catch(err => {
  console.error('Error during payload initialization/query:', err);
  process.exit(1);
});
