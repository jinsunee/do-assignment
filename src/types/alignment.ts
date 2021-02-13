export interface AssingmentItemType {
  key: string;
  title: string;
  date: string;
  onPressElement: () => void;
  status: AssignmentStatus;
}

export enum AssignmentStatus {
  DEFAULT = 'default',
  SUBMIT = '제출하기',
  COMPLETE = '제출완료',
  LAST = '지난과제',
}
