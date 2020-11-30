# aws-sdk-nock-responses

Collection of nock responses for aws-sdk.

## Quick start

Add the `@2iq/aws-sdk-nock-responses` to devDependencies:

```js
{
  // ...
  "devDependencies": {
    // ...
    "@2iq/aws-sdk-nock-responses": "0.0.1",
    // ...
  }
  // ...
}
```

Use the lib:


```js
const awsApiMock = require('@2iq/aws-sdk-nock-responses');  // 1️⃣

const underTest = require('..');

test('should create ecr repo if not existent', t => {
  awsApiMock.ecr.repoDoesNotExist();  // 2️⃣
  awsApiMock.ecr.repoCreationSuccessful();  // 2️⃣
  awsApiMock.ecr.lifecycleUpdateSuccessfull();  // 2️⃣

  underTest.run();  // 3️⃣

  t.true(awsApiMock.isDone());  // 4️⃣
});
```

1️⃣ `require` the module  
2️⃣ Add aws api responses in order they are called  
3️⃣ Run the code you want to test (code that calls the AWS api)  
4️⃣ Assert that all calls to AWS api were called

## Disclaimer

This module was created to avoid copy and paste of nock object creation between test-files and projects.
It only contains responses that are currently required in our projects.
The customization of response (like setting own region or accountId) is not possible if the change is not needed in our projects.
Values are hardcoded in that case.

Currently only some ECR responses are present where you can customize the ECR repo name.
