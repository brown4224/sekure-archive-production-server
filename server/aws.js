// stackoverflow.com/questions/19073991/dynamodb-node-aws-sdk-simple-getitem-call
var config = require('./config');
var AWS = require("aws-sdk");
AWS.config.update({region: config.aws.dynamo.region});
var db = new AWS.DynamoDB()
console.log("Querying dynamo db");
// AWS.config.update({region: config.aws.dynamo.region});
// var db = new AWS.DynamoDB()
// console.log("Querying dynamo db");
//
//   var params = {
//     AttributesToGet: ['filename'],
//       TableName : config.aws.dynamo.files,
//       Key : {'fileid': {'S' : 'test.txt-2017-03-28-12-35-01'}}
//   };


  // var params = {
  //   AttributesToGet: ['filename'],
  //     TableName : config.aws.dynamo.files,
  //     key : {'project': {'S' : 'awsProject'}}
  //     key : {'project': {'S' : 'awsProject'}}
  // };
  // var params = {
  //     "TableName": "Files",
  //     "IndexName": "project-id-time-stamp-index",
  //     "KeyConditionExpression": "project-id  = :projectName",
  //     "ExpressionAttributeValues": {
  //         ":projectName": {"S": "awsProject"}
  //     },
  //     "ProjectionExpression": "	file_id",
  //     "ScanIndexForward": false
  // }


  var params = {
      TableName : "Files",
      ProjectionExpression:"filename",
      KeyConditionExpression: "#tr= :target",
      ExpressionAttributeNames:{
         "#tr": "file-id"
      },
      ExpressionAttributeValues: {
     ":target": {"S": "foo.txt-2017-03-28-16-15-26"}
  }
}

 db.query(params, function(err, data) {
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
