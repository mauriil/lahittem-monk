# Mongo-Assignment - Lahitte Mauricio #

Project for MediaMonks made by an enthusiastic coder wishing to be part of the monks 🧘‍♂️

## Set-Up & Running 🔧 ##

Instructions to have everything you need to put this deployment into operation.

### Prerequisites 📋 ###

* NodeJS installed.
* A web browser (Mozilla, Chrome, Safari, etc).
* Postman (Just if you like to see prettier the API responses).

### Install 🛠️ ###

Once you have cloned or downloaded a .zip of the project in a folder of your like run:
```
npm install
```
just to have all the dependence packages necessaries to run the server.

### Run 📦 ###

After the install process you just have to run:
```
npm start
```
and the server will bound with the default configuration.

In this point, you will notice that a json file _'data/keyvalues.json'_ will be created for store the key values pair sended by the web socket client. And a log file _'logs/server.log'_ for the server logs.

## Misc configuration ⚙️ ##

This project has a enviroment config file maded thanks to the [config library (npm) ](https://www.npmjs.com/package/config) that you can found in _'config/default.json'_. 

You can modify the values in it, or just make your own configs in another file inside the _'config'_ folder.
Notice you have to change the enviroment before initializate it:
- set NODE_ENV=development (Linux and Mac)
- $env:NODE_ENV="development" (Windows)

## Running tests 🔩 ##

To run the automated test you can just run:
```
npm test
```
and the results will be displayed at the console.

## Author ✒️##

* [Lahite, Mauricio Eduardo](https://www.linkedin.com/in/mauricio-lahitte/)