
var user = require('./postUsers.controller');

module.exports = function (app) {

app.route('/postNews')
    .post(user.createNews);
// app.route('/postNews2')
//     .post(user.create2);
app.route('/postNews3')
    .post(user.sendNews);
    app.route('/postNews/:filename')
    .get(user.read);
app.route('/postNews3/update/:title')
    .post(user.stopDeleteNews);
app.route('/postNews3/updateF/:title')
    .post(user.topicFalseNews);
//////////Show News/////////
app.route('/getNews')
    .get(user.getNews);
app.route('/getNews/it')
    .get(user.getNewsIt);
app.route('/getNews/lib')
    .get(user.getNewsLib);
////////////Delete News/////////////
app.route('/News/delete/:title')
    .delete(user.deleteNews);


///////////////Check USer Online//////////
app.route('/check/role/:username')
    .post(user.checkUsers);
    //////////Count Users Online ///////////
app.route('/checkrole')
    .get(user.getUserOnline);




app.route('/postUsers')
    .post(user.createUsers);
// app.route('/postUsers')
//     .post(user.createUsers);
// app.route('/postUsers/:filename')
//     .get(user.read);
// app.route('/test')
// 	.get(user.test);
// app.route('/g/getUserAdmin')
//     .get(user.getUserAdmin);
app.route('/all/users')
	.get(user.getUserAll);
app.route('/g/:username')
	.get(user.getUser);
app.route('/g/delete/:username')
	.delete(user.deleteUsers);
app.route('/g/update/:username')
	.post(user.updateUsers);
//////////Count Users Online ///////////
// app.route('/g/onlineUsers')
//     .get(user.getUsersOnline);
};