# Near Quiz 
This is a simple near smart contract that allows its users to ask questions to other users and to collect points by answering the questions asked correctly.

# Implementing the Project

First clone this repository on your local machine. It's recommended using Linux, if you are using Windows you can run on WSL.

# To install project dependencies
` yarn `

# Building the Contract
 
 You should build the contract code in order to run the application.
 
 ` yarn build:release `
 
 After build proccess, there will be a .wasm file in ./build/release path for deploying contract to blockchain
 
 # Deploying the Contract
 
 You should write 
 
  ` yarn deploy `
 
 # Interacting with the Contract
 
 Then you will get an Account Id after deploying process for examaple dev-15965265-5645. This is a contract account id to interact it.
 You should write 
 
  ` export CONTRACT= Contract_Account_ID `
 
### You must have a near wallet account (for ex. kemalettin.testnet) to add questions or answer questions via this contract. 
#### If you have one, write;

  ` export ACCOUNT= wallet_account `
  
# CONTRACT METHODS
This application contains following methods;

## newQuestion
You can add a question with this method. The method takes several parameters.
- qtext: takes a string for question text
- options: takes a string array for answer options
- answer: takes a string for giving right answer
- point: takes an integer for question's point value

Usage:

`near call $CONTRACT newQuestion '{"qtext":"your question text","options":["some","answer","options"], "answer":"some","point":50}' --accountId $ACCOUNT ` 

## seeQuestions
You can see questions with this method. The method takes a parameter and returns question info list
- count: takes an integer to specify how many quesitons you want to see

Usage:

`near view $CONTRACT seeQuestions '{"count":5}' `


## answerQuestionWithId

You can answer a question with this method. It takes two parameters

- qid: takes an integer, you should use seeQuestions method to see qid of questions, and select a question
- answer: takes a string to answer the selected question

Usage

`near call $CONTRACT answerQuestionWithId '{"qid":1111111654565 ,"answer":"write your answer"}' --accountId $ACCOUNT `

## seeScores

You can see other's scores with this method. It takes two parameter

- start: takes an integer, to provide starting number of scores from the list
- end:  takes an integer, to provide ending number of scores from the list

## getUsers

You can user list with this method. It takes two parameter

- start: takes an integer, to provide starting number of users from the list
- end:  takes an integer, to provide ending number of users from the list
