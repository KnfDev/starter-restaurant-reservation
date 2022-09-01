const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  console.log(data)
  res.json ({
    data
  })
}

async function create(req,res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function isOneChar(req, res, next) {
  const {data = {}} = req.body
  const name = data.table_name;
  if(name.length>1){
    return next()
  }
  return next({ status: 400, message: 'table_name must be at least 2 characters'})
}

function isInteger(req,res,next) {
  const {data = {}} = req.body
  if(Number.isInteger(data.capacity)){
    return next()
  }
  return next({ status: 400, message: `capacity must be a number`})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("table_name"),
    isOneChar,
    bodyDataHas("capacity"),
    isInteger,
    asyncErrorBoundary(create)
  ]
}