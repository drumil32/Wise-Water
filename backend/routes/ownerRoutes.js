const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
const {profile} = require('../controllers/ownerController/profile');
const {showWorkerApplications} = require('../controllers/ownerController/showWorkerApplications');
const {hireWorker} = require('../controllers/ownerController/hireWorker');
const {showPendingOrders} = require('../controllers/ownerController/showPendingOrders');
const {showAssignedOrders} = require('../controllers/ownerController/showAssignedOrders');
const {assignOrder} = require('../controllers/ownerController/assignOrder');
const {protect} = require('../middleware/authMiddlerware');
const {showWorkers} = require('../controllers/ownerController/showWorkers');
const { inQueryOrder } = require('../controllers/ownerController/inQueryOrders');
const { getInQueryOrder } = require('../controllers/ownerController/getInQueryOrder');
const { getOrder } = require('../controllers/ownerController/getOrder');
const { reAssignOrder } = require('../controllers/ownerController/reAssignnOrder');
const { moveToPending } = require('../controllers/ownerController/moveToPending');
const { fetchCustomer } = require('../controllers/ownerController/fetchCustomer');

router.post('/register',registerUser);
router.get('/profile',protect,profile);
router.get('/showWorkerApplications',protect,showWorkerApplications);
router.post('/hire-worker',protect,hireWorker);
router.get('/show-pending-orders',protect,showPendingOrders);
router.post('/assign-order',protect,assignOrder);
router.get('/show-assigned-orders',protect,showAssignedOrders);
router.get('/show-workers',protect,showWorkers);
router.post('/show-in-query-orders',protect,inQueryOrder);
router.post('/resolve-in-query-orders',protect,getInQueryOrder);
router.post('/get-order',protect,getOrder);
router.post('/reassign-order',protect,reAssignOrder);
router.post('/move-to-pending-order',protect,moveToPending);
router.post('/fetch-customer',protect,fetchCustomer);
router.get('/authenticate',protect,(req,res)=>{
    console.log('owner in atuhencated')
    res.json({message:'done'});
})

module.exports = router;