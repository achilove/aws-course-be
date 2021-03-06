const AWS = require("aws-sdk");
const { successResponse, errorResponse, HttpStatusCodes } = require('./helper');
const { BUCKET, FOLDER_UPLOAD } = require('./configs');


module.exports = async ( event ) => {
  console.log('importProductsFile input: ',JSON.stringify(event));

  try {
    const s3 = new AWS.S3({ signatureVersion: "v4" });
    const params = {
      Bucket: BUCKET,
      Key: `${FOLDER_UPLOAD}/${event.queryStringParameters.name}`,
      ContentType: "text/csv",
    };
    const s3PutObjectUrl = await s3.getSignedUrlPromise("putObject", params);
    return successResponse(s3PutObjectUrl);
  } catch (err) {
    return errorResponse(err, HttpStatusCodes.INTERNAL_SERVER_ERROR)
  }
};