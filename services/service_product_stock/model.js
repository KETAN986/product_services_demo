var knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'',
        database:'demo'
    },
})
module.exports = {

    async fetch(data,table,...where){

        let lmt = where[1]??[0,100]
        where = where[0] ?? {}
        
        var val = knex.select(knex.raw(data)).offset(lmt[0]).limit(lmt[1])

        
        val.from(table).where(where)

        return val
    },


    async fetch_row(data,table,...where){
        where[1] = [0,1]
        return (await module.exports.fetch(data,table,...where))[0]
    },

    async insert(data,table){
        let val = await knex(table).insert(data)
        return val[0]
    },

    update(data,table,where){
        return knex(table).where(where).update(data)
    },


    del(table,where){
        return knex(table).where(where).delete()
    },
}