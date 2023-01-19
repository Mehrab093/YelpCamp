const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b1637f628e682f36b3293a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur expedita error magnam quam molestiae quibusdam tempore necessitatibus saepe aliquid iusto! Incidunt animi minus assumenda aut. Voluptatem consequuntur atque sed tempore!',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
               ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/drl06adjl/image/upload/v1673513682/YelpCamp/frbtxdsdqriln2yv6bhc.jpg',
                  filename: 'YelpCamp/boyed1zvzh6utwp8ydzu',
                },
                {
                  url: 'https://res.cloudinary.com/drl06adjl/image/upload/v1673514612/YelpCamp/lxshrbzjw2i5ls0raaex.jpg',
                  filename: 'YelpCamp/boyed1zvzh6utwp8ydzu',
                },
              ],
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
})