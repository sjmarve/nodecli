let exec = require('child_process').exec;

let cli = (args, cwd) => new Promise(resolve => { 
    exec(`node index '${args}'`,
      { cwd }, 
      (error, stdout, stderr) =>  {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        })
      })
});

// test for 'royal flush'
test("Result should be 'royal flush'", async () => {
  let result = await  cli('AS, KS, QS, JS, 10S', '.');
  expect(result.stdout.trim()).toBe('royal flush');
})

// test for 'straight flush'
test("Result should be 'straight flush'", async () => {
  let result = await  cli('AS, 2S, 3S, 4S, 5S', '.');
  expect(result.stdout.trim()).toBe('straight flush');
})

// test for 'four of a kind'
test("Result should be 'four of a kind'", async () => {
  let result = await  cli('AS, 10C, 10H, 10D, 10S', '.');
  expect(result.stdout.trim()).toBe('four of a kind');
})

// test for 'full house'
test("Result should be 'full house'", async () => {
  let result = await  cli('6S, 6H, 6D, KC, KH', '.');
  expect(result.stdout.trim()).toBe('full house');
})

// test for 'flush'
test("Result should be 'flush'", async () => {
  let result = await  cli('JD, 9D, 8D, 4D, 3D', '.');
  expect(result.stdout.trim()).toBe('flush');
})

// test for 'straight'
test("Result should be 'straight'", async () => {
  let result = await  cli('10D, 9S, 8H, 7D, 6C', '.');
  expect(result.stdout.trim()).toBe('straight');
})

// test for 'three of a kind'
test("Result should be 'three of a kind'", async () => {
  let result = await  cli('AS, 10C, 10H, 10D, 3S', '.');
  expect(result.stdout.trim()).toBe('three of a kind');
})

// test for 'two pair'
test("Result should be 'two pair'", async () => {
  let result = await  cli('AS, 10C, 10H, 3D, 3S', '.');
  expect(result.stdout.trim()).toBe('two pair');
})

// test for 'one pair'
test("Result should be 'one pair'", async () => {
  let result = await  cli('AS, 9C, 10H, 3D, 3S', '.');
  expect(result.stdout.trim()).toBe('one pair');
})

// test for 'high card'
test("Result should be 'high card'", async () => {
  let result = await  cli('KD, QD, 7S, 4S, 3H', '.');
  expect(result.stdout.trim()).toBe('high card');
})
