const usuarios = [
    {
      "id":  1,
      "function":"admin",
      "username": "Caliu Pina",
      "password": "12345"
    },
    {
      "id":  2,
      "function":"prof",
      "username": "Professor",
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
  
