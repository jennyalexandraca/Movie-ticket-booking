
import AWS from 'aws-sdk';
import { getSecrets } from './userServices';

export const uploadFile = async (file, path) => {
    const secrets = await getSecrets();

    AWS.config.update({
        region: 'us-east-2', // Especifica la región en la que se encuentra tu bucket
        credentials: new AWS.Credentials({
          accessKeyId: secrets.data.access,
          secretAccessKey: secrets.data.secret,
        }),
      });
      
    const s3 = new AWS.S3();

  const params = {
    Bucket: secrets.data.name,
    Key: "images/" + path+file.name,
    Body: file,
    };
  console.log("🚀 ~ file: awsUtils.js:24 ~ uploadFile ~ params:", params)
  
    try {
      const response = await s3.upload(params).promise();
        console.log('Archivo cargado:', response.Location);
        return response.Location;
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };