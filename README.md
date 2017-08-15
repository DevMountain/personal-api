<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

Personal API
============

##Objective
Utilize Node.js and Express to create a simple REST API with your own data. You'll be building these endpoints by using `req.params`, `req.body`, and `req.query`. 

#### Step 1: Build your server's core - installation and server.js file.
* Create a file named `index.js`
* Run the `npm init -y` command to create our `package.json`.
* Now install your dependencies. We will be using Express and body-parser. Note that you can install multiple dependencies at once with npm: `npm install express body-parser cors --save`.
* Require Express, body-parser and cors in your `index.js`.
* Initialize your express app by invoking express and saving it to a variable named app.
* Use body-parser's json method in an `app.use()` method.
* Use `cors(`) in an an `app.use()` method.

#### Step 1.5: Create a new file to store your user data.
In this step, you'll need to create a file called `user.js` to store your user object which will hold your personal data. You can access the contents of this file throughout your application by exporting with `module.exports`. Your `user` object should be in the format below. Feel free to add additional entries, but this is the bare minimum. Replace the null values with your own values.

```javascript
module.exports = {
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
Create a folder named `controllers`. In controllers, add a file named `main_ctrl.js`.
Make sure to use `module.exports` so that we can access this controller from our `index.js` file.

Your `main_ctrl.js` will also need to access the contents of `user.js`, so you can view/manipulate your data. You can gain access to `user.js` by using `require` inside of your controller like so:

```javascript
var user = require('../user.js');
```


We now need to require the `main_ctrl.js` in our `index.js` like so:

```javascript
var main_ctrl = require('./controllers/main_ctrl.js');
```

#### Step 3: Build read-only endpoints
* Make sure your endpoints are below your top-level middleware.
* These endpoints will return data (see below)
* These endpoints should only be accessible with a GET request (read-only)
* These endpoints will call functions from your controller rather than having them declared inside of the endpoint. i.e `app.get('/name', main_ctrl.getName)` rather than `app.get('/name', function(req, res) { /*...*/});`

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
For the occupations endpoint with the get method that we just wrote, let's have a way for the client to get a specific ordering, alphabetized or reverse alphabetized.
* Make it so when the client requests occupations with a order query parameter, return an alphabetized list for the query `order=desc` and a reverse alphabetized list for the query `order=asc` (if your occupations endpoints are arrays of strings, you can simply use the Javascript `.sort()` and `.reverse()` methods of an array to do your sorting).
* This endpoint needs to work with or without an order query. So you will need to use an if statement (or a switch statement) to check the value/existence of `req.query.order`. 

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

* Create a file called `skills.js` and populate it with an array of skills objects like the example above. This file will be similar in nature to your `user.js` file and as such should utilize `module.exports` and be required in the necessary controller files. 
* Create the endpoints:

###### `GET /skills`
- Retrieve the list of skills

- Also, allow an 'experience' query parameter so that someone can retrieve a list of skills that match a certain level of experience, like so:

`GET /skills?experience=Intermediate`

- Like in step 4, use an if statement (or a ternary operator) to determine the existence of `req.query.experience` and then use .filter to get the skills that match the criteria.

###### `POST /skills`
- Add a skill to the collection of skills. For this endpoint we need to create a function that will dynamically create IDs for us based on the length of our skills array. For example: 
```let id = skills.length + 1```


#### Step 7 (Black Diamond): Allow for more queries/params
* Let users search your hobbies, occupations, and skills endpoints by name.
* Try to use `req.params` and `req.query` at least once each.
* Update (`PUT`) a family member and restaurant.

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
