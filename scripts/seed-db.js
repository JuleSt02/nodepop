import {connectToDB} from './lib/database.js'
import {User} from './models/user-models.js'
import {Product} from './models/product-models.js'

console.log("Initializing SeedDB");

const connection = await connecToDB();
console.log(`Connected to MongoDB: ${connection.name}`);

await seedUsers();
await seedProducts();

await connection.close();
process.exit(0);

async function seedUsers() {

    const USERS = [
        {name: "Joe Black", email:"joeblack@gmail.com"},
        {name: "Martha Stewart", email:"marthastewart@hotmail.com"}
    ]

    const deleteAll = await User.deleteMany({});
    console.log(`Deleted [${deleteAll.deletedCount}] User`);

    const insertUsers = await User.insertMany(USERS);
}

async function seedProducts() { 

    // const jb = await User.findOne({email: "joeblackemail@gmail.com"});
    // const ms = await User.findOne({email:"marthastewart@gmail.com"});
    
    //same same but faster, waits until all promises return
    const [jb, ms] = await Promise.all([
        User.findOne({email: "joeblackemail@gmail.com"}),
        User.findOne({email:"marthastewart@gmail.com"})
    ]);

    const PRODUCTS = [
        {name: "coat", price: 50, owner: jb._id, tag: ["lifestyle"]},
        {name: "laptop", price: 250, owner: jb._id, tag: ["work" , "lifestyle"]},
        {name: "phone", price: 250, owner: jb._id, tag: ["work" , "lifestyle", "mobile"]},
        {name: "sportscar", price:1500, owner: ms._id, tag: ["lifestyl", "motor"]},
        {name: "keyboard", price: 10, owner: ms._id, tag: ["work"]},
        {name: "blanket", price: 250, owner: ms._id, tag: ["lifestyle"]},
    ];

    const deleteAll = await Product.deleteMany({})
    console.log(`Deleted [${deleteAll.deletedCount}] Product`);
    const insertUsers = await User.insertMany(PRODUCUTS);

    

}
