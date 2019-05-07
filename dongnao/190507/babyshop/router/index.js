var router = express.Router();
var index = require('./controller/index.js');
var second = require('./controller/second.js');
router.get('/',index);
router.get('/second',second)
modules.exports = router;