function validateLoginUserData(userData) {
  return (
    !!userData &&
    typeof userData.login === 'string' &&
    typeof userData.password === 'string'
  );
}

module.exports = validateLoginUserData;
