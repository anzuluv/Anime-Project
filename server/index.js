const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CharacterModel = require('./models/Characters');
const Ave_PLModel = require('./models/Ave_PL')

const cors = require("cors");
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://bealing27:L%23veme27@animecluster.hb36qul.mongodb.net/Anime");

app.get("/getCharacters", (req, res) => {
    Ave_PLModel.aggregate(
        [{"$group": { "_id": { name: "$name", anime: "$anime" },name: {$first:"$name"}, anime: {$first:"$anime"}, state: {$first: "$state"} }}
    ], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/getStates", (req, res) => {
    CharacterModel.aggregate(
        [{"$group": { "_id": { name: "$name", anime: "$anime", state:"$state" },name: {$first:"$name"}, anime: {$first:"$anime"}, state: {$first: "$state"} }}
    ], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


app.get("/getCharacter/:anime/:name", (req, res) => {
    CharacterModel.aggregate([
        {$match: {name: req.params.name, anime:req.params.anime}},
        {$group: { 
        _id: {power_level:"$power_level",state:"$state"},
        name: {$first:"$name"}, 
        anime: {$first:"$anime"}, 
        state: {$first: "$state"},
        count_pl: {$sum: 1},
         }},

         {$group: {
            _id: {state: "$state"},
            name: {$first:"$name"}, 
            anime: {$first:"$anime"}, 
            state: {$first: "$state"},
            power_levels: {
                $push: {
                    power_level: "$_id.power_level",
                    count: "$count_pl"
                }
            }
         }}
        // {$sort: { "count_pl": -1 } },

        // {$group: {
        // _id: null,
        // name: {$first:"$name"}, 
        // anime: {$first:"$anime"}, 
        // state: {$first: "$state"},
        // power_level: {$first: "$_id.power_level"}
        // }}
    ], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/AvePL_find/:anime/:name/:state", (req, res) => {
    Ave_PLModel.find({name: req.params.name, anime: req.params.anime, state: req.params.state}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// app.get("/AvePL_find/:anime/:name", (req, res) => {
//     Ave_PLModel.find({name: req.params.name, anime: req.params.anime}, (err, result) => {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     });
// });



app.post("/createCharacter", async (req, res) => {
    const character = req.body;
    const newCharacter = new CharacterModel(character);
    await newCharacter.save();

    res.json(character);
});

app.post("/moveCharacter", async (req,res) => {
    const character = req.body;
    const moveCharacter = new Ave_PLModel(character);
    await moveCharacter.save();

    res.json(character);

});

app.post("/updateCharacter", (req,res) => {
    Ave_PLModel.findByIdAndUpdate(req.body.id, {name: req.body.name, anime: req.body.anime, state: req.body.state, ave_pl: req.body.ave_pl},
        function(err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({data:"Record has been updated!"});
        });
})

app.listen(3001, () => {
    console.log("SERVER IS UP");
});