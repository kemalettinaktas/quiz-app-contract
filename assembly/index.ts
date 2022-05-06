// The entry file of your WebAssembly module.
import { context, MapEntry, PersistentUnorderedMap } from "near-sdk-as";
import { Question, questions } from "./model";
import { Person } from "./model";

export function newQuestion(qtext:string,options:string[],answer:string,point:i32=10):Question{
  return Question.addQuestion(qtext,options,answer,point);
}

export function seeQuestions(count:i32):Question[] {
  return Question.getManyQuestions(count);
}

export function answerQuestionWithId(qid:u32,yourAnswer:string):Question{
  const owner= questions.getSome(qid).creator.id;
  const status= questions.getSome(qid).isAnswered;
  assert(status!=true, "This question is already answered"); 
  assert(context.sender!=owner,"You are not allowed to answer yourself");
  return Question.checkAnswer(qid,yourAnswer);
}
export function seeScores(start:u16,end:u16):MapEntry<string,i32>[]{
  return Person.getScores(start,end);
}

export function seeUsers(start:u16,end:u16):MapEntry<string,Person>[]   {
  return Person.getUsers(start,end);
}