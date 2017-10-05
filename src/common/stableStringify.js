/**
 * @noflow
 */

function isObject(mixed) {
  return (
    mixed !== null &&
    Object.prototype.toString.call(mixed) === '[object Object]'
  );
}

/**
 * JSON.stringify doesn't guarantee output ordering (even though in practice it
 * is stable in major engines). Due to paranoia, we have this stable stringifier
 * which I have now written about three times in various projects.
 */
export default function stableStringify(input) {
  const seen = new Set();

  function stringify(mixed) {
    if (seen.has(mixed)) {
      throw new TypeError('Converting circular structure to JSON');
    }
    if (Array.isArray(mixed)) {
      seen.add(mixed);
      const output = [];
      for (let i = 0; i < mixed.length; i++) {
        output.push(stableStringify(mixed[i] === undefined ? null : mixed[i]));
      }
      return '[' + output.join(',') + ']';
    } else if (isObject(mixed)) {
      seen.add(mixed);
      return (
        '{' +
        Object.entries(mixed)
          .sort(([aKey, aValue], [bKey, bValue]) => {
            return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
          })
          .filter(([key, value]) => value !== undefined)
          .map(([key, value]) => JSON.stringify(key) + ':' + stringify(value))
          .join(',') +
        '}'
      );
    } else if (mixed === undefined) {
      return;
    } else {
      // string (or String), integer, Date etc.
      return JSON.stringify(mixed);
    }
  }

  return stringify(input);
}