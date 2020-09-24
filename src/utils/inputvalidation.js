
class Validation {
    vallidateName(name) {
      return /^[A-Z]+[a-z1-9]*$/.test(name) && name.length > 4;
    }
    
  }
  
  export default new Validation();