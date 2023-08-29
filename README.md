# shareit backend

Socket.IO, MongoDB/Mongoose

## Installation and set up  
### Database set up
*  Mongodb 7.0.0

* Install MongoDb by downloading Mongodb 7.0 communtiy server [here](https://www.mongodb.com/try/download/community)

  Or use Homebrew if you are on MacOS
  ```
  brew tap mongodb/brew
  ```
  ```
  brew update
  ```
  ```
  brew install mongodb-community@7.0
  ```

* Create a database called `shareit` through either [MongoDB Compass](https://www.mongodb.com/products/compass) or MongoDB shell  

  If you are using MongoDB shell
  
  Connect to a MongoDB deployment running on localhost with default port 27017
  ```
  mongosh
  ```
  Create database shareit
  ```
  use shareit
  ```

## Local Server set up
```
npm install
```

```
npm start
```

