var zlib = require('zlib');
var inquirer = require('inquirer');


inquirer.registerPrompt('recursive', require('inquirer-recursive'));
inquirer.prompt([{
    type: 'recursive',
    message: 'deseas descomprimir (DEFLATE) JWT ?',
    name: 'token',
    prompts: [
        {
            type: 'input',
            name: 'access_token',
            message: 'Ingresa access_token',
            validate: function (value) {
                let token = value.toString().trim();
                let listaToken = token.split('.');
                if (listaToken.length === 3) { 
                    let head = listaToken[0];
                    let body = listaToken[1];
                    let buffer = Buffer.from(body,'base64');
                    let json = zlib.inflateSync(buffer).toString();
                    console.log('\n');
                    console.log('JWT BODY: ' + json);
                    console.log('\n');
                    return true;
                }
                return 'access_token con formato incorrecto';
            }
        },
    ]
}]);