import { env } from '@sentre/senhub'
import manifest from './manifest.config'
import api from './api.config'

const configs = {
  manifest: manifest[env],
  api: api[env],
}

/**
 * Module exports
 */
export default configs
