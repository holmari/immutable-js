/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Converts a value to a string, adding quotes if a string was provided.
 */
export default function toString(value) {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  } else if (value == null) {
    return String(value);
  } else if (Array.isArray(value)) {
    const middle = value.length > 0 ? ' ' + value.map(toString) + ' ' : '';
    return 'Array [' + middle + ']';
  } else if (typeof value === 'object') {
    if (value.toString !== Object.prototype.toString && 'toString' in value) {
      return value.toString();
    }
    const middle = Object.keys(value)
      .map(key => `${key}: ${toString(value[key])}`)
      .join(', ');

    const spacedMiddle = middle.length > 0 ? ' ' + middle + ' ' : '';

    return 'Object {' + spacedMiddle + '}';
  }

  try {
    return value.toString();
  } catch (_ignore) {
    return JSON.stringify(value);
  }
}
