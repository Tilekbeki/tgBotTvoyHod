import { Module } from '@nestjs/common';
import { SaveFilesController } from './save-files.controller';
import { SaveFilesService } from './save-files.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [SaveFilesController],
  providers: [
    SaveFilesService,
    // {
    //   provide: APP_INTERCEPTOR,// This line might not be needed depending on your configuration
    //   // options: {
    //   //   origin: true, // Allow all domains
    //   //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   //   allowedHeaders: 'Content-Type, Accept',
    //   //   credentials: true,
    //   // },
    // },
  ],
})
export class SaveFilesModule {}