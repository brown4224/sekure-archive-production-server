
var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});
// AWS.config.update({endpoint: "https://dynamodb.us-east-1.amazonaws.com"})
var db = new AWS.DynamoDB()
// var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying dynamo db");


// var params = {
//     AttributesToGet: [
//       "filename"
//     ],
//     TableName : 'DevTable',
//     Key : {
//       "fileid" : {
//         "S" : "test.txt-2017-03-28-12-35-01"
//       }
//     }
//   }
  var params = {
    AttributesToGet: ['filename'],
      TableName : 'DevTable',
      Key : {'fileid': {'S' : 'test.txt-2017-03-28-12-35-01'}}
  };


 db.getItem(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
      }
    else {
      console.log(data); // successful response
      // res.send(data);
      }
    // return next();
  });


/** Posts the supplied file to the download queue. */
// export function post(directory: string, file: string, s3: string): Promise<string> {
//         return new Promise((resolve, reject) => {
//             let sqs = new aws.SQS({ region: 'us-east-1' });
//             let params = {
//                 QueueUrl: 'https://sqs.us-east-1.amazonaws.com/373886653085/download',
//                 MessageBody: 'Download',
//                 MessageAttributes: {
//                     directory: { DataType: 'string', Value: directory },
//                     filename: { DataType: 'string', Value: file },
//                     s3path: { DataType: 'string', Value: s3 },
//                 },
//             };
//             sqs.sendMessage(params, (error, data) => {
//                 error ? reject(error) : resolve(data.MessageId);
//             });
//         });
// }
