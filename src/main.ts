import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置跨域
  app.enableCors({
    origin: 'http://localhost:5173', // Vue开发服务器地址
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS后端API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3030);
  console.log('应用已启动: http://localhost:3030');
  console.log('API文档地址: http://localhost:3030/api');
}
bootstrap();
