function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error: ", message, " Status: ", status);
  return res.status(status).json({ error: message, status: status });
}

export default errorHandler;
