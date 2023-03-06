export interface ResponseParams {
    statusCode: number;
    body: any;
}

export interface GatewayResponse {
    statusCode: number;
    body: string;
}

export class ProxyResponse {
    #params: ResponseParams;
    constructor(params: ResponseParams) {
        this.#params = params;
    }
    build(): GatewayResponse {
        this.#params.body = JSON.stringify(this.#params.body);
        return this.#params;
    }
}
