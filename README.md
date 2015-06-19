personal-api
============

Start of the Personal API Project

##Objectives
This project will help solidify the concepts of REST, API, Node.js and Express. 

You're going to build a personal API for your own data. Although the idea might seem silly, the point of the project is to get you used to using Express to return data in an API.

###Step 1: Build your base API
* Using Express, set up a server that listens on a port of your choice.
* Consider setting up some CORS middleware to avoid browser cross-origin issues.

###Step 2: Build read-only endpoints
* These endpoints will return data (see below)
* These endpoints should only be accessible with a GET request (read-only)

####`GET /name`
returns: Your name (e.g. Joe Sandwiches) in a JSON object
####`GET /location`
returns: Your location (e.g. Seattle, WA) in a JSON object
####`GET /hobbies`
returns: Your hobbies (e.g. Fishing, Swimming, etc.) as an array in a JSON object
####`GET /occupations`
returns: Your past occupations as an array in a JSON object
####`GET /occupations/latest`
returns: The last/current job you have/had. The occupations will be stored in an array, but this method returns the last item of the array in a JSON reponse

###Step 3: Add ordering to your API
For the hobbies and occupations endpoints, let's have a way for the client to get a specific ordering, alphabetized or reverse alphabetized.
* Make it so when the client requests occupations or hobbies with a order query parameter, return an alphabetized list for order=desc and a reverse alphabetized list for order=asc (if your hobbies/occupations endpoints are arrays of strings, you can simply use the Javascript `.sort()` and `.reverse()` methods of an array to do your sorting)

###Step 4: Make writable endpoints
Now you're going to make some endpoints that can be added to or modified by `POST` or `PUT` requests.

####`PUT /name`
Changes your name
####`PUT /location`
Updates your current location.
####`POST /hobbies`
Adds to your list of hobbies.
####`POST /occupations`
Adds to your list of occupations.

###Step 5: Create skills endpoint
This endpoint is going to be a bit more complicated than those you've made previously. For skills, we need to store a more complicated data structure. Here's how your skill could be structured:

```javascript
{
  id: 1,
  name: 'Javascript',
  experience: 'Intermediate'
}
```

* In your server code, make an array that holds all of your skills. Be sure to define the array outside of the app.get or app.post methods, as it needs to persist (scope) outside of those methods and maintain its data. The array will hold 'skill' objects like the example above.
* Create the endpoint

####`GET /skills`
purpose: retrieve the list of skills

Also, allow a 'experience' query parameter so that someone can retrieve a list of skills that match a certain level of experience, like so:

`GET /skills?experience=Intermediate`

####`POST /skills`
purpose: add a skill to the collection of skills

###Step 6: Create a simple Angular app for your API
* In a separate directory, create an Angular Application
* Using ngRoute, create three routes: `/`, `/me`, and `/skills`
  * `/` a homepage contains basic information about you (name and location)
  * `/me` detailed information about you: hobbies and occupations
  * `/skills` page that displays your skills
* Create a service that handles the network requests (hint: you could create a method for each endpoint, or you could consolidate some into the same method)
* If you've arrive this far, go ahead and make some text inputs and add the logic necessary to edit or add to any of the "writeable" endpoints.
