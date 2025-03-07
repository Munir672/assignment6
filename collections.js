const setupCollections = async (database) => {
    try {
        // Create the Shows collection with schema validation
        let showCollection = database.createCollection('Shows', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title', 'numberOfSeasons', 'firstEpisodeYear', 'topActors'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            minLength: 2,
                            maxLength: 30,
                            description: "Title must be a string between 2 and 30 characters."
                        },
                        numberOfSeasons: {
                            bsonType: 'int',
                            minimum: 1,
                            description: "Number of seasons must be an integer and at least 1."
                        },
                        firstEpisodeYear: {
                            bsonType: 'int',
                            minimum: 1900,
                            maximum: 2100,
                            description: "First episode year must be an integer between 1900 and 2100."
                        },
                        topActors: {
                            bsonType: 'array',
                            items: {
                                bsonType: 'object',
                                required: ['actor_id'],
                                properties: {
                                    actor_id: {
                                        bsonType: 'objectId',
                                        description: "actor_id must be a valid ObjectId."
                                    }
                                }
                            },
                            description: "Top actors must be an array of objects containing actor_id."
                        }
                    }
                }
            }
        });

        // Create the Actors collection with schema validation
        let actorCollection = database.createCollection('Actors', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            bsonType: 'string',
                            minLength: 1,
                            maxLength: 30,
                            description: "Name must be between 1 to 30 characters and it must be a string."
                        }
                    }
                }
            }
        });

        return Promise.all([showCollection, actorCollection]);
    } catch (error) {
        console.error("Error setting up collections:", error);
        throw new Error('Failed to set up collections');
    }
}

export default setupCollections;
