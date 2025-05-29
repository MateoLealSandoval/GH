import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<
          'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql'
        >('DATABASE_TYPE')!,
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')!, 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Solo para desarrollo; no se recomienda en producción
        autoLoadEntities: true,
        options: {
          encrypt: false, // Desactiva SSL (útil en local con certificados autofirmados)
          trustServerCertificate: true, // Acepta el certificado autofirmado
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
