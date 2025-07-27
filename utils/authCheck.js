const admin = require("../db/queries")
const pool = require("../db/pool");


async function authCheck() {
  const user = await admin.retrieveAdminStatus();
  return user.logged_in && user.delete_permission;
}

async function passWordCheck(username, pw) {
    
  const user = await admin.retrieveAdminStatus();
  console.log(`User typed Username: ${username} and password ${pw} but the AdminUsername is ${user.username} with pw ${user.password}`)
  return user.username === username && user.password === pw;
}

module.exports = {
passWordCheck,
authCheck
}
