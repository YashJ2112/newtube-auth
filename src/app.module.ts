import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/newtube', {
      useNewUrlParser: true,
    }),
    ContentModule,
=======
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    // (process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
    AuthModule,
>>>>>>> 72bc1b81a6ccaab2c26bb350b42f048498eaf762
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
