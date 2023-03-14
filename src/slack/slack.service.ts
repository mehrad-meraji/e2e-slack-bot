import { Application } from 'express';
import { Injectable } from '@nestjs/common';
import { App, ExpressReceiver } from '@slack/bolt';
import { appHomeBuilder } from './app-home-blocks';
import { GithubService } from '../github/github.service';
import { BehaviorSubject, interval } from 'rxjs';

type WorkflowRun = {
  id: number;
  status: string;
  conclusion: string;
};
@Injectable()
export class SlackService {
  private workflowRuns$ = new BehaviorSubject<WorkflowRun[]>([]);
  private readonly boltApp: App;
  private readonly receiver: ExpressReceiver;

  constructor(private github: GithubService) {
    this.receiver = new ExpressReceiver({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      endpoints: '/',
    });

    this.boltApp = new App({
      // signingSecret: process.env.SLACK_SIGNING_SECRET,
      token: process.env.SLACK_BOT_TOKEN,
      appToken: process.env.SLACK_APP_TOKEN,
      socketMode: true,
      // receiver: this.receiver,
    });

    // this.boltApp.start();
    this.boltApp.action(
      'update_branch_hours',
      this.onUpdateBranchHours.bind(this),
    );
    interval(10000)
      .pipe()
      .subscribe(async () => {
        try {
          const runs: any = await this.github.listWorkflowRuns();
          const currentRuns = [];
          runs.data.workflow_runs.forEach((run: WorkflowRun) => {
            if (run.status !== 'completed') {
              currentRuns.push({
                id: run.id,
                status: run.status,
                conclusion: run.conclusion,
              });
            }
          });
          this.workflowRuns$.next(currentRuns);
        } catch (error) {
          console.log(error);
        }
      });
    this.boltApp.event('app_home_opened', this.onHomeOpened.bind(this));
    this.boltApp.event('app_mention', this.onAppMention.bind(this));
    this.boltApp.message('hello', this.onHello.bind(this));
  }

  public start() {
    this.boltApp.start();
  }

  public async onUpdateBranchHours({ event, body, client, logger, ack }) {
    await ack();
    try {
      const trigger = await this.github.triggerUpdateBranchesWorkflow();
      await client.views.publish({
        user_id: event.user,
        view: appHomeBuilder(this.workflowRuns$.getValue()),
      });
    } catch (error) {
      logger.error(error);
    }
  }

  public async onHello({ message, say }) {
    if ('user' in message) {
      await say(`Hey there <@${message.user}>!`);
    }
  }

  public async onAppMention({ event, client, logger }) {
    try {
      console.log(this);
      console.log(event);
    } catch (error) {
      logger.error(error);
    }
  }
  public use() {
    return this.boltApp;
  }

  private async onHomeOpened({ event, client, logger }) {
    try {
      // Call views.publish with the built-in client
      await client.views.publish({
        user_id: event.user,
        view: appHomeBuilder(this.workflowRuns$.getValue()),
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
