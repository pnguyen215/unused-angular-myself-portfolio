export class API {

    static endpoints = {
        authorizationUrl: '/api/v1/login',
        userUrl: '/api/v1/users',
        selfUrl: '/api/v1/self',
    };

    static eSuffix = {
        toAdd: '/new',
        toUpdate: '/update',
        toExclude: '/exclusion',
        toFilter: '/filter',
        toFindAll: '/all',
        toSignIn: '/sign-in',
        toInfo: '/info'
    };
}
