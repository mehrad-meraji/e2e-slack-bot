import { Octokit, App } from 'octokit';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  octokit: Octokit;
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_ACTIONS_TOKEN,
    });
  }

  async triggerUpdateBranchesWorkflow() {
    return this.octokit.request(
      'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
      {
        owner: 'tpl-eservices',
        repo: 'Account',
        workflow_id: 'update_branches.yml',
        ref: 'master',
        inputs: {},
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
  }
  async listWorkflowRuns() {
    return this.octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
      owner: 'tpl-eservices',
      repo: 'Account',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }
}
