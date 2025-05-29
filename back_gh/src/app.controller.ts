import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  getPing(): string {
    return 'Pong';
  }

  // Endpoint para verificar que la API esté funcionando
  @Get('health')
  getHealth(): object {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'API is running correctly',
    };
  }
}
