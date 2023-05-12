const multer = require('multer');
const {  userProfile, 
    logout, uploadByLink, uploadPhoto, 
    addPlace, viewPlaces, viewPlaceById, editPlace,
    viewAllPlaces, bookingsPost, bookingsGet } = require('../controller/controllers');

const {userRegister, userLogin} = require('../controller/authController');

const router = require('express').Router();

router.post("/register", userRegister);

router.post("/login", userLogin );

router.get("/profile", userProfile );

router.post("/logout", logout);

router.post("/upload-by-link", uploadByLink );

const photosMiddleware = multer({ dest: "uploads/" });
router.post("/upload", photosMiddleware.array("photos", 100), uploadPhoto);

router.post("/places", addPlace);

router.get("/user-places/:userId", viewPlaces);

router.get("/places/:id", viewPlaceById);

router.put("/places", editPlace);

router.get("/places", viewAllPlaces);

router.post("/bookings", bookingsPost);

router.get("/bookings", bookingsGet);

module.exports = router


