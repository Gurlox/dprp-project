var User = function (data) {
   this.data = data;
}

User.prototype.data = {}

User.prototype.changeName = function (name) {
   this.data.name = name;
}

module.exports = user;
