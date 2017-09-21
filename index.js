const express = require('express');
const bodyParser = require('body-parser');

const main_ctrl = require('./controllers/main_ctrl.js');

const port = 3004;
const app = express();

app.use(bodyParser.json());
// app.use((req,res,next) => {
//     console.log('req', req.body);
//     console.log(req.query);
//     console.log(req.params)
//     next();
// })


// app.get('/api/user', main_ctrl.getUser)

app.get('/api/name', main_ctrl.getName)
app.get('/api/location', main_ctrl.getLocation)
app.get('/api/occupations', main_ctrl.getOccupations)
app.get('/api/occupations/latest', main_ctrl.getLatest)
app.get('/api/hobbies', main_ctrl.getHobbies)
app.get('/api/hobbies/:type', main_ctrl.getHobbyType)
app.get('/api/family', main_ctrl.getFamily)
app.get('/api/family/:gender', main_ctrl.getFamilyGender)
app.get('/api/restaurants/', main_ctrl.getRestaurants)
app.get('/api/restaurants/:name', main_ctrl.getRestaurantName)

app.put('/api/name', main_ctrl.updateName)
app.put('/api/location', main_ctrl.updateLocation)

app.post('/api/hobbies', main_ctrl.postHobbies)
app.post('/api/occupations', main_ctrl.postOccupations)
app.post('/api/family', main_ctrl.postFamily)
app.post('/api/restaurants', main_ctrl.postRestaurants)

app.get('/api/skills', main_ctrl.getSkills)
app.post('/api/skills', main_ctrl.postSkills)










app.listen(port, () => {
    console.log(`Listening to Port: ${port}`)
})

