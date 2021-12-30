"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
var express_1 = __importDefault(require("express"));
var apiRouter = require('./api');
var router = express_1.default.Router();
router.use('/api', apiRouter);
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    var path_1 = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', function (req, res) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path_1.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
    // Serve the static assets in the frontend's build folder
    router.use(express_1.default.static(path_1.resolve("../frontend/build")));
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, function (req, res) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path_1.resolve(__dirname, '../../../dist/frontend', 'build', 'index.html'));
    });
}
else { // in development
    router.get('/api/csrf/restore', function (req, res) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}
;
module.exports = router;
