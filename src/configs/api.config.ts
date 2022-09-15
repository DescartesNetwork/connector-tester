import { Env } from '@sentre/senhub'

/**
 * Contructor
 */
type BasicEndpoint = { index: string } & Record<string, string>
type Conf = {
  adminAddresses: string[]
  origin: string
  dapp: BasicEndpoint
}

const generator = (origin: string): Omit<Conf, 'adminAddresses'> => ({
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
    adminAddresses: ['8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D'],
    ...generator('https://api.sentre.io'),
  },

  /**
   * Production configurations
   */
  production: {
    adminAddresses: ['8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D'],
    ...generator('https://api.sentre.io'),
  },
}

/**
 * Module exports
 */
export default conf
