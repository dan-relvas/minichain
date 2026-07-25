# MiniChain

## Overview

I had an idea to make a mini blockchain in JS, just for fun. It's a really simple ledger that records a json data payload with sequentially hashed blocks.

## Getting Started

Clone the repo, `npm i` and `npm run test`!

```bash
git clone git@github.com:dan-relvas/minichain.git
```

Or just download the `src/minichain.js` file.


## Next Steps

I have some ideas that I'd like to implement;

- Proof of work using a simple hash mining loop and difficulty setting (possibily switch to bun for speed over node).
- Tidy up the commiting DX, possible a method for just adding blocks before then using another method for commiting and mining them.
- Possbly add a fastify server to act as a validation node, so this could actually be distributed?

