const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'commerce',
  password: 'password',
  port: 5432,
});

const createUser = (request, response) => {
  let newUser = request.body
  if (newUser.first_name && newUser.last_name && newUser.email) {
    pool.query('INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)', [newUser.first_name, newUser.last_name, newUser.email], (error, result) => {
      if(error) {
        throw error;
      }

      response.status(201).send(`User ${newUser.first_name} ${newUser.last_name} was successfully added`)
    })
  }
}

const createManufacturer = (request, response) => {
  let newManufacturer = request.body
  if (newManufacturer.company_name && newManufacturer.contact_person && newManufacturer.contact_email && newManufacturer.contact_phone) {
    pool.query('INSERT INTO manufacturers (company_name, contact_person, contact_email, contact_phone) VALUES ($1, $2, $3, $4)', [newManufacturer.first_name, newManufacturer.last_name, newManufacturer.email], (error, result) => {
      if(error) {
        throw error;
      }
      response.status(201).send(`Manufacturer ${newManufacturer.company_name} was successfully added`)
    })
  }
}

const createItem = (request, response) => {
  let newItem = request.body
  if (newItem.)
}

const getUsers = (request, response) => {
    pool.querry ('SELECT * FROM users ORDER BY last_name ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getManufacturers = (request, response) => {
    pool.querry ('SELECT * FROM manufacturers ORDER BY contact_person ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}