const AWS = require("aws-sdk");
const csv = require("csv-parser");
const { successResponse, errorResponse } = require('./helper');
const { FOLDER_UPLOAD, FOLDER_PARSED } = require('./configs');

module.exports = async (event) => {
  console.log('importFileParser input: ',JSON.stringify(event))

  const s3 = new AWS.S3({ signatureVersion: "v4" });
  const bucketName = event.Records[0].s3.bucket.name;
  const keyName = event.Records[0].s3.object.key;

  const moveFileToParsed = async () => {
    await s3
      .copyObject({
        Bucket: bucketName,
        CopySource: bucketName + "/" + event.Records[0].s3.object.key,
        Key: event.Records[0].s3.object.key.replace(FOLDER_UPLOAD, FOLDER_PARSED),
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: event.Records[0].s3.object.key,
      })
      .promise();
  };

  try {
    const s3ReadStream = s3.getObject({
      Bucket: bucketName,
      Key: keyName,
    }).createReadStream();

    s3ReadStream
      .pipe(csv())
      .on("data", (data) => console.log(data))
      .on("end", await moveFileToParsed());

    return successResponse({ success: true });
  } catch (err) {
    return errorResponse(err, 500);
  }
};