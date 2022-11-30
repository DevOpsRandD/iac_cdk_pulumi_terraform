const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.GREETINGS_TABLE;

exports.saveHello = async(event) => {
    console.log('save hello')

    const name = event.queryStringParameters.name;

    const item = {
        id: name,
        name: name,
        date: Date.now()
    }

    const savedItem = await saveItem(item);

    return {
        statusCode: 200,
        body: JSON.stringify(savedItem),
    }
};

exports.getHello = async(event) => {
    console.log('get hello')

    const name = event.queryStringParameters.name;

    const item = await getItem(name);

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
};

async function saveItem(item) {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    };

    return dynamo.put(params).promise().then(() => {
        return item;
    });
};

async function getItem(name) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'id': name
        }
    };

    return dynamo.get(params).promise()
};
