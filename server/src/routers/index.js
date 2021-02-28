const koaCombineRouters = require('koa-combine-routers')
const loginApi = require('../api/loginApi')
const regApi = require('../api/regApi')

const router = koaCombineRouters(
    ...loginApi,
    ...regApi
)
module.exports = router