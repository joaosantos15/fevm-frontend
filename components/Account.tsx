import { formatEtherscanLink, shortenHex } from '../util'
import { useEffect, useState } from 'react'

import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { injected } from '../connectors'
import useENSName from '../hooks/useENSName'
import useMetaMaskOnboarding from '../hooks/useMetaMaskOnboarding'
import { useWeb3React } from '@web3-react/core'

type AccountProps = {
  triedToEagerConnect: boolean
}

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React()

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding()

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false)
  useEffect(() => {
    if (active || error) {
      setConnecting(false)
      stopOnboarding()
    }
  }, [active, error, stopOnboarding])

  const ENSName = useENSName(account)

  if (error) {
    return null
  }

  if (!triedToEagerConnect) {
    return null
  }

  if (typeof account !== 'string') {
    return (
      <div className="relative cursor-pointer flex items-center gap-x-4 rounded-full py-1 px-4 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        {isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={() => {
              setConnecting(true)

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false)
                } else {
                  setError(error)
                }
              })
            }}
          >
            {isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet'}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-x-4 rounded-full py-1 px-4 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      <a
        {...{
          href: formatEtherscanLink('Account', [chainId, account]),
          target: '_blank',
          rel: 'noopener noreferrer',
        }}
      >
        <span className="font-semibold text-indigo-600">
          {ENSName || `${shortenHex(account, 4)}`}
        </span>
      </a>
      <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" />
      <a href="#" className="flex items-center gap-x-1">
        <span className="absolute inset-0" aria-hidden="true" />
        Hyperspace
        {/* <ChevronRightIcon className="-mr-2 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
      </a>
    </div>
  )
}

export default Account
