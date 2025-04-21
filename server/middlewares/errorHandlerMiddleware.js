function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error:", message, "Status:", status);
  res.status(status).json({ error: message });
}

export default errorHandler;
