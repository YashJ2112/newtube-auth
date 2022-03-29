import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
