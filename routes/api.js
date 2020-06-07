var express = require("express");
var userRouter = require("./user");
var productRouter = require("./product");
var orderRouter = require("./order");
var orderLogRouter = require("./orderLog");
var colorRouter = require("./color");
var customerRouter = require("./customer");
var unitRouter = require("./unit");
var userRoleRouter = require("./userRole");

var app = express();

app.use("/user/", userRouter);
app.use("/product/", productRouter);
app.use("/order/", orderRouter);
app.use("/log/", orderLogRouter);
app.use("/color/", colorRouter);
app.use("/customer/", customerRouter);
app.use("/unit/", unitRouter);
app.use("/role/", userRoleRouter);

module.exports = app;