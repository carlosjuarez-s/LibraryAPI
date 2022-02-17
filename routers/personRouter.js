const express = require('express');
const personController = require('../controllers/personController');


const validator = require('express-joi-validation').createValidator();
const personValidation = require('../validations/personsValidations');

const routes = Person => {
    const personRouter = express.Router();

    const { getPersons, postPerson, getPerson, putPerson, deletePerson, postLogin, getLoginValidate } = personController(Person);

    personRouter
        .route('/persons')
        .get(getPersons)
        .post(validator.body(personValidation), postPerson)

    personRouter
        .route('/persons/searches')
        .get(getPerson)

    personRouter
        .route('/persons/:personId')
        .put(putPerson)
        .delete(deletePerson)

    personRouter
        .route('/persons/login')
        .post(postLogin)

    personRouter
        .route('/persons/login/validate')
        .get(getLoginValidate)


    return personRouter;
}

module.exports = routes;