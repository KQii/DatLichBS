import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // client chỉ được lấy file trong thư mục public
    app.set("view engine", "ejs"); // view engine cho phép code logic trong file html(if else, for, ...)
    app.set("views", "./src/views");
};

module.exports = configViewEngine;