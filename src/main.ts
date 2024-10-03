import { SeedService } from './seed/seed.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pipes are used to validate the apis globally this enforce DTO validation on routes.
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
    }
    // these configuration is used to validate the swagger apis.
    const config = new DocumentBuilder() //1
      .setTitle("Spotify Clone")
      .setDescription("The Spotify Clone Api documentation")
      .setVersion("1.0").addBearerAuth(
        // Enable Bearer Auth here
        {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
        },
        "JWT-auth"
        )
      .build();
      const document = SwaggerModule.createDocument(app, config); //2
      SwaggerModule.setup("api", app, document); //3
      console.log({PORT:configService.get<number>("PORT")});
  await app.listen(configService.get<number>("PORT"));

}
bootstrap();
