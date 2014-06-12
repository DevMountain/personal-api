var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var occupations = ['student', 'web developer', 'Software Engineer'];
var hobbies = ['Programming', 'Basketball', 'Ping Pong'];
var friends = ['Jake', 'John', 'Tim']
var creds = ['http://www.deseretnews.com/sports/high-school/game/7555/2007-02-02-Boys-Basketball-Cedar-Pine-View', 'http://www.thespectrum.com/article/20070213/SPORTS02/702130335/Tough-road-title']

var skills = [
  {
    id: 1,
    name: 'Javascript',
    experience: 'Super Advanced'
  },
  {
    id: 2,
    name: 'Yoga',
    experience: 'Beginner'
  }
]
app.use(bodyParser());

app.get('/name', function(req, res){
  res.send({name: 'Tyler McGinnis'});
});

app.get('/location', function(req, res){
  res.send({location: 'Provo, Utah'});
});

app.get('/hobbies', function(req, res){
  if(req.query.order === 'asc'){
    res.send({hobbies: hobbies.sort()})
  } else if (req.query.order === 'desc'){
    res.send({hobbies: hobbies.sort().reverse()});
  } else {
    res.send({hobbies: hobbies});
  }
});

app.get('/occupations', function(req, res){
  if(req.query.order === 'asc'){
    res.send({occupations: occupations.sort()})
  } else if (req.query.order === 'desc'){
    res.send({occupations: occupations.sort().reverse()});
  } else {
    res.send({occupations: occupations});
  }
});

app.get('/occupations/latest', function(req, res){
  res.send({latestOccupation: occupations[occupations.length -1]});
});

app.route('/mentions')
  .get(function(req, res){
    res.send({cred: creds});
  })
  .post(function(req, res){
    creds.push(req.body.cred);
    res.send({cred: creds});
  });

app.route('/friends')
  .get(function(req, res){
    res.send({friends: friends});
  })
  .post(function(req, res){
    friends.push(req.body.friend);
    res.send({friends: friends});
  })

app.route('/skills')
  .get(function(req, res){
    res.send({skills: skills});
  })
  .post(function(req, res){
    skills.push(req.body);
    res.send({skills: skills})
  });

app.get('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      res.send({skills: skills[i]});
    }
  }
});

app.put('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      skills[i] = req.body;
    }
  }
  res.send({skills: skills});
});

app.delete('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      skills.splice(i, 1);
    }
  }
  res.send({skills: skills});
});

app.listen(3000);