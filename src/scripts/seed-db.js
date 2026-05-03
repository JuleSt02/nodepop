import {connectToDB} from '../lib/database.js'
import {User} from '../models/user-model.js'
import {Product} from '../models/product-model.js'

console.log("Initializing SeedDB");

const connection = await connectToDB() 
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('Connected DB:', connection.name);
console.log('Connected host:', connection.host);
console.log(`Connected to MongoDB: ${connection.name}`);

await seedUsers();

await seedProducts();

await connection.close();
process.exit(0);

async function seedUsers() {

    const USERS = [
        {name: "Joe Black", email:"joeblack@gmail.com", password : await User.hashPassword("1111")},
        {name: "Martha Stewart", email:"ms@gmail.com", password : await User.hashPassword('1111')}
    ]

    const deleteAll = await User.deleteMany({});
    console.log(`Deleted [${deleteAll.deletedCount}] User`);

    const insertUsers = await User.insertMany(USERS);
    console.log(`Inserted [${insertUsers.insertedCount}] User`);
    
}


async function seedProducts() { 

    // const jb = await User.findOne({email: "joeblackemail@gmail.com"});
    // const ms = await User.findOne({email:"marthastewart@gmail.com"});
    
    //same same but faster, waits until all promises return
    const [jb, ms] = await Promise.all([
        User.findOne({email: "joeblack@gmail.com"}),
        User.findOne({email:"ms@gmail.com"})
    ]);
    console.log("JB", jb);
    console.log("MS",ms)

    const PRODUCTS = [
        {name: "coat", price: 50, owner: jb._id, tags: ["lifestyle"]},
        {name: "laptop", price: 250, owner: jb._id, tags: ["work" , "lifestyle"]},
        {name: "phone", price: 250, owner: jb._id, tags: ["work" , "lifestyle", "mobile"]},
        {name: "sportscar", price:1500, owner: ms._id, tags: ["lifestyle", "motor"]},
        {name: "keyboard", price: 10, owner: ms._id, tags: ["work"]},
        {name: "blanket", price: 250, owner: ms._id, tags: ["lifestyle"]},
        {name: "phone", price: 350, owner: ms._id, tags: ["mobile"]},
        {name: "desk", price: 180, owner: jb._id, tags: ["work"]},
        {name: "watch", price: 90, owner: jb._id, tags: ["lifestyle"]},
        {name: "tablet", price: 420, owner: jb._id, tags: ["work", "mobile"]},
        {name: "motorbike", price: 2200, owner: jb._id, tags: ["motor", "lifestyle"]},
        {name: "chair", price: 75, owner: ms._id, tags: ["work"]},
        {name: "camera", price: 600, owner: ms._id, tags: ["lifestyle", "work"]},
        {name: "headphones", price: 140, owner: ms._id, tags: ["mobile", "lifestyle"]},
        {name: "jacket", price: 110, owner: ms._id, tags: ["lifestyle"]},
        {name: "truck", price: 3200, owner: ms._id, tags: ["motor"]},
        {name: "monitor", price: 300, owner: jb._id, tags: ["work"]},
                
    ];

    const deleteAll = await Product.deleteMany({})
    console.log(`Deleted [${deleteAll.deletedCount}] Product`);
    const insertProducts = await Product.insertMany(PRODUCTS);

    

}
