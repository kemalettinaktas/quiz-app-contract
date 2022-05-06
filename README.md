# Near Quiz 
This is a simple near smart contract that allows its users to ask questions to other users and to earn points by answering the questions asked correctly.

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
 
 Then you will get an Account Id after deploying process. This is a contract account id to interact it.
 You should write 
 
  ` export CONTRACT= Contract_Account_ID `
 
