# aws-sdk-nock-responses

Collection of nock responses for aws-sdk.

## Quickstart

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

Use the lib ([ava] example):

```js
const awsApiMock = require('@2iq/aws-sdk-nock-responses');  // 1️⃣

const underTest = require('..');  // presumed we are in `test` folder

test('should create ecr repo if not existent', t => {
  awsApiMock.ecr.repoDoesNotExist();  // 2️⃣
  awsApiMock.ecr.repoCreationSuccessful();  // 2️⃣
  awsApiMock.ecr.lifecycleUpdateSuccessfull();  // 2️⃣

  underTest.run();  // 3️⃣

  t.true(awsApiMock.isDone());  // 4️⃣
});
```

1️⃣ `require` the module  
2️⃣ Stub AWS API responses  
3️⃣ Run the code you want to test (code that calls the AWS API)  
4️⃣ Assert that all calls to AWS API were called

  [ava]: https://github.com/avajs/ava

## Disclaimer

We created this module to avoid copy and paste of nock objects between test-files and projects.
As of now, it only contains responses that are required in our projects.
The customization of response (like setting own region or accountId) is not implemented if we don't need that in our test.
In that case, the values are hardcoded.

Contributions are welcome!
