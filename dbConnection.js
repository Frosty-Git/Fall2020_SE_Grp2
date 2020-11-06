
class DbConnection {

    /**
     * Established connection to the database and queries the
     * database for the USA_Counties geojson.
     */
    static async connect() {
        
        /* Establish database connection */
        const {Client} = require('pg')
        const client = new Client({
            user: "postgres",
            password: "BadBiffBad0809!",
            host: "3.80.98.188",
            post: 5432,
            database: "nj_cia"
        })  
        client.connect();

        //------------------Test Queries-----------------------------
        //const qs = "SELECT *, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM \"USA_Counties\"";
        //const qs = 'SELECT * FROM "USA_Counties"';
        //const qs = 'SELECT * FROM "County"';
        //const qs = 'SELECT * FROM "covid"';
        ////const qs = 'SELECT "NAME", "FIPS", ST_AsGeoJSON(geom) as geometry from "test_geojsonformat"';
        //const qs = 'With counties as (select *, st_asgeojson(a.geom) as geometry from "USA_Counties" a) select row_to_json(b.*) as json from counties b';
        //const qs = 'SELECT * FROM "test_geojsonformat"';
        
        // const qs = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((\"NAME\", \"FIPS\", Med_Income)) As properties FROM test_geojsonformat As lg) As f) As fc";
        const qs = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((\"NAME\", \"FIPS\", Med_Income)) As properties FROM \"USA_Counties\" As lg) As f) As fc";
        
        //------------Cleanup Query Result---------------------------
        var results = await client.query(qs);
        results = results.rows[0];
        results = JSON.stringify(results);
        results = results.replace("{\"row_to_json\":", "");
        var lastIndex = results.lastIndexOf("}")
        results = results.replaceAt(lastIndex, " ");
        results = results.replace(/f1/g, 'NAME');
        results = results.replace(/f2/g, 'FIPS');
        results = results.replace(/f3/g, 'Med_Income');
        results = JSON.parse(results);
  
        //console.log(results);
        
        return results;
    }

    static async connectDateTest() {
                /* Establish database connection */
                const {Client} = require('pg')
                const client = new Client({
                    user: "postgres",
                    password: "BadBiffBad0809!",
                    host: "3.80.98.188",
                    post: 5432,
                    database: "nj_cia"
                })  
                client.connect();
        
        const qs = 'select * from public."Date_Testing"';
        var results = await client.query(qs);
        console.log(results);
        return results;
    }
}

/**
 * Replaces a substring at a specific index.
 * 
 * @param {*} index The location in the string for the replacement
 * @param {*} replacement The substring replacing the old substring
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

module.exports = DbConnection;