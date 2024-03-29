import {StudentListItemType} from './user';

// 지우기
export interface AssingmentItemType {
  key: string;
  title: string;
  description?: string;
  date?: Date;
  onPressElement: () => void;
  status: AssignmentStatus;
}
// end of 지우기

export interface Assignment {
  assignmentUID: string;
  title: string;
  description?: string;
  expireDate: Date;
  limitTime: string;
  status: AssignmentStatus;
  submitTime?: Date;
}

export enum AssignmentStatus {
  DEFAULT = 'default',
  COMPLETED = '제출 완료',
  NOT_YET = '미제출',
  LAST = '지난과제',
}

export interface StudentSubmitStatus extends StudentListItemType {
  submitStatus: StudentSubmitStatusType;
  submitTime?: Date;
}

export enum StudentSubmitStatusType {
  COMPLETED = '제출 완료',
  NOT_YET = '미제출',
}

export interface StudentAnswerType {
  assignmentUID: string;
  index: number;
  question: string;
  answer: string;
}

export interface AssignmentQuestion {
  qustionUID: string;
  question: string;
  answer: string;
}

export interface SubmitAnswersType {
  questionUID: string;
  index: number;
  question: string;
  answer: string;
  submitValue: string;
  markStatus: MarkStatus;
}

// 채점 상태
export enum MarkStatus {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
}
