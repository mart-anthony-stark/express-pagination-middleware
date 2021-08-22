const express = require('express')
const app = express()

const users = [
    {id: 1, name: 'user 1'},
    {id: 2, name: 'user 2'},
    {id: 3, name: 'user 3'},
    {id: 4, name: 'user 4'},
    {id: 5, name: 'user 5'},
    {id: 6, name: 'user 6'},
    {id: 7, name: 'user 7'},
    {id: 8, name: 'user 8'},
    {id: 9, name: 'user 9'},
    {id: 10, name: 'user 10'},
]

app.get('/users', paginatedResults(users), (req,res)=>{
    res.json(res.paginatedResults)
})


// PAGINATION MIDDLEWARE
function paginatedResults(model){
    return (req,res,next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if(endIndex < model.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }


        results.results = model.slice(startIndex, endIndex)
        res.paginatedResults = results
        next()
    }
}


const PORT = process.env.PORT || 3000
app.listen(PORT, (err)=>{
    if(err) return console.error(err)
    console.log(`Server started ar port ${port}`)
})