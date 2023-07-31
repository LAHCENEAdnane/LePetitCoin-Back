function checkBody(body, keys) {
  //initialise isValid a true
  let isValid = true;
  
  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };
