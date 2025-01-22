import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', //사용할 데이터베이스 종류
  schema: './db/schema.ts', //테이블을 선언한 스키마 파일의 경로를 넣어주면 됨됨
  out: './drizzle', //dirzzle kit 명령어를 통해 현재 스키마를 기반으로 마이그레이션 파일을 생성하게 되는데 그 파일들을 위치시킬 폴더
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
