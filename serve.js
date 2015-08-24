/* 
express - Importing the package and making it accessible in the app through the variable called express
path - Helper package that allows you to tell the app about certain directories 
favicon - Helper package to incorporate a favicon in the app (acts as middleware)
logger - Logs statements of server activity in the console (e.g. request, response)
cookieParser - Parses the cookie header field from the browser (populates the req.cookies field)
bodyParser - Parses the body field from the browser (populates the req.body field with the value of the POST parameters)
routes - Includes the routes/index file in the app (the .js extension for index is optional)
app - Creates a new instance of express called app
*/
var express = require('express'),
    path = require('path'),
    app = express();
    
/* 
Utilizes the path package to make views = StockApp/views
Sets jade as an available template for views 
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// /// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(process.env.APP_PORT || 3000);