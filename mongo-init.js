db.createUser(
  {
      user: "app",
      pwd: "app",
      roles: [
          {
              role: "readWrite",
              db: "prjform"
          }
      ]
  }
);
