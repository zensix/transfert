db.createUser(
  {
      user: "app",
      pwd: "app",
      roles: [
          {
              role: "readWrite",
              db: "projectform"
          }
      ]
  }
);

db.users.insert({username:"admin", password: '$2b$10$TKbQyA8z6ajqIyhi/LZkGeIqqNaoPCf0it4QzUSDqwzxlItgQSvFG',active: true,admin:true})