let {newInfo, BlockF, blockChainF} = require("./Block.js");

let Block = BlockF();
let blockChain = blockChainF();
let newBlockInfo = newInfo();

console.log(blockChain);