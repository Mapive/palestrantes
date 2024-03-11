const usuarios = [
    {
      "id":  1,
      "function":"admin",
      "username": "Admin",
      "password": "12345"
    },
    {
      "id":  2,
      "function":"prof",
      "username": "User",
      "password": "12345"
    }
  ];
  

  export default function validaUser(username, password) {
    for (let i in usuarios) {
      if (username === usuarios[i].username && password === usuarios[i].password) {
        return usuarios[i];
      }
    }
    return null;
  }
  
