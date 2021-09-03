

const AWS = require("aws-sdk");
const createProductWithStock = require("./service/createProductWithStock");

const sns = new AWS.SNS();

module.exports = async (event) => {
    console.info('catalogBatchProcess event', event);
    try {
        for await (const record of event.Records) {
            const product = JSON.parse(record.body);
            console.info('Product', JSON.stringify(product));

            await createProductWithStock(product);
            const params = {
                Message: JSON.stringify(product),
                MessageAttributes: { price: { DataType: 'Number', StringValue: String(product.price) } },
                TargetArn: process.env.PRODUCT_TOPIC,
            }
            await sns.publish(params).promise();
        }
    } catch (e) {
        console.error('Catalogue batch processing error', JSON.stringify(e));
        throw e;
    }
}