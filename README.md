personal-api
============

Start of the Personal API Project

##Objectives
This project will help solidify the concepts of REST, API, Node.js and Express. 

You're going to build a personal API for your own data. Although the idea might seem silly, the point of the project is to get you used to routing and working with different kinds of data.

**NOTE:** You might not get through all of the steps. That's OK. The further you get, the better off you'll be.

###Step 1: Build your base API
* Using express, set up a server that listens on a port of your choice.
* Make sure you set up some CORS middleware to avoid browser security issues

###Step 2: Build static, read-only endpoints
* These endpoints will return static data (see below)
* These endpoints should only be accessible with a GET request (read-only)

####`GET /name`
returns: Your name (e.g. Joe Sandwiches) in a JSON object
####`GET /location`
returns: Your location (e.g. Orem, UT) in a JSON object
####`GET /hobbies`
returns: Your hobbies (e.g. Fishing, Swimming, etc.) as an array in a JSON object
####`GET /occupations`
returns: Your past occupations as an array in a JSON object
####`GET /occupations/latest`
returns: The last/current job you have/had. The occupations will be stored in an array, but this method returns the last item of the array in a JSON reponse

###Step 3: Add ordering to your API
For the hobbies and occupations endpoints, let's have a way for the client to get a specific ordering, alphabetized or reverse alphabetized.
* Check out the query property of the request parameter in the Express API: http://expressjs.com/api.html#req.query
* This makes it so you can examine "query parameters" that are passed in with a GET request. For example, GET /occupations?order=asc or /hobbies?order=desc
* Params that follow the ? in the url itself are called query string parameters. They aren't included in the route parsing and are treated like parameters being passed to a function.
* Examine the request.query property in the occupations and hobbies endpoints, making sure you return an alphabetized list for order=desc and a reverse alphabetized list for order=asc (if you have an array of strings, you can simply use the Javascript `.sort()` and `.reverse()` methods of an array to do your sorting)

###Step 4: Make readable/writable endpoints
Now you're going to make some endpoints that can be added to as POST requests are sent to the server as well as read by GET requests.

####`POST /mentions`
purpose: Add a url to a list of urls wherein your are mentioned. They could be news articles, publications, social media sites, etc. (They can also be fake! :) This resource should also have a GET that returns the data.
####`POST /friends`
purpose: Add a name to a list of names that are your friends. You should also include a GET for this resource that returns the friend data.

###Step 5: Create skills endpoint
This endpoint is going to be a bit more complicated than those you've made previously. For skills, we need to store a more complicated data structure. Here's how your skill could be structured:

```javascript
{
  id: 1
  name: 'Javascript',
  experience: 'Intermediate'
}
```

* In your server code, make an array that holds all of your skills. Be sure to define the array outside of the app.get or app.post methods, as it needs to persist (scope) outside of those methods and maintain its data. The array will hold 'skill' objects like the example above.
* Create the endpoint

####`GET /skills`
purpose: retrieve the list of skills
####`GET /skills/:id`
purpose: retrieve a single skill by its id
####`POST /skills`
purpose: add a skill to the collection of skills
####`PUT /skills/:id`
purpose: edit a skill
####`DELETE /skills/:id`
purpose: delete a skill from the list

###Step 6 (Black Diamond): Create a simple Angular app for your API
* In a separate directory, create an Angular application using Yeoman
* Create three routes: `/`, `/me`, and `/skills`
  * `/` a homepage contains basic information about you (name and location)
  * `/me` detailed information about you: hobbies, occupations, mentions and friends
  * `/skills` page that displays your skills
* Create a service that handles the network requests (hint: you could create a method for each endpoint, or you could consolidate some into the same method)
* If you're feeling frisky, made inputs and add the logic necessary to edit any of the "writeable" endpoints

###Step 7 (Black Diamond): Add a `/resume` endpoint
* Add an endpoint that returns a PDF of your resume
* Look into Node.js and serving static files through a route. (This SO question/answer should be all you need: http://stackoverflow.com/a/9151394/1160485)

###Step 8 (Black Diamond): Add some filters to your `/skills` endpoint. 
* Make it so the client can GET skills filtered by experience. Use the query string to let clients specify the experience that they want to filter by. The endpoint should then return all of the skills that match that experience.
