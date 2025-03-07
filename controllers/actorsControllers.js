import express from 'express';
import { ObjectId } from 'mongodb'; // ES Module style import
import { database } from '../database.js';


// TODO: Routing logic
const createActor = (req, res) =>{
    // Extract the name from the request body
    const { actorName } = req.body; 

    // Create a new actor document
    const newActor = { name: actorName };  

    // Insert the new actor into the 'actors' collection
    database.collection('actors').insertOne(newActor)
        //if things go well send a success and link to home
        .then(() => {
            res.status(201).send(`
                <html>
                    <head>
                        <title>Actor Inserted</title>
                    </head>
                    <body>
                        <h1>New actor has been inserted successfully!</h1>
                        <p><a href="/">Back to Home Page</a></p>
                    </body>
                </html>
            `);
        })
        //if not then an error messsage
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Failed to insert new actor' });
        });
};

export default createActor