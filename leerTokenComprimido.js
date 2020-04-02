var zlib = require('zlib');
console.log("Ingrese access_token");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
	let token = d.toString().trim();
    let listaToken = token.split('.');
    if (listaToken.length != 3){
    	console.log("El access token no esta completo");
    }
    let head = listaToken[0];
    let body = listaToken[1];
    let buffer = Buffer.from(body,'base64');
    let json = zlib.inflateSync(buffer).toString();
    console.log('\n');
    console.log('JWT BODY: ' + json);
    console.log('\n');
    process.exit();
 });