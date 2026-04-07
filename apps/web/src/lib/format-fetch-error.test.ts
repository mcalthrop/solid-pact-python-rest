import { describe, expect, it } from 'vitest';
import { formatFetchError } from './format-fetch-error';

describe('formatFetchError', () => {
  it('returns the message of a plain Error', () => {
    expect(formatFetchError(new Error('oops'))).toBe('oops');
  });

  it('unwraps Error.cause recursively', () => {
    const inner = new Error('inner');
    const outer = new Error('Unknown error', { cause: inner });
    expect(formatFetchError(outer)).toBe('inner');
  });

  it('reads message from a plain object with message', () => {
    expect(formatFetchError({ message: 'from body' })).toBe('from body');
  });

  it('stringifies other values', () => {
    expect(formatFetchError(null)).toBe('null');
    expect(formatFetchError(42)).toBe('42');
  });
});
