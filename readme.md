# Title

Todo app

# Local Setup

To preview the website locally:<br>

<strong>Prerequisites</strong><br>

  <a href="https://nodejs.org/en/download/">NodeJS</a><br>
  <a href="https://www.mongodb.com/download-center#community">MongoDB Community Server</a><br>
  <a href="https://git-scm.com/downloads"> Git </a><br>

<strong>Clone repo</strong><br>

```
  git clone https://github.com/quickank1t/todo-app.git
```

<strong>Start the Mongodb server in CMD</strong>

<i>for windows: Open CMD and navigate to path where mongodb is installed => bin folder and execute the commond below</i>
 ```
  mongod.exe --dbpath /Users/USERNAME/mongo-data
 ```  

<i>for IOS and Linux: navigate to path where mongodb is installed => bin folder</i><br>
 ```
 ./mongod --dbpath ~/mongo-data
 ```
 <i>Note: --dbpath specifies where the data is stored</i>

 <strong>Install dependencies</strong>
  ```
  npm i
  ```
<strong>Run the Server</strong>
  ```
  node .\server\server.js
  ```

# Packages explored

API : express, body-parser

Test : supertest, expect, mocha and nodemon

Database : mongodb, mongoose

# deployment

Used heroku for deployment
```
git push heroku master
```
