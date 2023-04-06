import { googleAppsAdapter } from './googleAppsAdapter'

const knownAdapters = {}

export default {
  getAdapter: (adapters) => {
    return googleAppsAdapter
  },
  adapters: knownAdapters,
}
