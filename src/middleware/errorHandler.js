// Handle Errors :
const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Issue", error: true });
};

// Not Found Route :
const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found", error: true });
};

export { handleErrors, notFound };
