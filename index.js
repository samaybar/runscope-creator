"use strict";
 
const axios = require('axios');
const uuidv4 = require('uuid/v4');
const log = require("./lib/helpers/logger");
const settings = require('./settings.js');
const tests = require('./tests2.js');

let {apikey} = settings;


//set authorization header for Runscope API requests
const authHeader = `Bearer ${apikey}`;
axios.defaults.headers.common['Authorization'] = authHeader;

//runscope API Functions
function getRunscope(endpointUrl) {
	return axios.get(endpointUrl,);
}

function putRunscope(endpointUrl,putData) {
	axios.defaults.headers.common['Content-Type'] = 'application/json';
	return axios.put(endpointUrl,putData);
}

function postRunscope(endpointUrl,postData) {
	axios.defaults.headers.common['Content-Type'] = 'application/json';
	return axios.post(endpointUrl,postData);
}



//function to create test and define steps
async function createTest(myUUID, bucket,definition,steps) {
	try {
		
		//create new test
		let createTestEndpoint = `https://api.runscope.com/buckets/${bucket}/tests`
		let newTest = await postRunscope(createTestEndpoint,definition);
		
		//extract test ID from test
		let newTestData = newTest.data.data;
		let newTestID = newTestData.id

		//if you want to modify environment to, you could add call to runscope API to modify environment
		let newTestDefaultEnviornment = newTestData.default_environment_id
		

		//define test steps
		let modifyTestEndpoint = `${createTestEndpoint}/${newTestID}`;
		let payload = {"steps":steps};
		let newTestSteps = await putRunscope(modifyTestEndpoint,payload);
		log.info(`${newTestID}: ${newTestSteps.data.meta.status} - ${myUUID}`);

	} catch (e) {
		log.warn(e);
	}
}

//loop through tests from tests.js file and create each of them using function above
for (let i=0; i<tests.length; i++) {
	//extract test i from tests.js
	let thisTest = tests[i];
	let {theUUID, testBucket,testDefinition,testSteps} = thisTest;
	//testDefinition.steps = testSteps;
	//create test i
	createTest(theUUID, testBucket,testDefinition,testSteps);
}