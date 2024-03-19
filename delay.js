import chalk from 'chalk';
export const loadingAnimation = (totaltime) => {
  const frameLoading = ['', '読', '読み', '読み込', '読み込み', '読み込み中'];
  let frameIndex = 0;
  let startTime = Date.now();
  return setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    let elapsedTime = Math.floor(Date.now() - startTime);
    let current = totaltime - elapsedTime;
    process.stdout.write(
      chalk.white.italic(
        `waiting delay ${current} ms ${chalk.red(
          `${frameLoading[frameIndex]}`
        )}`
      )
    );
    frameIndex = (frameIndex + 1) % frameLoading.length;
  }, 200);
};
const delay = async (ms) => {
  let remainingms = ms;
  let loading = loadingAnimation(remainingms);
  await new Promise((resolve) => {
    setTimeout(() => {
      clearInterval(loading);
      resolve();
    }, ms);
  });
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
};
export default delay;
