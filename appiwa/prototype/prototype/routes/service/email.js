var nodemailer = require('nodemailer');

// Vamos criar a conta que irá mandar os e-mails
var conta = nodemailer.createTransport({
    service: 'Gmail', // Existem outros services, você pode procurar
                      // na documentação do nodemailer como utilizar
                      // os outros serviços
    auth: {
        user: 'rgimenez@dsgsolutions.io', // Seu usuário no Gmail
        pass: 'argregg1;' // A senha da sua conta no Gmail :-)
    }
});

conta.sendMail({
    from: 'Rodrigo Gimenez <rgimenez@dsgsolutions.io>', // Quem está mandando
    to: 'Yo <rodrigo.gimenezgiaimo@gmail.com>', // Para quem o e-mail deve chegar
    subject: 'es una prueba desde express 4', // O assunto
    html: '<strong>Hola!</strong><p>Sea paciente lo molestaremos por un tiempo</p>', // O HTMl do nosso e-mail
}, function(err){
    if(err)
        throw err;

    console.log('E-mail enviado!');
});