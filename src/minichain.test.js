import { describe, expect, it } from 'vitest';

import { MiniChain } from './minichain.js';

describe('during initialisation', () => {
	it('should create genesis block if no chain is passed in', () => {
		const chain = new MiniChain();
		const rawChain = chain.rawChain();

		expect(rawChain).toHaveLength(1);
		expect(rawChain[0].index).toEqual(0);
		expect(rawChain[0].nonce).toEqual(1);
		expect(+new Date() - rawChain[0].timestamp).toBeLessThan(100);
		expect(rawChain[0].previousHash).toEqual(undefined);
		expect(rawChain[0].data).toEqual('genesis');
	})
})

describe('when committing a block', () => {
	it('should add a new block to the chain.', () => {
		const chain = new MiniChain();

		expect(chain.rawChain()).toHaveLength(1);

		chain.commitBlock({ test: true });

		const rawChain = chain.rawChain();
		expect(rawChain).toHaveLength(2);
		expect(rawChain[0].hash).toEqual(rawChain[1].previousHash)
	})
})

describe('when verifying the chain', () => {
	it('should verify blocks', () => {
		const chain = new MiniChain();
		chain.commitBlock({ test: 1 })
		chain.commitBlock({ test: 2 })
		chain.commitBlock({ test: 3 })

		const rawChain = chain.rawChain();
		expect(rawChain).toHaveLength(4);

		const { verified, chainVerififcation } = chain.verifyChain();
		expect(verified).toBe(true);
		expect(chainVerififcation).toHaveLength(4);
	})
})
