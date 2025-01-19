import { TestSuite } from './TestSuite';

const miniJest = new TestSuite();
const describe = miniJest.describe.bind(miniJest);
const it = miniJest.it.bind(miniJest);
const expect = miniJest.expect.bind(miniJest);

// 모든 테스트가 등록된 후 다음 틱에서 실행
setTimeout(async () => {
  await miniJest.runTests();
}, 0);

export {
  describe,
  it,
  expect,
};
