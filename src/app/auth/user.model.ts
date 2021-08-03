//this model stores all the core data that
// makes up a user and helps us with
//validating if that token is still valid
//tokens are valid for one hour


export class User {

  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenExpDate: Date ){}

  //getter function will return false if the token exp date
  //is in the past, will only return a token if it is still
  //valid
  get token(){
    if(!this._tokenExpDate || new Date() > this._tokenExpDate){
      return null;
    }else{
      return this._token;
    }
  }
}

