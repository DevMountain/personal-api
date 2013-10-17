personal-api
============

Start of the Personal API Project

##Objectives
This project will help solidify the concepts of REST, API, Node.js and Express. 

You're going to build a personal API for your own data. Although the idea might seem silly, the point of the project is to get you used to routing and working with different kinds of data.

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
