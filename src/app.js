import express from 'express'

const app = express()


//Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public'))); //when working with ES modules
app.use(morgan('tiny'));
//Routes

app.get('/', (req, res) => {
  res.send('hello world')
}); 

app.get('/health', (req,res) => {
  res.send("hi")
})

app.get('/product' , (req,res) => {
  res.send("")
})
export default app

