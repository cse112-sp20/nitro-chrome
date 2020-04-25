# Workflow

* [Repo Structure](#Repo-Structure)
* [CI: Github Action](#Github-Action)
* [How to Contribute](#How-to-Contribute)

## Repo Structure
* master
    - Pull request needs to be up to date (pass the tests)
    - Pull request needs aprroval from at least 1 reviewer
* feature1
* feature2
* ...
* (Another branch for testing?)

## Github Action
We are using [Github Action](https://github.com/marketplace/actions/gabrielbb-xvfb-action) for CI as described in [VSCode documentation](https://code.visualstudio.com/api/working-with-extensions/continuous-integration#github-actions).
Might switch to TravisCI later.

## How to Contribute
#### Coders
1. Clone the repo
2. Create/check out a feature branch
3. Pull master
4. Develop
5. Pull master, fix conflicts, if any
6. Push to feature branch
7. Fix bugs, if any test fails
8. Pull request, assign a member from the QA team (and other members from the whole team) for code review

#### QA - Code Review
1. Review the code from pull request
2. Merge to master, or
3. Assign an issue to the code owner

#### QA - Test Development
1. Clone the repo
2. Check out a feature branch (or a testing branch?)
3. Develop
    - Should complete test cases before feature branch creates pull request to master?
4. Push to feature branch (or a testing branch)
5. Pull request, assign a member from the QA team (and other members from the whole team) for code review

## References
:sparkles: Some useful links if you are not familiar with VSCode extension or CI :sparkles: 

[VSCode Extention API](https://code.visualstudio.com/api)\
[Mocha](https://mochajs.org/)\
[xvbf-action](https://github.com/marketplace/actions/gabrielbb-xvfb-action)\
[Testing example](https://vscode.rocks/testing/)