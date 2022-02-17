const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const personController = Person => {
    const getPersons = (async (req, res) => {
        const { query } = req;
        const response = await Person.find(query);

        res.json(response);
    })

    const postPerson = (async (req, res) => {
        var response;
        const person = new Person(req.body);

        person.password = await bcrypt.hash(person.password, 10);

        await person.save();
        response = {message: 'Created person', person}
        res.json(response);
    })

    const getPerson = (async (req, res) => {
        var response;

        const { query } = req;
        const person = await Person.find(query);

        if(Object.keys(person).length === 0) response = {message: 'Person not found'}
        else response = {message: 'Found Person', person};

        res.json(response);
    })

    const putPerson = (async (req, res) => {
        const { body } = req;
        const person = await Person.updateOne(
            {
                _id: req.params.personId
            },
            {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    userName: body.userName,
                    password: await bcrypt.hash(body.password, 10),
                    email: body.email,
                    address: body.address,
                    phone: body.phone
                }
            }
        )
        

        res.send("Person update");
    })

    const deletePerson = (async (req, res) => {
        const { params } = req;
        const person = await Person.findById(params.personId);
        await Person.deleteOne(person);

        res.send("Deleted person");
    })

    const postLogin = (async (req, res) => {
        const { body } = req;
        var response;

        const person = await Person.findOne(
            {
                "userName": body.userName
            }
        )

        if(await bcrypt.compare(body.password, person.password)) {
            const token = generatedToken(person);

            response = {message: "ok", token}
        } else {
            response = {message: "Invalid Credentials"};
        }

        res.json(response);
    })

    const generatedToken = Person => {
        const payLod = {
            firstName: Person.firstName,
            lastName: Person.lastName
        }

        return jwt.sign(payLod, 'aaa')
    }

    const getLoginValidate = async (req, res) => {
        const { headers } = req;
        const token = headers.token;
        var response;

        try {
            var decoded = jwt.verify(token, 'aaa');
            response = {message: "Successful verification", token: decoded};
        }catch(e) {
            response = {error: e};
        }

        res.json(response);
    }

    return { getPersons, postPerson, getPerson, putPerson, deletePerson, postLogin, getLoginValidate };
}

module.exports = personController;