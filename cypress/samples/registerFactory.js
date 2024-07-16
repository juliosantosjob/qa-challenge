import { cpf } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';

import {
    proficiency,
    zipCode,
    neighborhood,
    street
} from '../fixtures/user-profile.json'

/**
 * Generates a random value based on the parameter, be it an array or a minimum and maximum number.
 * 
 * @returns {string} - Returns a random value.
 */

function getRandomValue(params = {}) {
    let min, max, array;

    if (params.hasOwnProperty('min') && params.hasOwnProperty('max')) {
        min = params['min'];
        max = params['max'];
    } else if (params.hasOwnProperty('array')) {
        array = params['array'];
    } else {
        throw new Error('To use "getRandomValue" you must enter: "min", "max", or "array".');
    }

    if (array !== undefined) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    } else if (typeof min === 'number' && typeof max === 'number') {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    } else {
        throw new Error('Invalid parameters. Use an array or two numbers.');
    }
}

/**
 * Dynamic Mass Generator.
 * 
 * @returns {object} - Returns the person and address objects for filling out the form.
 */

export function registerFactory() {
    let email = faker.internet.email();
    let password = faker.internet.password();

    return {
        person: {
            name: faker.internet.userName(),
            lastName: faker.internet.userName(),
            date: '01-01-2000',
            cpf: cpf.generate(),
            email: email,
            emailConfirm: email,
            password: password,
            confirmPassword: password,
            proficiency: getRandomValue({ array: proficiency }),
        },
        addreass: {
            cep: getRandomValue({ array: zipCode }),
            neighborhood: getRandomValue({ array: neighborhood }),
            street: getRandomValue({ array: street }),
            number: getRandomValue({ min: 100, max: 1000 }),
            complement: 'Complement of address'
        }
    }
}