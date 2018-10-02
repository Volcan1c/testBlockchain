let {newInfo, BlockF, blockChainF} = require("./Block.js");

let Block = BlockF();
let blockChain = blockChainF();
let newBlockInfo = newInfo();

// console.log(blockChain);

window.onload = function() {
    let button = document.querySelector("#newBlock");
    button.addEventListener("click", () => {
        let newBlock = blockChain[blockChain.length-1].mineNewBlock(newBlockInfo.merkleH[blockChain.length],newBlockInfo.comment[blockChain.length],newBlockInfo.date[blockChain.length]);
        blockChain.push(newBlock);
        let newText = "";
        blockChain.forEach((block, index) => {
            newText += `<div class="block">
                <p>Block${index}</p>
                <p>Block Hash: ${block.newHash}</p>
                <p>Prev. Block Hash: ${block.prevHash}</p>
                <p>Message: ${block.comment}</p>
                <p>Nonce: ${block.nonce}</p>
                </div>`;
        })
        let removing = document.querySelector(".bigDiv");
        removing.parentNode.removeChild(removing);
        let newElement = document.createElement("div");
        newElement.classList.add("bigDiv")
        newElement.innerHTML = newText;
        document.body.appendChild(newElement);
    })
}