import cx from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import timeago from 'timeago.js';

import { settingsStore } from '../../../../store';
import { StatusBadge } from './StatusBadge';

export interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    description: string;
    created: string;
    updated: string;
    issuetype: {
      name: string;
      iconUrl: string;
    };
    project: {
      name: string;
      key: string;
      avatarUrls: {
        '48x48': string;
      };
    };
    priority: {
      iconUrl: string;
      name: string;
    };
    assignee: {
      displayName: string;
      emailAddress: string;
      avatarUrls: {
        '48x48': string;
      };
    };
    status: {
      name: string;
      statusCategory: {
        colorName: string;
      };
    };
  };
}

interface IProps {
  data: JiraIssue;
  isNew: boolean;
}

export const IssueCard = observer(({ data: issue, isNew }: IProps) => {
  // The API doesn't seem to return the URL to the actual issue on the web
  // interface, so we have to resort to a hack to generate it. It seems icons
  // are hosted on the same domain as the web interface. This is an assumption
  // that works in my use case, but that could fail in other cases. Feel free
  // to suggest a change if you ever encounter an issue with this.
  const origin = new URL(issue.fields.issuetype.iconUrl).origin;
  const url = `${origin}/browse/${issue.key}`;

  const linkStyle = settingsStore.isDark
    ? 'text-blue-400'
    : 'text-blue-500 hover:text-blue-600';

  return (
    <div
      className={cx(
        'p-6 flex border-l-4',
        isNew ? 'border-blue-500' : 'border-transparent'
      )}
    >
      <div className="flex items-center justify-center flex-shrink-0 pr-4">
        <div
          className={cx(
            'w-12 h-12 rounded-full overflow-hidden',
            settingsStore.isDark ? 'bg-gray-700' : 'bg-gray-400'
          )}
        >
          {issue.fields.assignee && (
            <img src={issue.fields.assignee.avatarUrls['48x48']} />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex-1 flex items-center mb-1 min-w-0">
            <img src={issue.fields.issuetype.iconUrl} className="mr-1 mb-1" />
            <span className={cx('truncate pb-1 min-w-0', linkStyle)}>
              <a
                className={cx('text-lg hover:underline', linkStyle)}
                href={url}
                title={issue.fields.summary}
              >
                {issue.fields.summary}
              </a>
            </span>
            <StatusBadge issue={issue} />
          </div>
        </div>
        <div
          className={cx(
            'text-xs',
            settingsStore.isDark ? 'text-gray-500' : 'text-gray-700'
          )}
        >
          {issue.key} opened {timeago().format(issue.fields.created)}
        </div>
      </div>
    </div>
  );
});
