const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path: './security.env'})

const personController = Person => {
    const getPersons = (async (req, res) => {
        const persons = await Person.find();

        if(persons) {
            res.json({message: "Found", persons: persons})
        } else {
            res.json({message: "No person is registered"})
        }
    })

    const postPerson = (async (req, res) => {
        const { body } = req

        if(await Person.findOne({username: body.username})) {
            res.status(400).json({message: "This user already exist"})
        } else {
            const person = new Person(body);
            person.password = await bcrypt.hash(person.password, 10);
            await person.save();
            response = {message: 'Created person', person}
            res.status(200).json(response);
        }
    })

    const getPerson = (async (req, res) => {
        var person;
        const { query } = req;

        try {
            person = await Person.find(query);
        } catch(err) {
            res.status(400).json({error: "'Person not found'"})
        }
        
        if(Object.keys(person).length === 0 || !person) {
            response = {message: 'Person not found'}
            res.status(200).json(response)
        }
        else {
            response = {message: 'Found Person', person};
            res.json(response);
        }
        
    })

    const putPerson = (async (req, res) => {
        const { body, query } = req;
        
        try {
            await Person.updateOne(
                {
                    _id: req.params.personId
                },
                {
                    $set: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        userName: query.pepito,
                        password: await bcrypt.hash(body.password, 10),
                        email: body.email,
                        address: body.address,
                        phone: body.phone
                    }
                }
            )
        } catch(err) {
            res.status(400).json({error: "This person no exist"})
        }
        
        res.json({message: "Person update"});
    })

    const deletePerson = (async (req, res) => {
        const { params } = req;
    
        try {
            const person = await Person.findById(req.params.personId);
            await Person.deleteOne(person);
            if(person) {
                res.json({message: "Deleted person"})
            } else {
                res.json({message: "This person no exist"})
            }
        } catch(err) {
            res.status(400).json({error: "error"})
        }
    })

    const postLogin = (async (req, res) => {
        const { body } = req;

        const person = await Person.findOne({"username": body.userName})

        if(!person) {
            res.status(400).json({message: "This user no exist!"})
        } else if(await bcrypt.compare(body.password, person.password)) {
            const token = generatedToken(person);
            res.json({message: "Successful login", token} )
        } else {
            res.status(400).json({message: "Invalid Credentials"})
        }
    })

    const generatedToken = Person => {
        const payLod = {
            firstName: Person.firstName,
            lastName: Person.lastName
        }

        return jwt.sign(payLod, process.env.SECRET)
    }

    const getLoginValidate = async (req, res) => {
        const { headers } = req;
        const token = headers.token;
        var response;

        try {
            var decoded = jwt.verify(token, process.env.SECRET);
            response = {message: "Successful verification", token: decoded};
            res.json(response);
        }catch(e) {
            response = {error: e};
            res.status(400).json(response)
        }   
    }

    return { getPersons, postPerson, getPerson, putPerson, deletePerson, postLogin, getLoginValidate };
}

module.exports = personController;