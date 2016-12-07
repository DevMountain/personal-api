<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

Personal API
============

## Objective
Utilize Node.js and Express to create a simple REST API

You're going to build a personal API for your own data. Although the idea might seem silly, the point of the project is to get you used to using Express to return data in an API.

#### Step 1: Basic Setup
1. Clone this project
2. Create an `index.js` file
3. Run `npm init` to to create our `package.json`.
4. Install the packages we'll need — express and body-parser
  * TIP: to install multiple packages use:  
    `npm install --save express body-parser`
5. Require express and body-parser
6. Initialize express as `app`
7. Invoke body-parser's json method within an `app.use()`
8. Call the `listen` method on our `app` variable

Finally, go to each of the model files provided for you in this project. Fill out each set of objects with your favorite books or movies.

#### Step 2: Creating controllers
In yesterday's projects our `index.js` file was becoming cluttered. One of the best ways to start splitting up our code is to create controllers. These controller files will house the functions for each of our endpoints.

Create two controller files:
* `controllers/books_controller.js`
* `controllers/movies_controller.js`

Each controller will need to have `module.exports = {}`.  
Now, instead of writing functions for each endpoint in `index.js`, we can write those function in the controllers.

Recall the 5 main Restful methods discussed in class. We won't always need each of these methods in our controllers, but you can use the below as a starting point reference!

```javascript
module.exports = {
  index: function(req, res, next) {
    // send back all objects
  },
  show: function(req, res, next) {
    // send back one object
  },
  create: function(req, res, next) {
    // add another object
  },
  update: function(req, res, next) {
    // change one existing object
  },
  destroy: function(req, res, next) {
    // remove one existing object
  }
}
```

To further explain, this creates an object which we will then pull into our `index.js`. This will give us access to the methods we create inside that object. Let's go to `index.js` and require both of our controllers. Since these are our own files, we `require` them with a file path.

```javascript
var booksController = require('./controllers/books_controller');
var moviesController = require('./controllers/movies_controller');
```

Now, when we start creating our endpoints, we can access any of the methods in our controller using the controller variables and the method names, eg. `booksController.index`

Back to our controller files.
Each controller will need to access the respective data in the model files. Use the require `require` function in each controller to assign the model data to a variable. Remember that we have to use 2 dots `../` for this file path since we are now inside the controllers folder.

```javascript
var books = require('../models/books');
```

#### Step 3: Create Read-Only Endpoints
These endpoints:
* will return data from one of the models (see below)
* should only be accessible with a GET request (read-only)
* will call functions from your controller  
  eg. `app.get('/books', booksController.index)`

#### `GET /books`
sends back all books
```json
[
  { "title": "", "author": "", "fiction": true },
  { "title": "", "author": "", "fiction": true },
  { "title": "", "author": "", "fiction": true }
]
```

#### `GET /books/:id`
sends back one book at the index of id
```json
{
  "title": "",
  "author": "",
  "fiction": true
}
```

#### `GET /movies`
sends back all books
```json
[
  { "title": "", "genre": "", "rating": 1 },
  { "title": "", "genre": "", "rating": 1 },
  { "title": "", "genre": "", "rating": 1 }
]
```

#### `GET /movies/latest`
sends back the last movie added to the movies array
```json
{
  "title": "",
  "genre": "",
  "rating": 1
}
```

Keep in mind it's ok to add methods other than the main 5 in our controllers. Those 5 will just be the most common. Name this method `latest`.

Inside of the `latest` method you will need to use your Javascript skills get the last movie from the array.

#### `GET /movies/:id`
sends back one movie at the index of id
```json
{
  "title": "",
  "genre": "",
  "rating": 1
}
```

#### Step 4: Add filters and ordering to your API
Using the `GET /books` endpoint we just created, let's make it possible for a user to ask for only fiction books or non-fiction books.


For the `GET /books` endpoint, let's have a way for the client to get a specific ordering, alphabetized or reverse alphabetized.
* Make it so when the client requests occupations with a order query parameter, return an alphabetized list for `order=desc` and a reverse alphabetized list for `order=asc` (if your occupations endpoints are arrays of strings, you can simply use the Javascript `.sort()` and `.reverse()` methods of an array to do your sorting).
* This endpoint needs to work with or without an order query. So you will need to use an if statement (or a switch statement for extra credit) to check the value/existence of `req.query.order`.

#### Step 5: Make writable endpoints
Now you're going to make some endpoints that can be added to or modified by `POST` or `PUT` requests. Make sure that in addition to sending the new/updated information, you also modify your user object so that future `GET` requests will reflect your changes.

###### `POST /books`
- Adds to your list of movies.

###### `POST /movies`
- Adds to your list of movies.

###### `PUT /books/:id`
- Switches out the book at the index of `:id` with what is sent in `req.body`

###### `PUT /movies/:id`
- Switches out the movie at the index of `:id` with what is sent in `req.body`

###### `DELETE /books/:id`
- Deletes the book at the index of `:id`

###### `DELETE /restaurants`
- Deletes the movie at the index of `:id`

#### Step 6: Create skills endpoint
This endpoint is going to be a bit more complicated than those you've made previously. For skills, we need to store a more complicated data structure. Here's how your skill could be structured:

```javascript
{
  "id": 1,
  "name": "Javascript",
  "experience": "Intermediate"
}
```

* Create a file called `skillz.js` and populate it with an array of skills objects like the example above. This file will be similar in nature to your `users.js` file and as such should utilize `module.exports` and be required in the necessary controller files.
* Create the endpoint

###### `GET /skillz`
- Retrieve the list of skills

- Also, allow an 'experience' query parameter so that someone can retrieve a list of skills that match a certain level of experience, like so:

`GET /skillz?experience=Intermediate`

- Like in step 4, use an if statement (or a ternary operator!) to determine the existence of `req.query.experience` and then use .filter to get the skillz that match the criteria.

###### `POST /skillz`
- Add a skill to the collection of skills. For this endpoint let's create some middleware that will dynamically create IDs for us based on the length of our skillz array. Identify the Javascript needed to determine what the generated id should be, and set this equal to `req.body.id`. This function will go inside of our `middleware.js` file. Because we only want to use this middleware on our skillz 'POST' endpoint we don't want to use the `app.use()` method; instead we want to pass it into our endpoint's arguments, like so:

```javascript
app.post('/skillz', middleware.generateId, mainCtrl.postSkillz);
```

If this request is timing out, make sure you didn't forget to include the `next()` call inside your middleware!

#### Step 7: Privacy
Now that we've done all this work to get our api together, we don't want to let just anybody delete books or movies from our collections. Let's make it so that each of our DELETE endpoints requires a secret code to work.

Let's require that for

* Create one more file `policies/pin_auth.js`.
* that will export an object of secrets stored as strings. Make sure to require this in the necessary controller file.
* Let's create one more endpoint, somewhere we want to hide our deep dark secrets. We don't want just anyone accessing our secrets, so lets have a username and PIN parameter to make sure that *you* are _**you!**_

```javascript
app.get('/secrets/:username/:pin', /*...*/);
```

(Note that you probably shouldn't use your actual PIN here when testing). We'll need another set of middleware to handle this function, so create a new method in your `middleware.js` named `verifyUser`. This method should check that the parameters match a username and PIN you set. If they do, pass the request on to the `next` function; otherwise, send an error message back to the user without moving to the next function.

#### Step 8 (Black Diamond): Allow for more queries/params
* Let users search your hobbies, occupations, and skills endpoints by name.
* Try to use `req.params` and `req.query` at least once each.
* Update (`PUT`) a family member and restaurant.

#### Step 9 (Black Diamond): Create a simple Angular app for your API
* In a separate directory, create an Angular application
* Using ui.router, create three routes: `/`, `/me`, and `/skills`
  * `/`: a homepage containing basic information about you (name and location)
  * `/me`: detailed information about you: hobbies and occupations
  * `/skillz`: a page to display your skills
* Create a service that handles the network requests (hint: you could create a method for each endpoint, or you could consolidate some into the same method)
* If you arrive this far, go ahead and make some text inputs and add the logic necessary to edit or add to any of the "writeable" endpoints.

# TODO:
make this a single collection of just books
when no URL query is present
sends back only fiction (`?fiction=true`) or non-fiction (`?fiction=false`) books as appropriate

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
