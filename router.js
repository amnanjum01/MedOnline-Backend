const express = require("express");
const router = express.Router();
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const auth = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.customer = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;


/*const auth = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
      const decoded = jwt.verify(token, 'secret');
      req.customer = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
}*/
//as
const addToCart = require("./controllers/addToCart");//check
const deleteCart = require("./controllers/deleteCart");//check
const viewCart = require("./controllers/viewCart");// check
const placeOrder = require("./controllers/placeOrder");// +
const lookup = require("./controllers/lookup");//check
const details = require("./controllers/details");//check
const discardCart = require("./controllers/discardCart");//check
const cancelOrder = require("./controllers/cancelOrder");//check
const signup = require("./controllers/signup");//check1
const login = require("./controllers/login");//check1
const orderHistory= require("./controllers/orderHistory")//check
const customerDetails = require("./controllers/customerDetails")
//aj
const adminlogin = require("./controllers/adminlogin");//DONE
const addmed = require("./controllers/addmed");//DONE
const deletemed = require("./controllers/deletemed");//DONE
const admincancelorder= require("./controllers/admincancelorder");
const processorder = require("./controllers/processorder");//DONE
const completeorder = require("./controllers/completeorder");//DONE
const updateproduct = require("./controllers/updateproduct");//DONE
const getproducts = require('./controllers/getproducts');//DONE
const getproduct = require('./controllers/getproduct')//DONE
const getorder = require('./controllers/getorder')//DONE
const createadmin = require('./controllers/createadmin')//cancel
const getcancelledorders = require('./controllers/getcancelledorders')//DONE
const getcompletedorders = require('./controllers/getcompletedorders');//DONE
const getprocessingorders = require("./controllers/getprocessingorders");//DONE

//as
router.post("/customer/addToCart/:id/:itemAmount", auth, addToCart);
router.patch("/customer/deleteCart/:id/:itemAmount", auth,  deleteCart); 
router.get("/customer/viewCart/", auth, viewCart);
router.post("/customer/placeOrder/", placeOrder); 
router.get("/customer/lookup/:search", lookup);
router.get("/customer/details/:id", details);
router.delete("/customer/discardCart/", auth, discardCart);
router.put("/customer/cancelOrder/:id",auth, cancelOrder); 
router.post("/customer/signup/", signup);
router.post("/customer/login/", login);
router.get("/customer/orderHistory/", auth, orderHistory);
router.get("/customer/customerDetails/", customerDetails);
//aj
router.get('/admin/products',   getproducts)//gets all products
router.get('/admin/product/:id', getproduct)//gets product by product id
router.get('/admin/getorder/:id', getorder)//gets orders by order id
router.get('/admin/getcancelledorders', getcancelledorders)//get all orders that are cancelled
router.get('/admin/getcompletedorders', getcompletedorders)//get all orders that are completed
router.get('/admin/getprocessingorders', getprocessingorders)//get all orders that are processing
router.post('/createadmin', createadmin) //ONLY FOR TESTING THE LOGIN API. It is a setter and there will 
//be no getter because of threat of breaches
router.post('/admin/login',auth, adminlogin)//login api the middleware is in the routers.js file
router.post("/admin/addmed", addmed)//sets products in the product model 
router.delete('/admin/deletemed/:id', deletemed)//delete an medicine entry from the products collection 
router.put('/admin/cancelorder/:id',  admincancelorder)//cancel an order
router.put('/admin/processorder/:id', processorder)//change order status to processing  
router.put('/admin/completeorder/:id', completeorder)//change order status to complete 
router.patch('/admin/updateproduct/:productID', updateproduct)//update product with product id passed 
//in the params and the label changed in the body

module.exports = router;
