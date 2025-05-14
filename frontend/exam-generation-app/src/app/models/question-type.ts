export class QuestionType {
    type: string; // Type of question (e.g., singleChoice, multipleChoice)
    easy: number; // Number of easy questions
    medium: number; // Number of medium questions
    hard: number; // Number of hard questions
    total: number; // Total number of questions

    constructor(type: string, easy: number, medium: number, hard: number, total: number) {
        this.type = type;
        this.easy = easy;
        this.medium = medium;
        this.hard = hard;
        this.total = total;
    }
}