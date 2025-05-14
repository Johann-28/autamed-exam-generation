import { Answer } from "./anwer";

export class Question {
    question: string;
    type: string;
    answers: Answer[];

    constructor(question: string , type : string, answers: Answer[]) {
        this.question = question;
        this.answers = answers;
        this.type = type;       
    }
}