const router = require("express").Router();
const axios = require("axios");
const { response } = require("../app");

/* GET home page */
router.get("/", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/create-new", (req, res, next) => {

    console.log("HERE!!!!")
    res.render('characters/create-character')

});


router.get("/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    
});


// create character
router.post("/create", (req, res, next) => {

    axios.post('https://ih-crud-api.herokuapp.com/characters', {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        isAcartoon: req.body.isAcartoon,
        
      })
    .then((createdCharacter) => {
        console.log(createdCharacter.data, "CREATED CHARACTER")
        res.redirect(`/characters/${createdCharacter.data.id}`)
    })
    .catch(err => console.error(err))
})


// edit character
router.get("/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
   .then(response => {
       
       res.render("characters/edit-characters.hbs", { character: response.data })
   })
   .catch(err => console.error(err))
   
})



//update character
router.post("/:id/update", (req, res, next) => {
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body)
    .then(response => {
        res.render("characters/edit-characters.hbs", { character: response.data})
    })
    .catch(err => console.error(err))
});


//Delete character
router.post("/:id/delete", (req,res,next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body).
    then(()=>{
        res.redirect("/characters")
    })
})


module.exports = router;
// https://ih-crud-api.herokuapp.com/characters