#!/bin/bash

npm init -y
mkdir src
mkdir test

npm i typescript
npm i -D jest
npm i -D ts-jest
npm i -D ts-node
npm i -D @types/jest

echo "{
  \"compilerOptions\": {
    \"module\": \"commonjs\",
    \"noImplicitAny\": true,
    \"removeComments\": true,
    \"preserveConstEnums\": true,
    \"sourceMap\": true,
    \"target\": \"ES6\",
    \"esModuleInterop\": true,
    \"resolveJsonModule\": true,
    \"outDir\": \"dist/\"
  },
  \"include\": [\"src\",\"test\"],
  \"exclude\": [\"node_modules\"]
}
" >> tsconfig.json 

echo "module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
" >> jest.config.js

echo "describe('abc', () => {
  it('cbd', () => {
    expect(1).toBe(1);
  });
});
" >> test/example.test.ts