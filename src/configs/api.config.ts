import { Env } from '@sentre/senhub'

/**
 * Contructor
 */
type BasicEndpoint = { index: string } & Record<string, string>
type Conf = {
  origin: string
  dapp: BasicEndpoint
}

const generator = (origin: string): Conf => ({
  origin,
  dapp: {
    index: origin + '/dapp',
    get author() {
      return this.index + '/author'
    },
    get verify() {
      return this.index + '/verify'
    },
  },
})

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    ...generator('https://api.sentre.io'),
  },

  /**
   * Production configurations
   */
  production: {
    ...generator('https://api.sentre.io'),
  },
}

/**
 * Module exports
 */
export default conf
