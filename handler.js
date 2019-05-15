"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

module.exports.hello = (event, context, callback) => {
  const params = {
    TableName: "Ids",
    Key: {
      id: "a2d24910-76b1-11e9-aaaa-ad5c8af14390"
    }
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item."
      });
      return;
    }

    if (result) {
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });
};

// module.exports.hello = (event, context, callback) => {
//   const timestamp = new Date().getTime();

//   const params = {
//     TableName: "Ids",
//     Item: {
//       id: uuid.v1(),
//       text: "bem vindo",
//       checked: false,
//       createdAt: timestamp,
//       updatedAt: timestamp
//     }
//   };

//   // write the todo to the database
//   dynamoDb.put(params, error => {
//     // handle potential errors
//     if (error) {
//       console.error(error);
//       callback(null, {
//         statusCode: error.statusCode || 501,
//         headers: { "Content-Type": "text/plain" },
//         body: "Couldn't create the todo item."
//       });
//       return;
//     }

//     // create a response
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(params.Item)
//     };
//     callback(null, response);
//   });
// };
