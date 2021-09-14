import app from './app'
import { CONFIG } from './constants'

// Start the server
app.listen(CONFIG.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${CONFIG.API_PORT}!`)
})
