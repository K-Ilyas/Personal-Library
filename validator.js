module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "The book title is a Required field."
                },
                comments: {
                    bsonType: ["string"],
                    description: "The book comments"
                },
                commentcount: {
                    bsonType: "int",
                    description: "the book comments count"
                }
            }
        }
    }
};



