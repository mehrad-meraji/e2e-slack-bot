const updateBranchHoursBlocks: any = {
  type: 'actions',
  elements: [
    {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Update Branch Hours',
        emoji: true,
      },
      style: 'primary',
      value: 'update_branch_hours',
      action_id: 'update_branch_hours',
    },
  ],
};

const appHomeBlocks: any = {
  type: 'home',
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'DX Worker, works for you!',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'Update branch hours and deploy from Your Account repo.',
        emoji: true,
      },
    },
  ],
};

export const appHomeBuilder = (runs) => {
  if (runs.length > 0) {
    const inProgress = [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'A deployment is in progress!',
          emoji: true,
        },
      },
    ];

    const runsBlocks = runs.map((run) => {
      return {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url:
              'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
            alt_text: 'cute cat',
          },
          {
            type: 'mrkdwn',
            text: `*Status* is ${run.status}`,
          },
          {
            type: 'plain_text',
            text: `Run ID: ${run.id} ${
              run.conclusion ? 'Conclusion: ' + run.conclusion : ''
            }`,
            emoji: true,
          },
        ],
      };
    });
    return {
      ...appHomeBlocks,
      blocks: [...appHomeBlocks.blocks, ...inProgress, ...runsBlocks],
    };
  }
  return {
    ...appHomeBlocks,
    blocks: [...appHomeBlocks.blocks, updateBranchHoursBlocks],
  };
};

export const appHomeBlocksWidthUpdateBranchHoursInProgress = {
  ...appHomeBlocks,
  blocks: [...appHomeBlocks.blocks],
};
export default {
  ...appHomeBlocks,
  blocks: [...appHomeBlocks.blocks, updateBranchHoursBlocks],
};
