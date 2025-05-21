import { Question } from './question';

export interface Exam {
    questions: Question[];
    titleform: string;
}