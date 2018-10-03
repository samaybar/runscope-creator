//rename me tests.js
const uuidv4 = require('uuid/v4');
//define a UUID for each test that requires one (note the UUIDs in the test definitions below)
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
      "url": "{{schema}}://store.{{endpoint}}/store/extractor/_search?q=(tags:Source|{{Uline-source}} AND tags:Action|TestLogin)&_apikey={{apikey}}&_mine=true", 
      "variables": [
        {
          "source": "response_json", 
          "property": "hits.hits[0]._id", 
          "name": "extractorId"
        }
      ], 
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
          "comparison": "equal_number", 
          "property": "hits.total", 
          "value": "1", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "// parse JSON response body into object\r\nvar data = JSON.parse(response.body);\r\nvar prodWebhookIndex = -1;\r\nvar prodWebhookURL = variables.get(\"ProdWebhookURL\") || \"dummyURL\";\r\n\r\nif (data.hits.hits[0].fields.webhooks) {\r\n    for (var i = 0; i < data.hits.hits[0].fields.webhooks.length; i++) {\r\n        if (data.hits.hits[0].fields.webhooks[i].url.indexOf(prodWebhookURL) > -1) {\r\n            prodWebhookIndex = i;\r\n            break;\r\n        }\r\n    }\r\n}\r\n\r\nif (prodWebhookIndex > -1) {\r\n    variables.set(\"ProdWebhookObj\", JSON.stringify(data.hits.hits[0].fields.webhooks[prodWebhookIndex])+\",\");\r\n} else {\r\n    variables.set(\"ProdWebhookObj\", \"\");\r\n}"
      ], 
      "before_scripts": [], 
      "method": "GET"
    }, 
    {
      "body": `{\r\n\"webhooks\": [\r\n   {{ProdWebhookObj}}\r\n{\r\n\"url\": \"{{incoming_url(${thisUUID})}}\",\r\n\"headers\": {}\r\n}\r\n]\r\n}`, 
      "skipped": false, 
      "form": {}, 
      "url": "{{schema}}://store.{{endpoint}}/store/extractor/{{extractorId}}?_apikey={{apikey}}", 
      "variables": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "method": "PATCH"
    }, 
    {
      "body": "{\r\n  \"extractors\": [{\r\n    \"tags\": {\r\n      \"Source\": \"{{Uline-source}}\",\r\n      \"Action\": \"TestLogin\"\r\n    },\r\n    \"credentials\": {\r\n      \"username\": \"{{Uline-username}}\",\r\n      \"password\": \"ab12A\"\r\n    }\r\n  }],\r\n  \"inputs\": [{\r\n  }]\r\n}", 
      "skipped": false, 
      "form": {}, 
      "url": "{{schema}}://run.{{endpoint}}/crawl/start?_apikey={{apikey}}", 
      "variables": [
        {
          "source": "response_json", 
          "property": "results[0].extractorId", 
          "name": "extractorId"
        }, 
        {
          "source": "response_json", 
          "property": "results[0].crawlRunId", 
          "name": "crawlRunId"
        }
      ], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": "200", 
          "source": "response_status"
        }, 
        {
          "comparison": "not_empty", 
          "property": "results[0].extractorId", 
          "value": null, 
          "source": "response_json"
        }, 
        {
          "comparison": "not_empty", 
          "property": "results[0].crawlRunId", 
          "value": null, 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "method": "POST"
    }, 
    {
      "duration": 30, 
      "skipped": false, 
      "step_type": "pause"
    }, 
    {
      "skipped": false, 
      "variables": [
        {
          "source": "response_json", 
          "property": "json", 
          "name": "jsonUrl"
        }, 
        {
          "source": "response_json", 
          "property": "extractorId", 
          "name": "webhookExtractorId"
        }, 
        {
          "source": "response_json", 
          "property": "guid", 
          "name": "webhookCrawlRunId"
        }
      ], 
      "step_type": "inbound", 
      "token": thisUUID, 
      "note": "", 
      "isDynamicUrl": true, 
      "assertions": [
        {
          "comparison": "not_empty", 
          "property": "json", 
          "value": null, 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": []
    }, 
    {
      "skipped": false, 
      "url": "{{jsonUrl}}?_apikey={{apikey}}", 
      "variables": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {}, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": "200", 
          "source": "response_status"
        }, 
        {
          "comparison": "not_equal", 
          "property": "result.extractorData.data[0].group[0].auth_status[0].text", 
          "value": "SUCCESS", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "var data = JSON.parse(response.body);\nvar results = data.result.extractorData.data[0].group[0];\n\nassert.notEqual(results.auth_message[0].text, \"\");"
      ], 
      "before_scripts": [], 
      "method": "GET"
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
      "url": "{{schema}}://store.{{endpoint}}/store/extractor/_search?q=(tags:Source|{{Uline-source}} AND tags:Action|TestLogin)&_apikey={{apikey}}&_mine=true", 
      "variables": [
        {
          "source": "response_json", 
          "property": "hits.hits[0]._id", 
          "name": "extractorId"
        }
      ], 
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
          "comparison": "equal_number", 
          "property": "hits.total", 
          "value": "1", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "// parse JSON response body into object\r\nvar data = JSON.parse(response.body);\r\nvar prodWebhookIndex = -1;\r\nvar prodWebhookURL = variables.get(\"ProdWebhookURL\") || \"dummyURL\";\r\n\r\nif (data.hits.hits[0].fields.webhooks) {\r\n    for (var i = 0; i < data.hits.hits[0].fields.webhooks.length; i++) {\r\n        if (data.hits.hits[0].fields.webhooks[i].url.indexOf(prodWebhookURL) > -1) {\r\n            prodWebhookIndex = i;\r\n            break;\r\n        }\r\n    }\r\n}\r\n\r\nif (prodWebhookIndex > -1) {\r\n    variables.set(\"ProdWebhookObj\", JSON.stringify(data.hits.hits[0].fields.webhooks[prodWebhookIndex])+\",\");\r\n} else {\r\n    variables.set(\"ProdWebhookObj\", \"\");\r\n}"
      ], 
      "before_scripts": [], 
      "method": "GET"
    }, 
    {
      "body": `{\r\n\"webhooks\": [\r\n   {{ProdWebhookObj}}\r\n{\r\n\"url\": \"{{incoming_url(${thisUUID2})}}\",\r\n\"headers\": {}\r\n}\r\n]\r\n}`, 
      "skipped": false, 
      "form": {}, 
      "url": "{{schema}}://store.{{endpoint}}/store/extractor/{{extractorId}}?_apikey={{apikey}}", 
      "variables": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": 200, 
          "source": "response_status"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "method": "PATCH"
    }, 
    {
      "body": "{\r\n  \"extractors\": [{\r\n    \"tags\": {\r\n      \"Source\": \"{{Uline-source}}\",\r\n      \"Action\": \"TestLogin\"\r\n    },\r\n    \"credentials\": {\r\n      \"username\": \"{{Uline-username}}\",\r\n      \"password\": \"ab12A\"\r\n    }\r\n  }],\r\n  \"inputs\": [{\r\n  }]\r\n}", 
      "skipped": false, 
      "form": {}, 
      "url": "{{schema}}://run.{{endpoint}}/crawl/start?_apikey={{apikey}}", 
      "variables": [
        {
          "source": "response_json", 
          "property": "results[0].extractorId", 
          "name": "extractorId"
        }, 
        {
          "source": "response_json", 
          "property": "results[0].crawlRunId", 
          "name": "crawlRunId"
        }
      ], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {
        "Content-Type": [
          "application/json"
        ]
      }, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": "200", 
          "source": "response_status"
        }, 
        {
          "comparison": "not_empty", 
          "property": "results[0].extractorId", 
          "value": null, 
          "source": "response_json"
        }, 
        {
          "comparison": "not_empty", 
          "property": "results[0].crawlRunId", 
          "value": null, 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": [], 
      "method": "POST"
    }, 
    {
      "duration": 30, 
      "skipped": false, 
      "step_type": "pause"
    }, 
    {
      "skipped": false, 
      "variables": [
        {
          "source": "response_json", 
          "property": "json", 
          "name": "jsonUrl"
        }, 
        {
          "source": "response_json", 
          "property": "extractorId", 
          "name": "webhookExtractorId"
        }, 
        {
          "source": "response_json", 
          "property": "guid", 
          "name": "webhookCrawlRunId"
        }
      ], 
      "step_type": "inbound", 
      "token": thisUUID2, 
      "note": "", 
      "isDynamicUrl": true, 
      "assertions": [
        {
          "comparison": "not_empty", 
          "property": "json", 
          "value": null, 
          "source": "response_json"
        }
      ], 
      "scripts": [], 
      "before_scripts": []
    }, 
    {
      "skipped": false, 
      "url": "{{jsonUrl}}?_apikey={{apikey}}", 
      "variables": [], 
      "step_type": "request", 
      "auth": {}, 
      "note": "", 
      "headers": {}, 
      "assertions": [
        {
          "comparison": "equal_number", 
          "value": "200", 
          "source": "response_status"
        }, 
        {
          "comparison": "not_equal", 
          "property": "result.extractorData.data[0].group[0].auth_status[0].text", 
          "value": "SUCCESS", 
          "source": "response_json"
        }
      ], 
      "scripts": [
        "var data = JSON.parse(response.body);\nvar results = data.result.extractorData.data[0].group[0];\n\nassert.notEqual(results.auth_message[0].text, \"\");"
      ], 
      "before_scripts": [], 
      "method": "GET"
    }
  ]

};

const tests = [test1, test2]; // array of tests to create
// if you have just one test it would be eg: const tests = [test1];



module.exports = tests;