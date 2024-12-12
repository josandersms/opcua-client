"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableMemory = void 0;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const availableMemory = () => {
    const percentageMemUsed = os_1.default.freemem() / os_1.default.totalmem() * 100.0;
    return percentageMemUsed;
};
exports.availableMemory = availableMemory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2hlbHBlcnMvb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9EQUFvQjtBQUViLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRTtJQUVoQyxNQUFNLGlCQUFpQixHQUFHLFlBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxZQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQy9ELE9BQU8saUJBQWlCLENBQUM7QUFDN0IsQ0FBQyxDQUFBO0FBSlksUUFBQSxlQUFlLG1CQUkzQiJ9