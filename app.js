let sha256 = require('js-sha256');

class Block {
	constructor(merkleH, comment, nonce, date, prevHash, newHash) {
		this.merkleH = merkleH;
		this.comment = comment;
		this.nonce = nonce;
		this.date = date;
		this.prevHash = prevHash;
		this.newHash = newHash;
	}

	hash(merkleH, comment, nonce, date, prevHash) {
		let message = merkleH + comment + nonce + date + prevHash;
		return sha256(message);
	}

	createNewBlock(merkleH, comment, nonce, date) {
		let newHash = this.hash(merkleH, comment, nonce, date, this.newHash);
		let newBlock = new Block(merkleH, comment, nonce, date, this.newHash, newHash);
		return newBlock;
	}

	verifyHash() {
		console.log(this.merkleH, this.comment, this.nonce, this.date, this.prevHash);
		return this.hash(this.merkleH, this.comment, this.nonce, this.date, this.prevHash) === this.newHash;
	}

}

let now = Date.now();
let block1 = new Block("abc", "genesis", "12345", now, " ", sha256("abc"+"genesis"+"12345"+now+" "));
console.log(block1.newHash);
console.log(block1.verifyHash());

now = Date.now();
block2 = block1.createNewBlock("bca", "hello", "12346", now);
console.log(block2);
console.log(block2.verifyHash());

let blockChain = [block1,block2];

let newBlockInfo = {
	merkleH: ["asdf", "dasf", "adse", "jjlo", "proj", "band", "sdfq", "haha", "heyn", "jojo"],
	comment: ["block3", "block4","block5","block6","block7","block8","block9","block10","block11","block12"],
	nonce: ["1234","2345","3456","4567","5678","6789","7890","8901","9012","0123"],
	date: [Date.now()+1,Date.now()+2,Date.now()+3,Date.now()+4,Date.now()+5,Date.now()+6,Date.now()+7,Date.now()+8,Date.now()+9,Date.now()+10]
}
for (i=0; i<10; i++) {
	blockChain.push(blockChain[blockChain.length - 1].createNewBlock(newBlockInfo.merkleH[i],newBlockInfo.comment[i],newBlockInfo.nonce[i],newBlockInfo.date[i]));
}

console.log(blockChain);