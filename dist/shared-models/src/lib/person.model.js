"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSchema = void 0;
const zod_1 = require("zod");
// Define schema to validate structure of a person object
exports.PersonSchema = zod_1.z.object({
    name: zod_1.z.string(),
    birth_year: zod_1.z.string(),
    homeworld: zod_1.z.string(),
    homeworld_terrain: zod_1.z.string(),
});
//# sourceMappingURL=person.model.js.map