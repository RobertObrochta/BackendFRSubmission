# BackendFRSubmission
## Contents
This is my submission for the Fetch Rewards Backend position. This comes with the API specifications as outlined by the requirements, with unit tests, for the receipt-processor-challenge.

### File Structure
- Data is stored in data.json
- logic.js contains (most notably) the points calculator, which is used within the POST endpoint /receipts/process
- logic.test.js is the Jest test suite, which tests the two receipts given in the example

## Running the app
A Dockerfile has been included within this repo. To build, run "docker build -t rob ." within the base directory (/BackendFRSubmission). 

(optional) After that, verify the docker image by running "docker images".

Finally, start up the server with the command "docker run -dp 127.0.0.1:3001:3001 rob". The server will be reachable at 127.0.0.1:3001

**Note**: "sudo" may have to prepend each of the above Docker commands if there is a permissions issue.
