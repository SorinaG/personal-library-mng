import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: "eu-north-1",
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

export default () => s3;
