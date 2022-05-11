/**
 *
 * @param {object} attributes JSON attribuites
 * @returns a JSON object
 */
export default function createJSON<T>(attributes: T) {
  const object = {};

  return JSON.stringify(object);
}
