import express from 'express';
import { ObjectId } from 'mongodb'; // ES Module style import
import { database } from '../database.js';


// TODO: Routing logic
const createActor = (req, res) =>{
    // Extract the name from the request body
    const { actorName } = req.body;  // Corrected field name from actorName

    // Create a new actor document
    const newActor = { name: actorName };  // MongoDB will generate _id automatically

    // Insert the new actor into the 'actors' collection
    database.collection('actors').insertOne(newActor)
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
        .catch((error) => {
            console.dir(errorObject, {depth: null});
            console.error(`Error inserting actor: ${error}`);
            res.status(500).json({ message: 'Failed to insert new actor' });
        });
};

export default createActor