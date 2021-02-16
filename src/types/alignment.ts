export interface AssingmentItemType {
  key: string;
  title: string;
  description?: string;
  date?: Date;
  onPressElement: () => void;
  status: AssignmentStatus;
}

export enum AssignmentStatus {
  DEFAULT = 'default',
  COMPLETED = '제출완료',
  NOT_YET = '미제출',
  LAST = '지난과제',
}

export interface StudentAnswerType {
  assignmentUID: string;
  index: number;
  question: string;
  answer: string;
}

export interface AssignmentQuestion {
  index: number;
  question: string;
  answer: string;
}

// 채점 상태
export enum MarkStatus {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  NOT_YET = 'not yet',
}
