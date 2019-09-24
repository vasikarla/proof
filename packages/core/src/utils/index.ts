export type TestMatcherFunction = (s: string) => boolean;

export function createMatcher(match: string | string[]): TestMatcherFunction {
  const matches = Array.isArray(match) ? match : [match];
  return (name: string) => {
    for (const m of matches) {
      if (name.match(m) !== null) {
        return true;
      }
    }

    return false;
  };
}

export async function promiseRetry<T>(
  promiseGenerator: () => Promise<T>,
  retryCount: number,
  onFail?: (err: Error, retriesLeft: number) => void
): Promise<T> {
  if (retryCount < 1) {
    return promiseGenerator();
  }

  try {
    return await promiseGenerator();
  } catch (err) {
    onFail && onFail(err, retryCount);
    return promiseRetry(promiseGenerator, retryCount - 1, onFail);
  }
}

export { default as inflate } from './inflateTests';
