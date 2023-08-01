function checkBody(body, keys) {
  //initialise isValid a true
  let isValid = true;
// boucle sur keys qui est en argument 
  for (const field of keys) {
    // verifie qu'il soit undefined ou vide
    if (!body[field] || body[field] === '') {
      // si les propriéte sont vide ou undefined (false) pass isvalid a false
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };
