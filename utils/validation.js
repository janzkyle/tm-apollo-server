export function validateCheckinInput(checkIn) {
  // check for no. of hrs input
  const hours = parseFloat(checkIn.split('#')[0]);
  if (!hours) {
    return { err: 'Missing "<number> [hr | hrs]" at the start' };
  }
  // check for tag input
  if (!checkIn.includes('#')) {
    return { err: 'Missing tag starting with #' };
  }
  const temp = checkIn.substring(checkIn.indexOf('#') + 1).split(' ');
  const tag = temp.shift();
  if (!tag) {
    return { err: 'Missing tag' };
  }
  // check for activity tag
  const activity = temp.join(' ');
  if (!activity) {
    return { err: 'Missing activity after tag' };
  }
  return { hours, tag, activity };
}
