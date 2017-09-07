export const CONFIG:object = {
    // Por defecto es logo
    logo: "Empresa", 
    // Por defecto será localhost:3000
    apiSecurity:{
        host: 'localhost',
        port: 62073
    },
    // Todas las configuraciones para el sub-módulo de authentication
    authentication: {
        // Ruta inicial a la que redirige despues de registrarse
        routeInitial: 'home',
        // Configuración para el formulario de sign up
        signUpOpts:{
            fields:[
                {
                    name: 'Name'
                },
                {
                    name: 'Phone'
                },
                {
                    name: 'Email'
                }
            ]
        },
        // Configuración necesaria para el Auth0 y entrar con facebook
        configAuth0: {
            clientID: 'KwrIKkQyMkNsz0cRkCxZZU5isX8v7OJs',
            domain: 'yording.auth0.com',
            callbackURL: 'http://localhost:4200/callback'
        }
    },
    authorization: {
        // Credenciales de administrador
        user: 'Yording', // por defecto Admin
        password: '123', // por defecto Admin2017*
        
    
    }
}