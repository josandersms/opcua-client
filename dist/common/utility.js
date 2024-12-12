"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncForEach = void 0;
const asyncForEach = async (input, next) => {
    for (let i = 0; i < input.length; i++) {
        await next(input[i], i, input);
    }
};
exports.asyncForEach = asyncForEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vdXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFjTyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsS0FBWSxFQUFFLElBQVMsRUFBaUIsRUFBRTtJQUN6RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQUpZLFFBQUEsWUFBWSxnQkFJeEIifQ==