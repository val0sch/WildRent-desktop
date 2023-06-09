import jwt_decode from "jwt-decode";

function checkIsAdmin(token:string) {

    if (token) {
        const jwtTokenDecoded:any = jwt_decode(token);
        // console.log("jwtTokenDecoded : ",jwtTokenDecoded);
    
        const isAdmin = jwtTokenDecoded.isAdmin;
        // console.log("isAdmin : ",isAdmin);
    
        return isAdmin;
      }
}
export default checkIsAdmin;