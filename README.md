<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

Personal API
============

##Objective
Utilize Node.js and Express to create a simple REST API

You're going to build a personal API for your own data. Although the idea might seem silly, the point of the project is to get you used to using Express to return data in an API.

#### Step 1: Build your server's core - installation and server.js file.
* Start as usual with an `npm init` command to create our `package.json`.
* Now install your dependencies. We will be using Express and body-parser. Note that you can install multiple dependencies at once with npm: `npm install express body-parser --save`.
* Require Express and body-parser and initialize your express app.
* Use body-parser's json method in an `app.use()` method.

#### Step 1.5: Create a new file to store your user data.
In this step. you'll need to create a file called `user.js` to store your user object in. You can access the contents of this file throughout your application by using `module.exports`. You will learn more about this in the next step. For now, your user file should look something like this:

```javascript
var user = {};
module.exports = user;
```

Where `user` will contain your own information. Your `user` object should be in the format below. Feel free to add additional entries, but this is the bare minimum. Replace the null values with your own values.

```javascript
{
  name: null,
  location: null,
  occupations: [],
  hobbies: [
    {
      name: null,
      type: null
    },
    {
      name: null,
      type: null
    },
    {
      name: null,
      type: null
    }
  ],
  family: [
    {
      name: null,
      relation: null,
      gender: null
    },
    {
      name: null,
      relation: null,
      gender: null
    },{
      name: null,
      relation: null,
      gender: null
    }
  ],
  restaurants: [
    {
      name: null,
      type: null,
      rating: null
    },
    {
      name: null,
      type: null,
      rating: null
    },
    {
      name: null,
      type: null,
      rating: null
    }
  ]
}
```

#### Step 2: Creating controllers
In yesterday's projects you might have noticed that our `server.js` file was rapidly becoming very cluttered with our function logic. To get around this and keep a clean `server.js` we're going to create some controllers and move a significant amount of logic into those. Start by creating a `controllers` directory, inside which you will create a `middleware.js` and a `mainCtrl.js`. These are the files in which we write the bulk of our code today. We'll start in `middleware.js`.

Yesterday we had to write out headers in every single request made and sent; now we get to simplify things! Before we actually start writing our middleware we need a way to get the code from this directory to be accessible to our `server.js`. The way we do this is with `module.exports`. There are two common ways of using `module.exports`, either way will work fine, and which you choose is a matter of preference. Here is an example of each:

```javascript
var exports = module.exports = {}

exports.myFunction = function(req, res) {
  /*...*/
}

exports.anotherFunction = function(req, res) {
  /*...*/
}
```
--------

```javascript
module.exports = {
  myFunction: function(req, res) {
    /*...*/
  },

  anotherFunction: function(req, res) {
    /*...*/
  }
}
```

As you can see we are just creating an object which we will then pull into our `server.js` to have access to the methods we create inside that object. This is similar to dependency injection in Angular, just a different syntax. I'll be using the second style in this project, but as I mentioned, it is just preference and both will function the same.

Your `mainCtrl.js` will also need to access the contents of `user.js`, so you can view/manipulate your data. You can gain access to `user.js` by using `require` inside of your controller like so:

```javascript
var user = require('../user.js');
```

Inside of our `middleware.js` controller, let's create a new function that simply adds the headers we used yesterday to a response and then moves on to the next function. This looks a lot like our requests from yesterday, but without a `res.send()`:

```javascript
module.exports = {

  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  }
}
```

You should also notice that we passed in a new parameter: `next`. What `next` does when invoked is simply pass the request along to the next function in line. Without `next()` or a `res.send()` our request will simply sit on our server and eventually time out. Let's head back to our `server.js` file and set up our controllers.

To have access to the code inside these controllers we will need to `require` much like we do with node modules. For these requires we need to provide a file path, which will look like this:

```javascript
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');
```

Now we can access any methods that we put inside of our `mainCtrl` or `middleware` objects with dot notation. We'll demonstrate by setting our middleware function to be used on every request. Remember your code from setting up body-parser, we will be doing the same thing with our own custom middleware.

```javascript
app.use(middleware.addHeaders);
```

As simple as that, we no longer have to individually apply headers to every single endpoint! Remember that the `app.use()` method just applies a function to every request made before passing it on to the next function or eventually sending a response.

#### Step 3: Build read-only endpoints
* These endpoints will return data (see below)
* These endpoints should only be accessible with a GET request (read-only)
* These endpoints will call functions from your controller rather than having them declared inside of the endpoint. i.e `app.get('/name', mainCtrl.getName)` rather than `app.get('/name', function(req, res) { /*...*/});`

###### `GET /name`
- returns: Your name (e.g. Joe Sandwiches) in a JSON object:
`{ "name": "Donald Duck" }`

###### `GET /location`
- returns: Your location (e.g. Seattle, WA) in a JSON object:
`{ "location": "Timbuktu" }`

###### `GET /occupations`
- returns: Your past occupations as an array in a JSON object:
`{ "occupations": ["Thwarting Buggs Bunny", "Tomfoolery"] }`

###### `GET /occupations/latest`
- returns: The last/current job you have/had. The occupations will be stored in an array, but this method returns the last item of the array in a JSON reponse:
`{ "latestOccupation": "Tomfoolery" }`. (Hint: this is just basic Javascript to access the last value of an array - checkout .slice on MDN)

###### `GET /hobbies`
- returns: Your hobbies (e.g. Fishing, Swimming, etc.) as an array of objects in a JSON object:
```javascript
{ hobbies: [{
    "name": "Watching cartoons",
    "type": "current"
    },
    {
    "name": "Quacking",
    "type": "past"
    }
    ]
}
```

###### `GET /hobbies/:type`
- returns: Any hobbies that match the type property specified in the request parameter. (Hint: checkout the .filter method and the 2nd example of it [here](https://msdn.microsoft.com/en-us/library/ff679973(v=vs.94).aspx))

###### `GET /family`
- returns: Your family members, as an array of objects in a JSON object.

- Allow for a 'relation' query to retrieve all family members that match a given relation.

###### `GET /family/:gender`
- returns: All family members of the specified gender (Hint: see the hint on the `/hobbies/:type` endpoint)

###### `GET /restaurants`
- returns: Your favorite restaurants, as an array of objects in a JSON object.

- Allow for a 'rating' query to retrieve all restaurants with a rating greater than or equal to 2. (Hint: go [here](https://support.sparkpay.com/hc/en-us/articles/202836800-Resource-Query-Filtering-Syntax) to see how to use greater than or equal to - see the Comparison Operators section.)

###### `GET /restaurants/:name`
- returns: Your favorite restaurant matching the supplied name parameter. (Hint: to use parameters - or queries - that are multiple words, use `+`: ex. `/restaurants/taco+bell`)


#### Step 4: Add ordering to your API
For the occupations endpoint, let's have a way for the client to get a specific ordering, alphabetized or reverse alphabetized.
* Make it so when the client requests occupations with a order query parameter, return an alphabetized list for `order=desc` and a reverse alphabetized list for `order=asc` (if your occupations endpoints are arrays of strings, you can simply use the Javascript `.sort()` and `.reverse()` methods of an array to do your sorting).
* This endpoint needs to work with or without an order query. So you will need to use an if statement (or a switch statement for extra credit) to check the value/existence of `req.query.order`. 

#### Step 5: Make writable endpoints
Now you're going to make some endpoints that can be added to or modified by `POST` or `PUT` requests. Make sure that in addition to sending the new/updated information, you also modify your user object so that future `GET` requests will reflect your changes.

###### `PUT /name`
- Changes your name

###### `PUT /location`
- Updates your current location.

###### `POST /hobbies`
- Adds to your list of hobbies.

###### `POST /occupations`
- Adds to your list of occupations.

###### `POST /family`
- Adds to your list of family members.

###### `POST /restaurants`
- Adds to your list of restaurants.

#### Step 6: Create skills endpoint
This endpoint is going to be a bit more complicated than those you've made previously. For skills, we need to store a more complicated data structure. Here's how your skill could be structured:

```javascript
{
  "id": 1,
  "name": "Javascript",
  "experience": "Intermediate"
}
```

* Create a file called `skillz.js` and populate it with an array of skills objects like the example above. This file will be similar in nature to your `user.js` file and as such should utilize `module.exports` and be required in the necessary controller files. 
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

#### Step 7: Secrets
* Create one more file called `secrets.js` that will export an array of secrets stored as strings. Make sure to require this in the necessary controller file.
* Let's create one more endpoint, somewhere we want to hide our deep dark secrets. We don't want just anyone accessing our secrets, so lets have a username and PIN parameter to make sure that *you* are _**you!**_

```javascript
app.get('/secrets/:username/:pin', /*...*/);`
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

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
