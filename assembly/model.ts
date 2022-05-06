import { context, PersistentUnorderedMap, math, u128, PersistentSet, MapEntry } from "near-sdk-as";

export const questions = new PersistentUnorderedMap<u64, Question>("qs");
export const people = new PersistentUnorderedMap<string, Person>("p");
export const scoreTable = new PersistentUnorderedMap<string, i32>("st");

@nearBindgen
export class Person {
    id: string;
    totalScore: i32;
    answeredQuestions: PersistentSet<Question>;
    createdQuestions: PersistentSet<Question>;
    trueAnswerCount: u32;
    falseAnswerCount: u32;
    createdQuestionCount: u32;
    constructor() {
        this.id = context.sender;
    }
    static getScores(start:u16,end:u16):MapEntry<string,i32>[]{
        return scoreTable.entries(start,end);
    }
    static getUsers(start:u16,end:u16):MapEntry<string,Person>[]{
        return people.entries(start,end);
    }
}

@nearBindgen
export class Question {
    qid: u32;
    question: string;
    options: string[];
    trueOption: string;
    isAnswered: bool;
    point: i32;
    solver: Person;
    creator: Person;

    constructor(_quesiton: string, _options: string[], _trueOption: string, _point: i32) {
        this.qid = math.hash32<string>(context.blockTimestamp.toString());
        this.question = _quesiton;
        this.options = _options;
        this.trueOption = _trueOption;
        this.point = _point;
        this.creator = new Person();
    }

    static addQuestion(qtext: string, options: string[], answer: string, point: i32): Question {
        const question = new Question(qtext, options, math.hash(answer).toString(), point);
        const who= new Person();
        who.createdQuestionCount++;
        who.createdQuestions.add(question);

        questions.set(question.qid, question);
        people.set(who.id,who);
        return question;
    }

    static getManyQuestions(limit: i32): Question[] {
        return questions.values(0, limit);
    }

    static checkAnswer(qid: u32, userAnswer: string): Question {
        const selectedQuestion = questions.getSome(qid);
        const who = new Person();
    

        if (selectedQuestion.trueOption == math.hash(userAnswer).toString()) {
            selectedQuestion.isAnswered = true;
            selectedQuestion.solver = who;
            who.trueAnswerCount++;
            who.totalScore += selectedQuestion.point;
            people.set(who.id, who);
            questions.set(qid, selectedQuestion) // if the question can be answered then remove from active questions, and update
            scoreTable.set(who.id,who.totalScore);
            return selectedQuestion;
        }
        else {
            who.falseAnswerCount++;
            who.totalScore -= selectedQuestion.point;
            selectedQuestion.point *=2;// if the question can not be answered then point will be doubled
            people.set(who.id, who);
            questions.set(qid, selectedQuestion); //update the question
            scoreTable.set(who.id,who.totalScore);
            return selectedQuestion;
        }

    }



  
}