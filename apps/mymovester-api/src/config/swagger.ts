import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

export function swaggerBuilder(app) {
  const config = new DocumentBuilder()
    .setTitle('mymovester')
    .setDescription('마이뭅스터 프로덕트 API')
    .setExternalDoc('서비스 링크', 'http://movester.kr/stretchings')
    .setVersion('beta')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config, {
    extraModels: [
    ],
  });

  SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);
}