const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
        .get( catchAsync (campgrounds.index))
        .post( isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new',isLoggedIn, campgrounds.newForm);

router.route('/:id')
        .get(catchAsync(campgrounds.showPage))
        .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updatePage))
        .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteBtn))

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.editBtn))



module.exports = router;