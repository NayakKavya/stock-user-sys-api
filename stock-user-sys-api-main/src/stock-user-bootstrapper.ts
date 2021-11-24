import { NestFactory } from '@nestjs/core';
import { ConfigService } from './infrastructure/configuration/config.service';
import { UserModule } from './routes/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule)
 // app.enableCors()
 console.log("port :",ConfigService.create().getPort())
  await app.listen(ConfigService.create().getPort())

}
bootstrap();
