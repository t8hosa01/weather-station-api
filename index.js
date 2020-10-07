const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4} = require('uuid')
const app = express()
const port = 3000

app.use(bodyParser.json())

let sensors = [
    {
        id: uuidv4(),
        type: 'Temperature sensor',
        description: 'Temprature sensor in backyard',
        lat: '64.942240',
        lng: '25.366992',
        sensorDataTypes: {
            humidity: false,
            temperature: true,
            rainfall: false,
            wind: false,
            cloudCoverage: false
        }
    }
]

let sensorData = [
    {
        timestamp: '2019-07-04T13:33:03.969Z',
        values: {
            humidity: 50.3,
            temperature: 15.4,
            rainfall: 20.1,
            wind: 3.4,
            cloudCoverage: 45.7
        }
    }
]

let users = [
    {
        userid: uuidv4(),
        userName: 'HumppaLeka12',
        birthDate: '1997-01-08',
        address: {
                street: 'Betonimiehenkatu 13 A 29',
                country: 'Finland',
                postalCode: '90530',
                city: 'Oulu'
        },
        email: 't8hosa01@students.oamk.fi'
    }
]

app.get('/', (req, res) => {
    res.send('Weather Station API')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

// Get information about all sensors
app.get('/sensors', (req, res) => {
    res.json({sensors})
})

// Get information about a user
app.get('/users', (req, res) => {
    res.json({users})
})

// Get sensor data
app.get('/sensors/:id/data', (req, res) => {
    res.json({sensorData})
})

// Create a new sensor
app.post('/sensors', (req, res) => {
    const newSensor = {
        id: uuidv4(),
        type: req.body.type,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
        sensorDataTypes: {
            humidity: req.body.sensorDataTypes.humidity,
            temperature: req.body.sensorDataTypes.temperature,
            rainfall: req.body.sensorDataTypes.rainfall,
            wind: req.body.sensorDataTypes.wind,
            cloudCoverage: req.body.sensorDataTypes.cloudCoverage
        }
    }
    sensors.push(newSensor)
    res.sendStatus(200)
})

// Delete a sensor
app.delete('/sensors/:id', (req, res) => {
    const result = sensors.findIndex(t => t.id == req.params.id)
    if(result !== -1) {
        sensors.splice(result, 1)
        res.sendStatus(200)
    } else {
        sendStatus(404)
    }
})

// Get information about a specific sensor
app.get('/sensors/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== undefined){
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})

// Modify a sensor
app.put('/sensors/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== undefined) {
        for (const key in req.body) {
            result[key] = req.body[key];   
        }
    res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        userid: uuidv4(),
        userName: req.body.userName,
        birthDate: req.body.birthDate,
        address: {
            street: req.body.address.street,
            country: req.body.address.country,
            postalCode: req.body.address.postalCode,
            city: req.body.address.city
        },
        email: req.body.email
    }
})

// Delete a specific user
app.delete('/users/:id', (req, res) => {
    const result = users.findIndex(t => t.id == req.params.id)
    if(result !== -1) {
        users.splice(result, 1)
        res.sendStatus(200)
    } else {
        sendStatus(404)
    }
})

// Get information about a specific user
app.get('/users/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== undefined){
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})

// Modify a user
app.put('/users/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== undefined) {
        for (const key in req.body) {
            result[key] = req.body[key];   
        }
    res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

// Create a Sensor Datum
app.post('/sensors/:id/data', (req, res) => {
    const newSensorDatum = {
        timestamp: req.body.timestamp,
        values: {
            humidity: req.body.values.humidity,
            temperature: req.body.values.temperature,
            rainfall: req.body.values.rainfall,
            wind: req.body.values.wind,
            cloudCoverage: req.body.values.cloudCoverage
        }
    }
})

// List sensor data
app.get('/sensors/:id/data', (req, res) => {
    const result = sensorData.find(t => t.id == req.params.id);
    if(result !== undefined){
        res.json(result)
    } else {
        res.sendStatus(404);
    }
})
