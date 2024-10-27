/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getPeople(page = 1, filter = '') {
        return this.appService.getPeople(page, filter);
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('page')),
    tslib_1.__param(1, (0, common_1.Query)('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AppController.prototype, "getPeople", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)('people'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(7));
const person_model_1 = __webpack_require__(8);
let AppService = class AppService {
    constructor() {
        this.BASE_URL = 'https://www.swapi.tech/api/people';
    }
    async getPeople(page, filter) {
        try {
            const response = await axios_1.default.get(`${this.BASE_URL}?page=${page}`);
            const people = response.data.results;
            const peopleWithHomeworld = await Promise.all(people.map(async (person) => {
                const personDetailResponse = await axios_1.default.get(person.url);
                const personDetails = personDetailResponse.data.result.properties;
                if (!this.isValidUrl(personDetails.homeworld)) {
                    throw new common_1.NotFoundException(`Invalid homeworld URL for person: ${personDetails.name}`);
                }
                const homeworldResponse = await axios_1.default.get(personDetails.homeworld);
                const homeworld = homeworldResponse.data.result.properties;
                return person_model_1.PersonSchema.parse({
                    name: personDetails.name,
                    birth_year: personDetails.birth_year,
                    homeworld: homeworld.name,
                    homeworld_terrain: homeworld.terrain,
                });
            }));
            // Filtering based on the provided query
            const filteredPeople = peopleWithHomeworld.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
            return filteredPeople;
        }
        catch (error) {
            console.error('Error fetching people:', error);
            if (error.response) {
                throw new common_1.InternalServerErrorException(`Error fetching data from SWAPI: ${error.response.status} - ${error.response.statusText}`);
            }
            else {
                throw new common_1.InternalServerErrorException('Error fetching people due to a network issue or unexpected response');
            }
        }
    }
    isValidUrl(url) {
        try {
            if (!/^https?:\/\//.test(url)) {
                throw new Error("URL is not absolute");
            }
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonSchema = void 0;
const zod_1 = __webpack_require__(9);
exports.PersonSchema = zod_1.z.object({
    name: zod_1.z.string(),
    birth_year: zod_1.z.string(),
    homeworld: zod_1.z.string(),
    homeworld_terrain: zod_1.z.string(),
});


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("zod");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;