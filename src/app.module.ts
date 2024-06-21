import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';
import { LogsModule } from './logs/logs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ErrorLogger } from './common/interceptor/error.interceptor';

@Module({
  imports: [
    LogsModule,
    CharactersModule,
    MongooseModule.forRoot('mongodb://localhost/gameofThrones'),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ErrorLogger,
    },
  ],
})
export class AppModule {}
