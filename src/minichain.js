import { sha256 } from 'js-sha256';

/**
 * This minichain is a simple implementation of crypographically verifiable chain of committed blocks.
 */
class MiniChain {
	constructor(chain = undefined) {
		if (chain) {
			this.chain = chain;
		} else {
			const genesisBlock = {
				index: 0,
				nonce: 1,
				timestamp: +new Date(),
				previousHash: undefined,
				data: 'genesis'
			}
			const genesisBlockHashed = this.hashBlock(genesisBlock)

			this.chain = [
				genesisBlockHashed
			]
		}
	}

	commitBlock(data) {
		const previousBlock = this.chain[this.chain.length - 1];
		const newBlock = {
			index: this.chain.length,
			nonce: previousBlock.nonce + 1,
			timestamp: +new Date(),
			previousHash: previousBlock.hash,
			data: data
		}
		const hashedBlock = this.hashBlock(newBlock);
		this.chain.push(hashedBlock)
	}

	verifyChain() {
		let chainVerififcation = []
		let previousBlock;
		for (const currentBlock of this.chain) {
			const { hash: currentBlockHash } = this.hashBlock(currentBlock)

			if (currentBlockHash !== currentBlock.hash) return { verified: false, chainVerififcation };

			if (previousBlock) {
				const { hash: previousBlockHash } = this.hashBlock(previousBlock)
				if (previousBlockHash !== currentBlock.previousHash) return { verified: false, chainVerififcation };
			}

			chainVerififcation.push({ index: currentBlock.index, verified: true });

			previousBlock = currentBlock;
		}

		return { verified: true, chainVerififcation };
	}

	hashBlock(_block) {
		const block = structuredClone(_block);
		delete block.hash;
		const blockJson = JSON.stringify(block);
		const hash = sha256(blockJson);
		return { ...block, hash };
	}

	rawChain() {
		return this.chain;
	}
}

export { MiniChain };
