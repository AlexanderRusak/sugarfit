import { DB } from './db';

export async function bootstrap() {
  try {
    await DB.init();
    console.log('Data base started');
  } catch (err) {
    console.log(err);
  }

}