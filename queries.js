const { response } = require("express");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "commerce",
  password: "password",
  port: 5432,
});

const create = (request, response) => {
  let type = request.params.type;

  switch (type) {
    case "user":
      let newUser = request.body;
      if (newUser.firstName && newUser.lastName && newUser.email) {
        pool.query(
          "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)",
          [newUser.firstName, newUser.lastName, newUser.email],
          (error, result) => {
            if (error) {
              throw error;
            }
            response
              .status(201)
              .send(
                JSON.stringify(
                  `User ${newUser.firstName} ${newUser.lastName} was successfully added.`
                )
              );
          }
        );
      }
      break;
    case "manufacturer":
      let newManufacturer = request.body;
      if (
        newManufacturer.company_name &&
        newManufacturer.contact_person &&
        newManufacturer.contact_email &&
        newManufacturer.contact_phone
      ) {
        pool.query(
          "INSERT INTO manufacturers (company_name, contact_person, contact_email, contact_phone) VALUES ($1, $2, $3, $4)",
          [
            newManufacturer.company_name,
            newManufacturer.contact_person,
            newManufacturer.contact_email,
            newManufacturer.contact_phone,
          ],
          (error, result) => {
            if (error) {
              throw error;
            }
            response
              .status(201)
              .send(
                JSON.stringify(
                  `Manufacturer ${newManufacturer.company_name} was successfully added.`
                )
              );
          }
        );
      }
      break;
    case "customer":
      let newCustomer = request.body;
      if (
        newCustomer.company_name &&
        newCustomer.contact_person &&
        newCustomer.contact_email &&
        newCustomer.contact_phone
      ) {
        pool.query(
          "INSERT INTO customers (company_name, contact_person, contact_email, contact_phone) VALUES ($1, $2, $3, $4)",
          [
            newCustomer.company_name,
            newCustomer.contact_person,
            newCustomer.contact_email,
            newCustomer.contact_phone,
          ],
          (error, result) => {
            if (error) {
              throw error;
            }
            response
              .status(201)
              .send(JSON.stringify(`Customer ${newCustomer.company_name} was successfully added.`));
          }
        );
      }
      break;
    case "item":
      let newItem = request.body;
      if (newItem.name && newItem.description) {
        pool.query(
          "INSERT INTO items (name, description) VALUES ($1, $2)",
          [newItem.name, newItem.description],
          (error, result) => {
            if (error) {
              throw error;
            }
            response.status(201).send(JSON.stringify(`New item ${newItem.name} was added.`));
          }
        );
      }
      break;
    case "purchaseOrder":
      let { manufId, orderDate, custId, items } = request.body;
      if (manufId && orderDate && custId && items) {
        pool.query(
          "INSERT INTO purchase_orders (manufacturer_id, date_ordered, customer_id) VALUES ($1, $2, $3) RETURNING id",
          [manufId, orderDate, custId],
          (error, result) => {
            if (error) {
              throw error;
            }
            let poNum = result.rows[0];
            items.forEach((item) => {
              pool.query(
                "INSERT INTO items_purchorders (item_id, po_id, qty) VALUES ($1, $2, $3)",
                [item.itemId, poNum, item.qty],
                (error, result) => {
                  if (error) {
                    throw error;
                  }
                  response
                    .status(201)
                    .send(
                      JSON.stringify(
                        `New purchase order with purchase order number of ${poNum} was created.`
                      )
                    );
                }
              );
            });
          }
        );
      }
      break;
    default:
      response.send(JSON.stringify("There was an error passing parameters, please try again."));
  }
};

const read = (request, response) => {
  let type = request.params.type;

  switch (type) {
    case "user":
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(results.rows));
      });
      break;

    case "manufacturer":
      pool.query("SELECT * FROM manufacturers ORDER BY id ASC", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(results.rows));
      });
      break;

    case "purchaseOrder":
      pool.query("SELECT po.id, man.company_name AS Manufacturer, po.date_ordered, itm.name, ipo.qty, cust.company_name AS Customer, usr.last_name AS Salesperson FROM (((((purchase_orders po INNER JOIN items_purchorders ipo ON po.id = ipo.po_id) INNER JOIN manufacturers man ON po.manufacturer_id = man.id) INNER JOIN items itm ON ipo.item_id = itm.id) INNER JOIN customers cust ON po.customer_id = cust.id) INNER JOIN users usr ON po.salesperson_id = usr.id) ORDER BY po.id ASC", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(results.rows));
      });
    default:
      response.send(JSON.stringify("There was an error passing parameters, please try again."));
  }
};

const update = (request, response) => {
  let type = request.params.type;
  let id = parseInt(request.params.id);

  switch (type) {
    case "user":
      let { first_name, last_name, email } = request.body;

      pool.query(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4",
        [first_name, last_name, email, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).send(JSON.stringify(`User modified with ID: ${id}`));
        }
      );
      break;

    case "manufacturer":
      let { company_name, contact_person, contact_email, contact_phone } = request.body;

      pool.query(
        "UPDATE users SET company_name = $1, contact_person = $2, contact_email = $3, contact_phone = $4 WHERE id = $5",
        [company_name, contact_person, contact_email, contact_phone],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).send(JSON.stringify(`Manufacturer modified with ID: ${id}`));
        }
      );
      break;

    case "customer":
      const { manufacturer_id, date_ordered, customer_id } = request.body;

      pool.query(
        "UPDATE purchase_orders SET manufacturer_id = $1, date_ordered = $2, customer_id = $3, WHERE id = $4",
        [company_name, contact_person, contact_email, contact_phone],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).send(JSON.stringify(`Manufacturer modified with ID: ${id}`));
        }
      );
      break;

    default:
      response.send(JSON.stringify("There was an error passing parameters, please try again."));
  }
};

const deleteCave = (request, response) => {
  let type = request.params.type;
  let id = parseInt(request.params.id);

  switch (type) {
    case "user":
      pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(`User deleted with ID: ${id}`));
      });
      break;

    case "manufacturer":
      pool.query("DELETE FROM manufacturers WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(`Manufacturer deleted with ID: ${id}`));
      });
      break;

    case "purchaseOrder":
      pool.query("DELETE FROM purchase_orders WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(JSON.stringify(`Purchase Order deleted with ID: ${id}`));
      });
      break;

    default:
      response.send(JSON.stringify("There was an error passing parameters, please try again."));
  }
};

const list = (request, response) => {
  let type = request.params.type;

  switch (type) {
    case "users":
      pool.query("SELECT * FROM users;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    case "customers":
      pool.query("SELECT * FROM customers;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    case "items":
      pool.query("SELECT * FROM items;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    case "PurchaseOrders":
      pool.query("SELECT * FROM items_purchorders;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    case "manufacturers":
      pool.query("SELECT * FROM manufacturers;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    case "orders":
      pool.query("SELECT * FROM purchase_orders;", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
      break;

    default:
      response.send(JSON.stringify("There was an error passing parameters, please try again."));
  }
};

// const createPurchaseOrder = (request, response) => {
//   let { manufId, orderDate, custId, items } = request.body;
//   if (manufId && orderDate && custId && items) {
//     pool.query(
//       "INSERT INTO purchase_orders (manufacturer_id, date_ordered, customer_id) VALUES ($1, $2, $3) RETURNING id",
//       [manufId, orderDate, custId],
//       (error, result) => {
//         if (error) {
//           throw error;
//         }
//         let poNum = result.rows[0];
//         items.forEach((item) => {
//           pool.query(
//             "INSERT INTO items_purchorders (item_id, po_id, qty) VALUES ($1, $2, $3)",
//             [item.itemId, poNum, item.qty],
//             (error, result) => {
//               if (error) {
//                 throw error;
//               }
//               response
//                 .status(201)
//                 .send(
//                   JSON.stringify(
//                     `New purchase order with purchase order number of ${poNum} was created.`
//                   )
//                 );
//             }
//           );
//         });
//       }
//     );
//   }
// };

// const updateUser = (resquest, response) => {
//   const id = parseInt(request.params.id);
//   const { first_name, last_name, email } = request.body;

//   pool.query(
//     "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4",
//     [first_name, last_name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(JSON.stringify(`User modified with ID: ${id}`));
//     }
//   );
// };

// const updateManufacturer = (resquest, response) => {
//   const id = parseInt(request.params.id);
//   const { company_name, contact_person, contact_email, contact_phone } = request.body;

//   pool.query(
//     "UPDATE users SET company_name = $1, contact_person = $2, contact_email = $3, contact_phone = $4 WHERE id = $5",
//     [company_name, contact_person, contact_email, contact_phone],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(JSON.stringify(`Manufacturer modified with ID: ${id}`));
//     }
//   );
// };

// const updatePurchaseOrder = (resquest, response) => {
//   const id = parseInt(request.params.id);
//   const { manufacturer_id, date_ordered, customer_id } = request.body;

//   pool.query(
//     "UPDATE purchase_orders SET manufacturer_id = $1, date_ordered = $2, customer_id = $3, WHERE id = $4",
//     [company_name, contact_person, contact_email, contact_phone],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(JSON.stringify(`Manufacturer modified with ID: ${id}`));
//     }
//   );
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(JSON.stringify(`User deleted with ID: ${id}`));
//   });
// };

// const deleteManufacturer = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM manufacturers WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(JSON.stringify(`Manufacturer deleted with ID: ${id}`));
//   });
// };

// const deletePurchaseOrder = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM purchase_orders WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(JSON.stringify(`Purchase Order deleted with ID: ${id}`));
//   });
// };

module.exports = {
  create,
  read,
  update,
  list,
  deleteCave,
  // createUser,
  // createManufacturer,
  // createCustomer,
  // createPurchaseOrder,
  // // createItem,
  // updateUser,
  // updateManufacturer,
  // updatePurchaseOrder,
  // deleteManufacturer,
  // deletePurchaseOrder,
  // deleteUser,
};
