import { Answer } from "./anwer";

export class Question {
    question: string;
    type: number;
    points : number;
    answers: Answer[];

    constructor(question: string , type : number, answers: Answer[], points: number) {
        this.points = points;
        this.question = question;
        this.answers = answers;
        this.type = type;       
    }
}