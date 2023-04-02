import { CoreSys } from 'app/model/messages/core-sys.message';

export class CatchErrors {

    static onErrors(error: any): string {
        return `${CoreSys.UNABLE_CONNECT_SERVER_MESSAGE} - ${error.message ? error.message : error}`;
    }

    static onErrorsLoggedIn(error: any): string {
        return `${CoreSys.SERVER_UNAVAILABLE_MESSAGE} - ${error.message ? error.message : error}`;
    }

    static onErrorShorten(error: any): string {
        return `${CoreSys.UNABLE_CONNECT_SERVER_MESSAGE}`;
    }
}
