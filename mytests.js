//rename me tests.js
const uuidv4 = require('uuid/v4');
//define a UUID for each test that requires one 
const thisUUID = uuidv4();
const thisUUID2 = uuidv4();

//bucket key for the bucket that you want the tests to be in
const thisBucket = "YOUR_BUCKET_KEY"



//define each of the tests you want to create. if there are universal variables you want, define them first
//as with the bucket key/UUID, and then add by reference to the variable in the test
const test1 = { 
    theUUID: thisUUID,
		testBucket : thisBucket,
	testDefinition : { 
	    "name": "New Sample 1",
	    "description": "My test description"
		},
	testSteps:  [
{
      "skipped": false, 
      "url": "https://yourapihere.com/?query=name", 
      "variables": [
        {
          "source": "response_json", 
          "property": "headers.Host", 
          "name": "myHost"
        }
      ], 
      "args": {}, 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {}, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }, 
        {
          "comparison": "is_less_than", 
          "value": "500", 
          "source": "response_time"
        }, 
        {
          "comparison": "equal", 
          "property": "Content-Type", 
          "value": "application/json", 
          "source": "response_headers"
        }, 
        {
          "comparison": "equal", 
          "property": "headers.Host", 
          "value": "yourapihere.com", 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "multipart_form": [], 
      "before_scripts": [], 
      "data": "", 
      "method": "GET"
    }, 
    {
      "body": "{\r\n\"name\":\"john\",\r\n\"age\":33\r\n}", 
      "skipped": false, 
      "form": {}, 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "url": "https://yourapihere.com", 
      "variables": [], 
      "multipart_form": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "fragment": "", 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }, 
        {
          "comparison": "is_less_than", 
          "value": "500", 
          "source": "response_time"
        }, 
        {
          "comparison": "equal", 
          "property": "Content-Type", 
          "value": "application/json", 
          "source": "response_headers"
        }, 
        {
          "comparison": "equal_number", 
          "property": "json.age", 
          "value": "33", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "log(\"hello world\");"
      ], 
      "before_scripts": [], 
      "method": "POST"
    }, 
    {
      "duration": 5, 
      "skipped": false, 
      "step_type": "pause"
    }, 
    {
      "comparison": "equal", 
      "skipped": false, 
      "left_value": "{{myHost}}", 
      "step_type": "condition", 
      "steps": [
        {
          "skipped": false, 
          "url": "https://yourapihere.com/", 
          "variables": [], 
          "multipart_form": [], 
          "step_type": "request", 
          "auth": {}, 
          "id": "9021c9d8-a8b7-4c18-ac2c-d5a938fa7535", 
          "note": "", 
          "headers": {}, 
          "assertions": [
            {
              "comparison": "equal_number", 
              "value": 200, 
              "source": "response_status"
            }
          ], 
          "scripts": [], 
          "before_scripts": [], 
          "method": "GET"
        }
      ], 
      "right_value": "yourapihere.com"
    }, 
    {
      "skipped": false, 
      "bucket_key": thisBucket, 
      "trigger_token": null, 
      "step_type": "subtest", 
      "variables": [], 
      "environment_uuid": "", 
      "use_parent_environment": true, 
      "note": "", 
      "params": [], 
      "assertions": [
        {
          "comparison": "equal", 
          "property": "result", 
          "value": "pass", 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "test_uuid": "62b7e0b1-af6e-487c-b2ce-3ead93aeab5d"
    }
  ]

};

const test2 = { 
		theUUID: thisUUID2,
    testBucket : thisBucket,
	testDefinition : { 
	    "name": "New Sample 2",
	    "description": "My test description"
		},
	testSteps:  [
    {
      "skipped": false, 
      "url": "https://yourapihere.com/?query=name", 
      "variables": [
        {
          "source": "response_json", 
          "property": "headers.Host", 
          "name": "myHost"
        }
      ], 
      "args": {}, 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {}, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }, 
        {
          "comparison": "is_less_than", 
          "value": "500", 
          "source": "response_time"
        }, 
        {
          "comparison": "equal", 
          "property": "Content-Type", 
          "value": "application/json", 
          "source": "response_headers"
        }, 
        {
          "comparison": "equal", 
          "property": "headers.Host", 
          "value": "yourapihere.com", 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "multipart_form": [], 
      "before_scripts": [], 
      "data": "", 
      "method": "GET"
    }, 
    {
      "body": "{\r\n\"name\":\"john\",\r\n\"age\":33\r\n}", 
      "skipped": false, 
      "form": {}, 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "url": "https://yourapihere.com", 
      "variables": [], 
      "multipart_form": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "fragment": "", 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }, 
        {
          "comparison": "is_less_than", 
          "value": "500", 
          "source": "response_time"
        }, 
        {
          "comparison": "equal", 
          "property": "Content-Type", 
          "value": "application/json", 
          "source": "response_headers"
        }, 
        {
          "comparison": "equal_number", 
          "property": "json.age", 
          "value": "33", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "log(\"hello world\");"
      ], 
      "before_scripts": [], 
      "method": "POST"
    }, 
    {
      "duration": 5, 
      "skipped": false, 
      "step_type": "pause"
    }, 
    {
      "comparison": "equal", 
      "skipped": false, 
      "left_value": "{{myHost}}", 
      "step_type": "condition", 
      "steps": [
        {
          "skipped": false, 
          "url": "https://yourapihere.com/", 
          "variables": [], 
          "multipart_form": [], 
          "step_type": "request", 
          "auth": {}, 
          "id": "9021c9d8-a8b7-4c18-ac2c-d5a938fa7535", 
          "note": "", 
          "headers": {}, 
          "assertions": [
            {
              "comparison": "equal_number", 
              "value": 200, 
              "source": "response_status"
            }
          ], 
          "scripts": [], 
          "before_scripts": [], 
          "method": "GET"
        }
      ], 
      "right_value": "yourapihere.com"
    }, 
    {
      "skipped": false, 
      "bucket_key": thisBucket, 
      "trigger_token": null, 
      "step_type": "subtest", 
      "variables": [], 
      "environment_uuid": "", 
      "use_parent_environment": true, 
      "note": "", 
      "params": [], 
      "assertions": [
        {
          "comparison": "equal", 
          "property": "result", 
          "value": "pass", 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "test_uuid": "62b7e0b1-af6e-487c-b2ce-3ead93aeab5d"
    }
  ]

};

const tests = [test1, test2]; // array of tests to create
// if you have just one test it would be eg: const tests = [test1];



module.exports = tests;