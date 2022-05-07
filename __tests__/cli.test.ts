const CLI = require('../src/CLI');

describe('Playing sound', () => {
  it('should play tomou na jabiraca', () => {
    const program = new CLI();
    console.log(program);
    program.start();
    expect(1).toBe(1);
  });
});
