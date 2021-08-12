export class Validator {
  static isEmailValid(email){
    let resp = true;
    if (!email) resp = false;
    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) resp = false;
    return resp;
  }
  static isPasswordValid(password, rePassword) {
    let resp = false;
    if (!password) resp = false;
    if (!/[a-z]/g.test(password)) resp = false;
    if (!/[A-Z]/g.test(password)) resp = false;
    if (!/[0-9]/g.test(password)) resp = false;
    if (!/[@$!%*?&#]/g.test(password)) resp = false;
    if (password.length < 8) resp = false;
    if (rePassword) {
      if (password !== rePassword) resp = false
    }
    return resp
  }
}

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phonePattern = /^(0|\+33)[1-9]([-.: ]*?[0-9]{2}){4}$/;