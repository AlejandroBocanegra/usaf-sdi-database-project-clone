const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const db = require('./queries');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* Get boilerplate:

app.get"/", (req,res) => {

})
?query - req.query.[KEY]
:id - req.params.[KEY]

app.post("/", (req,res) => {
    req.body.id ........

    res.sendStatus(200)
})

*/

// Create
app.post('/create/:type', db.create)

// Read
app.get('/read/:type', db.read)

// Update
app.post('/update/:type', db.update)
// app.post('/updateUser', db.updateUser);
// app.post('/updateManufacturer', db.updateManufacturer);
// app.post('/updateCustomer', db.updatePurchaseOrder);

// Delete
app.delete('/delete/:type', db.deleteCave)
// app.delete('/deleteUser/:id', db.deleteUser);
// app.delete('/deleteManufacturer', db.deleteManufacturer);
// app.delete('/deletePurchaseOrder', db.deletePurchaseOrder);

// List
app.get('/list/:caveType', db.list)
// app.get('/caveOfUsers', db.showUsersTable);
// app.get('/caveOfCustomers', db.showCustomersTable);
// app.get('/caveOfItems', db.showItemsTable);
// app.get('/caveOfItemsPurchaseOrders', db.showitems_purchordersTable );
// app.get('/caveOfManufacturers', db.showManfacturersTable);
// app.get('/caveOfWonders', db.showpurchase_ordersTable );

const port = 9000;
app.listen(port, () => 
    console.log(`Database Project API listening on http://localhost:${port}`))
// database called commerce