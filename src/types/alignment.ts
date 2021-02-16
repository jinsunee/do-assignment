export interface AssingmentItemType {
  key: string;
  title: string;
  date: string;
  onPressElement: () => void;
  status: AssignmentStatus;
}

export enum AssignmentStatus {
  DEFAULT = 'default',
  COMPLETED = '제출완료',
  NOT_YET = '미제출',
  LAST = '지난과제',
}

export interface AnswerType {
  assignmentUID: string;
  index: number;
  question: string;
  answer: string;
}

export interface StudentSubmitAnswerType extends AnswerType {
  studentAnswer: string;
}
