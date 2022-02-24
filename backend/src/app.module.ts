import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { isAuthenticated } from './app.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User, UserSchema } from './model/user.schema';
import { UserSeedCommand } from './seeds/user.seed';
import { ProductSeedCommand } from './seeds/product.seed';
import { ProductService } from './service/product.service';
import { Product, ProductSchema } from './model/product.schema';
import { DeliverySeedCommand } from './seeds/delivery.seed';
import { DeliveryService } from './service/delivery.service';
import { Delivery, DeliverySchema } from './model/delivery.schema';
import { HomeController } from './controller/home.controller';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Delivery.name, schema: DeliverySchema },
    ]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UserController, HomeController],
  providers: [
    AppService,
    UserSeedCommand,
    UserService,
    ProductSeedCommand,
    ProductService,
    DeliverySeedCommand,
    DeliveryService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET });
    //.forRoutes(VideoController);
  }
}
