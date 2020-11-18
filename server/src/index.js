//해당 파일에서만 no-global-assign Eslint 옵션을 비활성화 합니다.
/* eslint-disable no-global-assign */

require('esm')(module /*, options*/)
module.exports = require('./main.js')