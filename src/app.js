const osmium = require("osmium")
const fs = require("fs")
const geometric = require("geometric")

const folderData = `${__dirname}/../data`
const file = process.argv[2] || 'out.json'

// var reader = new osmium.Reader('/home/klausnerpinto/osm-data/brazil-latest.osm');
var reader = new osmium.Reader('/home/klausnerpinto/repositorios/osmium/data/saocarlos.osm');
var handler = new osmium.Handler();
var locationHandler = new osmium.LocationHandler()
var suburbList = [];

// if (fs.existsSync(`${folderData}/${file}`)) {
//     fs.truncateSync(`${folderData}/${file}`)
//     fs.appendFileSync(`${folderData}/${file}`, '[')
// }

var log = (err, data) => {
    if (err) console.log(err)
    else {
        console.log(data)
    }
}

var suburbHandler = (node) => {
    const geojson = node.geojson();
    const tags = node.tags();
    if (tags.place !== "suburb" && tags.place !== "neighbourhood") return;
    let json = {
        identifier: node.id,
        name: tags.name,
        type: geojson.type,
        coordinates: geojson.coordinates
    };
    suburbList.push(json);
}

var wayHandler = (way) => {
    const geojson = way.geojson();
    const tags = way.tags();
    if (!tags.highway || !tags.name) return
    let json = {
        identifier: way.id,
        name: tags.name,
        type: geojson.type,
        coordinates: geojson.coordinates
    };
    console.log(`${tags.name} - ${JSON.stringify(json)}`)
}

// euclidianDistance([[0,0],[10,10]], [5,5])

var euclidianDistance = (l, p) => {
    let x0 = p[1];
    let y0 = p[0];
    let x1 = l[0][1];
    let y1 = l[0][0];
    let x2 = l[1][1];
    let y2 = l[1][0];
    if (x0 == )
    let dividendo = Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1)
    let divisor = Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2))
    console.log(`${dividendo} \ ${divisor}`)
    return dividendo / divisor;
}

handler.on('node', suburbHandler);
handler.on('way', wayHandler);
handler.on('done', () => {

})

osmium.apply(reader, locationHandler, handler)

