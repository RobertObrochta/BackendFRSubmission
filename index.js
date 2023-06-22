const express = require('express');
const app = express();
app.use(express.json())
const fs = require('fs');
const jsonData = "data.json";
const calculatePoints = require("./logic");

// accepts a receipt, calculates an ID, stores all of that data in data.json, and returns the calculated ID
app.post('/receipts/process', (request, response) => {
    try{
        const receipt = request.body;
        const data = fs.readFileSync(jsonData);
        const savedData = JSON.parse(data);

        const id = savedData.data.length + 1;
        
        const points = calculatePoints(receipt);

        const dataToWrite = {[id]: {
            receipt: receipt,
            points: points
        }};
        savedData.data.push(dataToWrite);
        fs.writeFileSync(jsonData, JSON.stringify(savedData));
        response.status(200).json({"id":id});
    }
    catch(error){
        console.error(error);
    }
});

// returns the calculated points from the saved data.json
app.get('/receipts/:id/points', (request, response) => {
    try{
        const {id} = request.params;
        const data = fs.readFileSync(jsonData);
        const savedData = JSON.parse(data);
        const points = savedData.data[id - 1][id].points;

        response.status(200).json({"points": points});
    }
    catch(error){
        console.error(error);
    }
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)