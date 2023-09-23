require('dotenv').config()
const express = require('express')
const app = express()
const {getJobs, getCityInfo} = require('./util.js');
// TODO: import the getCityInfo and getJobs functions from util.js

app.use(express.static('./public'));

app.get('/api/city/:city', async (req, res) => {
    const cityName = req.params.city;
    try {
        const cityInfo = await getCityInfo(cityName);
        const jobs = await getJobs(cityName);
        if (cityInfo || jobs) {
            res.status(200).json({cityInfo, jobs});
            } else {
                res.status(404).json({
                error: 'City or Job Not Found!'
            });
        } 
    } catch (err) {
        err.message = 'Error!  Request not Found!'; // Error messages required on servers to avoid crash
        console.log(err);
    } 
});
// TODO: Statically serve the public folder
// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

module.exports = app
