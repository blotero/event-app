var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/product/ProductService.ts
var ProductService_exports = {};
__export(ProductService_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(ProductService_exports);

// src/business/ServiceCallbackMap.ts
var ServiceCallbackMap = class {
  data;
  constructor() {
    this.data = /* @__PURE__ */ new Map();
  }
  async processEvent(serviceDescriptor, event) {
    const processor = this.data.get(serviceDescriptor);
    return processor(event);
  }
};

// node_modules/@middy/core/index.js
var import_promises = require("node:timers/promises");
var defaultLambdaHandler = () => {
};
var defaultPlugin = {
  timeoutEarlyInMillis: 5,
  timeoutEarlyResponse: () => {
    throw new Error("Timeout");
  }
};
var middy = (lambdaHandler = defaultLambdaHandler, plugin = {}) => {
  if (typeof lambdaHandler !== "function") {
    plugin = lambdaHandler;
    lambdaHandler = defaultLambdaHandler;
  }
  plugin = {
    ...defaultPlugin,
    ...plugin
  };
  plugin.timeoutEarly = plugin.timeoutEarlyInMillis > 0;
  plugin.beforePrefetch?.();
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];
  const middy2 = (event = {}, context = {}) => {
    plugin.requestStart?.();
    const request = {
      event,
      context,
      response: void 0,
      error: void 0,
      internal: plugin.internal ?? {}
    };
    return runRequest(request, [
      ...beforeMiddlewares
    ], lambdaHandler, [
      ...afterMiddlewares
    ], [
      ...onErrorMiddlewares
    ], plugin);
  };
  middy2.use = (middlewares) => {
    if (!Array.isArray(middlewares)) {
      middlewares = [
        middlewares
      ];
    }
    for (const middleware of middlewares) {
      const { before, after, onError } = middleware;
      if (!before && !after && !onError) {
        throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
      }
      if (before)
        middy2.before(before);
      if (after)
        middy2.after(after);
      if (onError)
        middy2.onError(onError);
    }
    return middy2;
  };
  middy2.before = (beforeMiddleware) => {
    beforeMiddlewares.push(beforeMiddleware);
    return middy2;
  };
  middy2.after = (afterMiddleware) => {
    afterMiddlewares.unshift(afterMiddleware);
    return middy2;
  };
  middy2.onError = (onErrorMiddleware) => {
    onErrorMiddlewares.unshift(onErrorMiddleware);
    return middy2;
  };
  middy2.handler = (replaceLambdaHandler) => {
    lambdaHandler = replaceLambdaHandler;
    return middy2;
  };
  return middy2;
};
var runRequest = async (request, beforeMiddlewares, lambdaHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  let timeoutAbort;
  const timeoutEarly = plugin.timeoutEarly && request.context.getRemainingTimeInMillis;
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin);
    if (typeof request.response === "undefined") {
      plugin.beforeHandler?.();
      const handlerAbort = new AbortController();
      if (timeoutEarly)
        timeoutAbort = new AbortController();
      request.response = await Promise.race([
        lambdaHandler(request.event, request.context, {
          signal: handlerAbort.signal
        }),
        timeoutEarly ? (0, import_promises.setTimeout)(request.context.getRemainingTimeInMillis() - plugin.timeoutEarlyInMillis, void 0, {
          signal: timeoutAbort.signal
        }).then(() => {
          handlerAbort.abort();
          return plugin.timeoutEarlyResponse();
        }) : Promise.race([])
      ]);
      timeoutAbort?.abort();
      plugin.afterHandler?.();
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (e) {
    timeoutAbort?.abort();
    request.response = void 0;
    request.error = e;
    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (e2) {
      e2.originalError = request.error;
      request.error = e2;
      throw request.error;
    }
    if (typeof request.response === "undefined")
      throw request.error;
  } finally {
    await plugin.requestEnd?.(request);
  }
  return request.response;
};
var runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    plugin.beforeMiddleware?.(nextMiddleware.name);
    const res = await nextMiddleware(request);
    plugin.afterMiddleware?.(nextMiddleware.name);
    if (typeof res !== "undefined") {
      request.response = res;
      return;
    }
  }
};
var core_default = middy;

// node_modules/@middy/util/index.js
var jsonSafeParse = (text, reviver) => {
  if (typeof text !== "string")
    return text;
  const firstChar = text[0];
  if (firstChar !== "{" && firstChar !== "[" && firstChar !== '"')
    return text;
  try {
    return JSON.parse(text, reviver);
  } catch (e) {
  }
  return text;
};
var normalizeHttpResponse = (request) => {
  let { response } = request;
  if (typeof response === "undefined") {
    response = {};
  } else if (typeof response?.statusCode === "undefined" && typeof response?.body === "undefined" && typeof response?.headers === "undefined") {
    response = {
      statusCode: 200,
      body: response
    };
  }
  response.statusCode ??= 500;
  response.headers ??= {};
  request.response = response;
  return response;
};
var createErrorRegexp = /[^a-zA-Z]/g;
var HttpError = class extends Error {
  constructor(code, message, options = {}) {
    if (message && typeof message !== "string") {
      options = message;
      message = void 0;
    }
    message ??= httpErrorCodes[code];
    super(message, options);
    const name = httpErrorCodes[code].replace(createErrorRegexp, "");
    this.name = name.substr(-5) !== "Error" ? name + "Error" : name;
    this.status = this.statusCode = code;
    this.expose = options.expose ?? code < 500;
  }
};
var createError = (code, message, properties = {}) => {
  return new HttpError(code, message, properties);
};
var httpErrorCodes = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "(Unused)",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Unordered Collection",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};

// node_modules/@middy/http-error-handler/index.js
var defaults = {
  logger: console.error,
  fallbackMessage: null
};
var httpErrorHandlerMiddleware = (opts = {}) => {
  const options = {
    ...defaults,
    ...opts
  };
  const httpErrorHandlerMiddlewareOnError = async (request) => {
    if (request.response !== void 0)
      return;
    if (typeof options.logger === "function") {
      options.logger(request.error);
    }
    if (request.error.statusCode && request.error.expose === void 0) {
      request.error.expose = request.error.statusCode < 500;
    }
    if (options.fallbackMessage && (!request.error.statusCode || !request.error.expose)) {
      request.error = {
        statusCode: 500,
        message: options.fallbackMessage,
        expose: true
      };
    }
    if (request.error.expose) {
      normalizeHttpResponse(request);
      const { statusCode, message, headers } = request.error;
      request.response = {
        ...request.response,
        statusCode,
        body: message,
        headers: {
          ...headers,
          ...request.response.headers,
          "Content-Type": typeof jsonSafeParse(message) === "string" ? "text/plain" : "application/json"
        }
      };
    }
  };
  return {
    onError: httpErrorHandlerMiddlewareOnError
  };
};
var http_error_handler_default = httpErrorHandlerMiddleware;

// node_modules/@middy/http-event-normalizer/index.js
var httpEventNormalizerMiddleware = () => {
  const httpEventNormalizerMiddlewareBefore = async (request) => {
    const { event } = request;
    const version = event.version ?? "1.0";
    const isHttpEvent = isVersionHttpEvent[version]?.(event);
    if (!isHttpEvent) {
      throw new Error("[http-event-normalizer] Unknown http event format");
    }
    event.pathParameters ??= {};
    event.queryStringParameters ??= {};
    if (version === "1.0") {
      event.multiValueQueryStringParameters ??= {};
    }
  };
  return {
    before: httpEventNormalizerMiddlewareBefore
  };
};
var isVersionHttpEvent = {
  "1.0": (event) => typeof event.httpMethod !== "undefined",
  "2.0": (event) => typeof event.requestContext.http.method !== "undefined"
};
var http_event_normalizer_default = httpEventNormalizerMiddleware;

// node_modules/@middy/http-json-body-parser/index.js
var mimePattern = /^application\/(.+\+)?json($|;.+)/;
var defaults2 = {
  reviver: void 0,
  disableContentTypeError: true
};
var httpJsonBodyParserMiddleware = (opts = {}) => {
  const options = {
    ...defaults2,
    ...opts
  };
  const httpJsonBodyParserMiddlewareBefore = async (request) => {
    const { headers, body } = request.event;
    const contentType = headers["Content-Type"] ?? headers["content-type"];
    if (!mimePattern.test(contentType)) {
      if (options.disableContentTypeError) {
        return;
      }
      throw createError(415, "Unsupported Media Type", {
        cause: contentType
      });
    }
    try {
      const data = request.event.isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
      request.event.body = JSON.parse(data, options.reviver);
    } catch (cause) {
      throw createError(415, "Invalid or malformed JSON was provided", {
        cause
      });
    }
  };
  return {
    before: httpJsonBodyParserMiddlewareBefore
  };
};
var http_json_body_parser_default = httpJsonBodyParserMiddleware;

// src/middleware/Middleware.ts
var Middleware_default = (handler2) => core_default(handler2).use([
  http_error_handler_default(),
  http_event_normalizer_default(),
  http_json_body_parser_default()
]);

// src/services/product/GetProduct.ts
var GetProduct = (event) => {
  return {};
};

// src/services/product/ProductServiceCallbackMap.ts
var ProductServiceCallbackMap = class extends ServiceCallbackMap {
  constructor() {
    super();
    this.data.set(
      {
        method: 0 /* get */,
        path: "/product"
      },
      GetProduct
    );
  }
};

// src/services/product/ProductService.ts
var productService = async (event) => {
  console.log("Product service!");
  const callbackMap = new ProductServiceCallbackMap();
  const responseBody = await callbackMap.processEvent(
    {
      method: 0 /* get */,
      path: "/product"
    },
    event
  );
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
};
var handler = Middleware_default(productService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
