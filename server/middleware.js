var config = require('./config.js');
var jwt = require('jwt-simple')


//Si en la petición HTTP "pet" existe una cabecera "Authorization"
//con el formato "Authorization: Bearer XXXXXX"  
//devuelve el XXXXXX (en JWT esto sería el token)
function getTokenFromAuthHeader(pet) {
  var cabecera = pet.header('Authorization')
  if (cabecera) {
		//Parte el string por el espacio. Si está, devolverá un array de 2
		//la 2ª pos será lo que hay detrás de "Bearer"
		var campos = cabecera.split(' ')
		if (campos.length>1 && cabecera.startsWith('Bearer')) {
			return campos[1]
		}
  }
  return undefined
}

exports.getTokenFromAuthHeader = getTokenFromAuthHeader

exports.checkJWT = function checkJWT(pet,resp,next){
    next();
    // var correcto=false
    // var token = getTokenFromAuthHeader(pet)
    // if(token!=undefined){
    //   try{
    //     var decoded = jwt.decode(token,config.SECRET)
    //     correcto=true
    //   }catch(error){
    //     console.log(error)
    //   }
    // }
    // if (correcto) {
    //     //Al llamar a next, el middleware "deja pasar" a la petición
    //     //llamando al siguiente middleware
    //     next()
    // }
    // else {
    //     resp.statusCode = 401
    //     resp.send({mensaje: "No tienes permiso.", code:401 })
    // }
}
