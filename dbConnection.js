class DbConnection {

    /**
     * Established connection to the database and queries the
     * database for the USA_Counties geojson.
     */
    static async connect(date) {
        
        /* Establish database connection */
        const {Client} = require('pg')
        const R = require('ramda');
        const client = new Client({
            user: "postgres",
            password: "BadBiffBad0809!",
            host: "3.80.98.188",
            post: 5432,
            database: "nj_cia"
        })

        client.connect();

        /* Preparation for the query */
        var values1 = [date];
        var value_of_table;
        var ls = "select c20.\"cases\" from public.\"covid\" c20 where (c20.\"county\" = 'New York City' and c20.date = $1)";
         await client.query(ls, values1).then( res => {
              value_of_table = R.head(R.values(R.head(res.rows)));
             if ( isNaN(value_of_table) ){
                value_of_table = 0;
            }
        })    
        value_of_table =  Math.round(value_of_table / 5);
        var values2 = [date, value_of_table];

        /* Kevin's Query */
        var qs = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((\"NAME\", \"FIPS\", Med_Income, cases, date, \"STATE_NAME\")) As properties FROM (Select uc.\"FIPS\", coalesce(st.date, $1) as date, (CASE When (uc.\"FIPS\" = '36005' or uc.\"FIPS\" = '36047' or uc.\"FIPS\" = '36061' or uc.\"FIPS\" = '36081' or uc.\"FIPS\" = '36085') then  $2 else (Case When st.\"cases\" is NULL THEN 0 else st.\"cases\" END)END)  as cases, uc.med_income, uc.\"NAME\", uc.\"STATE_NAME\", uc.geom from(select c19.\"county\",  c19.cases, c19.date, c19.\"FIPS\" from public.\"covid\" as c19 where c19.date = $1)st right join public.\"USA_Counties\" as uc on uc.\"FIPS\" = st.\"FIPS\")  As lg ) As f) As fc";
        
        /* Query the database */
        var results = await client.query(qs, values2);
        /* Cleanup the query result */
        results = results.rows[0];
        results = JSON.stringify(results);
        results = results.replace("{\"row_to_json\":", "");
        var lastIndex = results.lastIndexOf("}")
        results = results.replaceAt(lastIndex, " ");
        results = results.replace(/f1/g, 'NAME');
        results = results.replace(/f2/g, 'FIPS');
        results = results.replace(/f3/g, 'Med_Income');
        results = results.replace(/f4/g, 'cases');
        results = results.replace(/f5/g, 'date');
        results = results.replace(/f6/g, 'STATE_NAME');

        /* Parse the cleaned up query result */
        results = JSON.parse(results);
        
        client.end();
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