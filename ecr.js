module.exports = (nock) => {
  return {
    repoExists: (ecrRepoName = 'ecr_repo_name') => {
      return nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {"repositoryNames": [ecrRepoName]})
        .reply(200, {
          "repositories": [{
            "createdAt": 1606178427,
            "encryptionConfiguration": {"encryptionType": "AES256"},
            "imageScanningConfiguration": {"scanOnPush": true},
            "imageTagMutability": "MUTABLE",
            "registryId": "123456789012",
            "repositoryArn": `arn:aws:ecr:foo-central-42:123456789012:repository/${ecrRepoName}`,
            "repositoryName": `${ecrRepoName}`,
            "repositoryUri": `123456789012.dkr.ecr.foo-central-42.amazonaws.com/${ecrRepoName}`
          }]
        });
    },

    repoDoesNotExist: (ecrRepoName = 'ecr_repo_name') => {
      return nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {"repositoryNames": [ecrRepoName]})
        .reply(400, {
          "__type": "RepositoryNotFoundException",
          "message": `The repository with name '${ecrRepoName}' does not exist in the registry with id '123456789012'`
        });
    },

    repoCreationSuccessful: (ecrRepoName = 'ecr_repo_name') => {
      return nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {
          "imageScanningConfiguration": {"scanOnPush": true},
          "repositoryName": ecrRepoName})
        .reply(200, {
          "repository": {
            "createdAt": 1606260465,
            "encryptionConfiguration": {"encryptionType": "AES256"},
            "imageScanningConfiguration": {"scanOnPush": true},
            "imageTagMutability": "MUTABLE",
            "registryId": "123456789012",
            "repositoryArn": `arn:aws:ecr:foo-central-42:123456789012:repository/${ecrRepoName}`,
            "repositoryName": `${ecrRepoName}`,
            "repositoryUri": `123456789012.dkr.ecr.foo-central-42.amazonaws.com/${ecrRepoName}`
          }
        });
    },

    lifecycleUpdateSuccessfull: (ecrRepoName = 'ecr_repo_name') => {
      return nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {
          "lifecyclePolicyText": "{\"rules\":[{\"rulePriority\":1,\"description\":\"Expire images older than 30 days\",\"selection\":{\"tagStatus\":\"untagged\",\"countType\":\"sinceImagePushed\",\"countUnit\":\"days\",\"countNumber\":30},\"action\":{\"type\":\"expire\"}}]}",
          "repositoryName": ecrRepoName})
        .reply(200, {
          "lifecyclePolicyText": "{\"rules\":[{\"rulePriority\":1,\"description\":\"Expire images older than 30 days\",\"selection\":{\"tagStatus\":\"untagged\",\"countType\":\"sinceImagePushed\",\"countUnit\":\"days\",\"countNumber\":30},\"action\":{\"type\":\"expire\"}}]}",
          "registryId": "123456789012",
          "repositoryName": ecrRepoName});
    },

    accessDenied: (ecrRepoName = 'ecr_repo_name') => {
      nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {"repositoryNames": [ecrRepoName]})
        .reply(400, {
          "__type": "AccessDeniedException",
          "Message": `User: arn:aws:iam::123456789012:user/mr.foobar is not authorized to perform: ecr:DescribeRepositories on resource: arn:aws:ecr:foo-central-42:123456789012:repository/${ecrRepoName}`
        });
    },

    invalidSecurityToken: (ecrRepoName = 'ecr_repo_name') => {
      return nock('https://api.ecr.foo-central-42.amazonaws.com')
        .post('/', {"repositoryNames": [ecrRepoName]})
        .reply(400, {
          "__type": "UnrecognizedClientException",
          "message": "The security token included in the request is invalid."
        });
    },
  }
};
