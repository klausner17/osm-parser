const { Client } = require("@elastic/elasticsearch")
const jsonReader = require("read-json-stream").default



const client = new Client({node: 'http://localhost:9200'});
const result = client.search({
    index: 'location',
    q: "nap"
}).then(result => console.log(result))
