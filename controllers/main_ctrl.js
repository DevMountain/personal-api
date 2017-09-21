const user = require('../user.js');

const skills = require('../skills.js');


// const getName = (req,res,next) => {
//     res.json(user.name)
// }


// const getUser = (req, res, next) => {
//     res.json(user)
// }

module.exports = {

    getName: (req,res,next) => {
        console.log(req.body)
        res.json({name: user.name})
        },


    getLocation: (req,rea,next) => {
        res.json({location: user.location})
        },


    getOccupations: (req,res,next) => {
        if(req.query.order === "asc"){
            var order = user.occupations.sort();
            res.json(order);}
            if (req.query.order === "desc"){
                var order = user.occupations.reverse();
                res.json(order);
            } 
            res.json({occupation: user.occupations});
        },


        // res.json({occupations: user.occupations}
    getLatest: (req,res,next) => {
        res.json({latestOccupation: user.occupations.slice(-1)})
    },


    getHobbies: (req,res,next) => {
        res.json({hobbies: user.hobbies})
    },


    getHobbyType : (req, res, next) => {
        if (req.params.type) {
            res.json(user.hobbies.filter( e => e.type == req.params.type));
            
           }
        res.json(user.hobbies);
    },


    getFamily: (req,res,next) => {
        res.json({family: user.family})
    },


    getFamilyGender: (req, res, next) => {
        if (req.params.gender){
            res.json(user.family.filter( e => e.gender == req.params.gender))
        }
        res.json(user.family)
    },


    getRestaurants: (req,res,next) => {
        res.json({restaurants: user.restaurants})
    },


     getRestaurantName: (req,res,next) => {
         if (req.params.name) {
             res.json(user.restaurants.filter(e => e.name == req.params.name))
         }
         res.json(user.restaurants)
     },


     updateName: (req,res,next) => {

        user.name = req.body.name
         res.json(user)
     },


    updateLocation: (req,res,next) => {
        user.location = req.body.location
        res.json(user)
    },


     postHobbies: (req,res,next) => {

         
         user.hobbies.push(req.body);
         res.json(user.hobbies);
    },


     postOccupations: (req,res,next) => {
        user.occupations.push(req.body.occupations);
        res.json(user.occupations)
     },


     postFamily: (req,res,next) => {
        user.family.push(req.body);
        res.json(user.family)
     },


     postRestaurants: (req,res,next) => {
        user.restaurants.push(req.body);
        res.json(user.restaurants)
     },




     getSkills: (req,res,next) => {
        if(req.query.experience){
            res.json({skills: skills.filter(skills => skills.experience === req.query.experience)});
        }
            res.json({skills: skills})
     },


     postSkills: (req,res,next) => {
         let id = skills.length + 1;
         req.body.id = id;
         skills.push(req.body);
         res.json(skills);
     }

     
}