export default function logIncoming(req, res, next) {
    console.log(`Incoming ${req.method} On path: ${req.path}`);
    next();
}