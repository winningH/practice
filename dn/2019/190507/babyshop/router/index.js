var router = express.Router();
var index = require('./controller');
var second = require('./controller/second.js');
router.get('/',index);
router.get('/second',second)
modules.exports = router;