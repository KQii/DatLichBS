import db from "../models/index";

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

let postCRUD = (req, res) => {
    console.log(req.body);
    return res.send('post crud from server');
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}