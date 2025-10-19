import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!); //환경변수에 넣었던 connection string을 이용해 neon 데이터베이스를 연결해주는 코드
const db = drizzle(sql, { schema }); //첫번째 라인에서 만들어진 neon 클라이언트 객체를 drizzle 함수에 넣어서 drizzle orm 인스턴스를 만들어주는 코드

export default db;
