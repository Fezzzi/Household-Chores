import app from './app';

// Declare default port
const PORT: string|number = process.env.PORT || 9000;

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}!`);
});
