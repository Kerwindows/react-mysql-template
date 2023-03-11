const db = require("./config/db");

/*--------FUNCTIONS-----*/
//function to get all post
async function getUsers() {
  const [rows] = await db.query("SELECT *, NULL AS Password FROM users");
  return rows;
}

// function to get one post
async function getUser(username) {
  const [rows] = await db.query(
    "SELECT *, NULL AS Password FROM users WHERE username = ?",
    [username]
  );
  return rows[0];
}

// function to get one post
async function getLinks(id) {
  const [rows] = await db.query("SELECT * FROM links WHERE `UniqueID` = ?", [
    id,
  ]);
  return rows;
}
// function to get one post
async function getFiles(id) {
  const [rows] = await db.query("SELECT * FROM files WHERE `UniqueID` = ?", [
    id,
  ]);
  return rows;
}
//function to create post
async function regUser(data) {
  const firstname = data.firstname;
  const lastname = data.lastname;
  const job = data.job;
  const organization = data.organization;
  const industry = data.industry;

  const result = await db.query(
    "INSERT INTO users (FirstName, LastName, Job, Organization, IndustryType) VALUES (?,?,?,?,?)",
    [firstname, lastname, job, organization, industry],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  return result;
}

//function to update user
async function updateUser(data, username) {
  const firstname = data.firstname;
  const lastname = data.lastname;
  const job = data.job;
  const organization = data.organization;
  const industry = data.industry;
  const result = await db.query(
    "UPDATE users SET FirstName = ? , LastName = ? , Job = ? , Organization = ? , IndustryType = ?  WHERE Username = ?",
    [firstname, lastname, job, organization, industry, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  return result;
}

//function to update bio
async function updateBio(data, username) {
  const bio = data.bio;
  const result = await db.query(
    "UPDATE users SET Bio = ? WHERE Username = ?",
    [bio, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  return result;
}

//function to create post
async function deleteUser(id) {
  const result = await db.query(
    "DELETE FROM posts WHERE id= ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  regUser,
  updateUser,
  deleteUser,
  getLinks,
  getFiles,
  updateBio,
};
