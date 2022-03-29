import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './schemas/content.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Upload', schema: ContentSchema }]),
  ],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/content/upload' },
        { method: RequestMethod.PUT, path: '/content/edit' },
        { method: RequestMethod.DELETE, path: '/content/delete' },
      );
  }
}
