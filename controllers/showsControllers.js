import { database } from "../database.js";
import { ObjectId } from "mongodb";

//now show
const createShow = (req, res) =>{
    const {title, seasons, year, topActors} = req.body;

    const newShow ={
        title: req.body.title,
        numberOfSeasons: Number(req.body.seasons),
        firstEpisodeYear: Number(req.body.year),
        topActors: (req.body.checkActor || []).map(id => ({ actor_id: new ObjectId(id) }))
    }
    

    database.collection('shows').insertOne(newShow).
        then((show)=>{
            res.status(201).send(
                `<html>
                    <head>
                        <title>New Show Inserted</title>
                    </head>
                    <body>
                        <h1>New show has been inserted successfully!</h1>
                        <p><a href="/">Back to Home Page</a></p>
                    </body>
                </html>`
            )
        }).
        catch((error)=>{
            console.dir(errorObject, {depth: null})
            console.log(error)
            console.dir(errorObject, {depth: null})
        })
}



//now it is time to get things 
const getAll = (req, res) => {
    database.collection('shows').aggregate([
        {
            $match: {}  // get all the shows
        },
        {
            $lookup: {
                from: 'actors',                // The collection to join with
                localField: 'topActors.actor_id',  // Field from shows collection to match
                foreignField: '_id',           // Field from actors collection to match
                as: 'top_actors'            // The name for the resulting array
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                numberOfSeasons: 1,
                firstEpisodeYear: 1,
                top_actors: {  // Only include the 'name' of each actor
                    name: 1
                }
            }
        }
    ])
    .toArray()
    .then(shows => {
        res.json(shows);  // Send the resulting shows as JSON
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error retrieving shows.");
    });
};


export { createShow, getAll} 