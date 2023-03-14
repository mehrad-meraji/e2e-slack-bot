import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SlackService } from './slack/slack.service';
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  controllers: [GithubController],
  providers: [SlackService, GithubService],
})
export class AppModule {}
