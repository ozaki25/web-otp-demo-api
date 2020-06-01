import { SNS } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

type bodyType = {
  message?: string;
  phoneNumber?: string;
};

const sns = new SNS();

export const sendSMS: APIGatewayProxyHandler = async event => {
  const { body } = event;
  console.log({ body });

  if (!body) return { statusCode: 500, body: 'body is empty' };

  const { message, phoneNumber }: bodyType = JSON.parse(body);
  console.log({ message, phoneNumber });

  if (!message || !phoneNumber) {
    return {
      statusCode: 500,
      body: `invalid params. message: ${message}, phoneNumber: ${phoneNumber}`,
    };
  }

  try {
    const params: SNS.Types.PublishInput = {
      Message: message,
      PhoneNumber: `+81${phoneNumber.slice(1)}`,
    };
    const result = await sns.publish(params).promise();
    console.log(result);
    return {
      statusCode: 200,
      body: 'Hello',
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
