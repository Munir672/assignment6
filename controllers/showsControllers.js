import { database } from "../database.js";
import { ObjectId } from "mongodb";

//now show
const createShow = (req, res) =>{
    //make these variables out of the req.body array 
    const {title, seasons, year, topActors} = req.body;

    //create a new show
    const newShow ={
        title: req.body.title,
        numberOfSeasons: Number(req.body.numberOfSeasons),
        firstEpisodeYear: Number(req.body.firstEpisodeYear),
        //we make a new object using map for the id 
        topActors: (req.body.checkActor || []).map(id => ({ actor_id: new ObjectId(id) }))
    }
    
    //insert that new show to the collection name show in the database
    database.collection('shows').insertOne(newShow).
        //if ok then send a success message 
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
        //if not then an error message
        catch((error)=>{
            console.error(error);
            res.status(500).send("Error creating show.");
            
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
    //if ok send the answer 
    .then(shows => {
        res.json(shows);  // Send the resulting shows as JSON
    })
    //if not then sent the error
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error retrieving shows.");
    });
};


export { createShow, getAll} 