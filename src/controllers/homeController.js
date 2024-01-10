import db from "../models/index";
import CRUDService from "../services/CRUDService";

// Lấy dữ liệu tốn nhiều thời gian => xử lý bất đồng bộ dùng async, await
let getHomePage = async (req, res) => {
    // Kết nối đến DB phải dùng try catch
    try {
        let data = await db.User.findAll();
        console.log("--------------------------------------------------------");
        console.log(data);
        console.log("--------------------------------------------------------");
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.redirect('/get-crud');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log("--------------------------------------------------------");
    console.log(data);
    console.log("--------------------------------------------------------");

    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log("--------------------------------------------------------");
        console.log(userData);
        console.log("--------------------------------------------------------");
        return res.render('editCRUD.ejs', {
            user: userData,
        });
    } else {
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    // return res.render('displayCRUD.ejs', {
    //     dataTable: allUsers
    // });
    return res.redirect('/get-crud');
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUsers = await CRUDService.deleteUserById(userId);
        // console.log("--------------------------------------------------------");
        // console.log(allUsers);
        // console.log("--------------------------------------------------------");
        return res.redirect('/get-crud');
    } else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}