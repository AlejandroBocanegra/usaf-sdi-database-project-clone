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

      response.status(201).send(`User ${newUser.first_name} ${newUser.last_name} was successfully added.`)
    })
  }
}

const createManufacturer = (request, response) => {
  let newManufacturer = request.body
  if (newManufacturer.company_name && newManufacturer.contact_person && newManufacturer.contact_email && newManufacturer.contact_phone) {
    pool.query('INSERT INTO manufacturers (company_name, contact_person, contact_email, contact_phone) VALUES ($1, $2, $3, $4)', [newManufacturer.company_name, newManufacturer.contact_person, newManufacturer.contact_email, newManufacturer.contact_phone], (error, result) => {
      if(error) {
        throw error;
      }
      response.status(201).send(`Manufacturer ${newManufacturer.company_name} was successfully added.`)
    })
  }
}

const createCustomer = (request, response) => {
  let newCustomer = request.body
  if (newCustomer.company_name && newCustomer.contact_person && newCustomer.contact_email && newCustomer.contact_phone) {
    pool.query('INSERT INTO customers (company_name, contact_person, contact_email, contact_phone) VALUES ($1, $2, $3, $4)', [newCustomer.company_name, newCustomer.contact_person, newCustomer.contact_email, newCustomer.contact_phone], (error, result) => {
      if(error) {
        throw error;
      }
      response.status(201).send(`Customer ${newCustomer.company_name} was successfully added.`)
    })
  }
}

const createItem = (request, response) => {
  let newItem = request.body
  if (newItem.name && newItem.description) {
    pool.query('INSERT INTO items (name, description) VALUES ($1, $2)', [newItem.name, newItem.description], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`New item ${newItem.name} was added.`)
    })
  }
}

const createPurchaseOrder = (request, response) => {
  let {manufId, orderDate, custId, items} = request.body
  if (manufId && orderDate && custId && items) {
    pool.query('INSERT INTO purchase_orders (manufacturer_id, date_ordered, customer_id) VALUES ($1, $2, $3) RETURNING id', [manufId, orderDate, custId], (error, result) => {
      if (error) {
        throw error
      }
      let poNum = result.rows[0];
      items.forEach(item => {
        pool.query('INSERT INTO items_purchorders (item_id, po_id, qty) VALUES ($1, $2, $3)', [item.itemId, poNum, item.qty], (error, result) => {
          if (error) {
            throw error
          }
          response.status(201).send(`New purchase order with purchase order number of ${poNum} was created.`)
        })
      })
    })
  }
  
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

const updateUser = (resquest, response) => {
    const id = parseInt (request.params.id)
    const { first_name, last_name, email } = request.body

    pool.query (
        'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
        [first_name, last_name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send (`User modified with ID: ${id}`)
        }
    )
}

const updateManufacturer = (resquest, response) => {
    const id = parseInt (request.params.id)
    const { company_name, contact_person, contact_email, contact_phone } = request.body

    pool.query (
        'UPDATE users SET company_name = $1, contact_person = $2, contact_email = $3, contact_phone = $4 WHERE id = $5',
        [company_name, contact_person, contact_email, contact_phone],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send (`Manufacturer modified with ID: ${id}`)
        }
    )
}

const updatePurchaseOrder = (resquest, response) => {
    const id = parseInt (request.params.id)
    const { manufacturer_id, date_ordered, customer_id } = request.body

    pool.query (
        'UPDATE purchase_orders SET manufacturer_id = $1, date_ordered = $2, customer_id = $3, WHERE id = $4',
        [company_name, contact_person, contact_email, contact_phone],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send (`Manufacturer modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt (request.params.id)

    pool.query ('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status (200).send (`User deleted with ID: ${id}`)
    })
}

const deleteManufacturer = (request, response) => {
    const id = parseInt (request.params.id)

    pool.query ('DELETE FROM manufacturers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status (200).send (`Manufacturer deleted with ID: ${id}`)
    })
}

const deletePurchaseOrder = (request, response) => {
    const id = parseInt (request.params.id)

    pool.query ('DELETE FROM purchase_orders WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status (200).send (`Purchase Order deleted with ID: ${id}`)
    })
}