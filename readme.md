# Authenticate a Node ES6 API with JSON Web Tokens

### Reference

https://scotch.io/tutorials/authenticate-a-node-es6-api-with-json-web-tokens

### Folder Structure

### Dependencies

1. body-parser: This will add all the information we pass to the API to the request.body object.
2. bcrypt: We'll use this to hash our passwords before we save them our database.
3. dotenv: We'll use this to load all the environment variables we keep secret in our .env file.
4. jsonwebtoken: This will be used to sign and verify JSON web tokens.
5. mongoose: We'll use this to interface with our mongo database.

### Development Dependencies

1. morgan: This will log all the requests we make to the console whilst in our development environment.
2. nodemon: We'll use this to restart our server automatically whenever we make changes to our files.
3. cross-env: This will make all our bash commands compatible with machines running windows.
