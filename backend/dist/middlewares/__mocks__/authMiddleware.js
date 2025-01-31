"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockAuthMiddleware = (req, res, next) => {
    // Simula que el usuario está autenticado
    req.auth = { sub: 'auth0|test_user' }; // `sub` simulado
    next();
};
exports.default = mockAuthMiddleware;
