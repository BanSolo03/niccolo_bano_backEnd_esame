import { Module } from '@nestjs/common';
import { JobsController } from './jobs/jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://nikibano:Qu%40r%40nt%40cinque45!@dbcrypto.eoqbyfz.mongodb.net/DBEsame'), JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
