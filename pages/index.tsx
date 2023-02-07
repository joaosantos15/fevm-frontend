import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

import ABI from '../contracts/DealRewarder.json'
import Account from '../components/Account'
import CID from 'cids'
import { Dialog } from '@headlessui/react'
import ETHBalance from '../components/ETHBalance'
import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import TokenBalance from '../components/TokenBalance'
import { Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import useBlockNumber from '../hooks/useBlockNumber'
import useDealRewarderContract from '../hooks/useDealRewarderContract'
import useEagerConnect from '../hooks/useEagerConnect'
import { useWeb3React } from '@web3-react/core'

function Home() {
  const { account, library } = useWeb3React()

  const triedToEagerConnect = useEagerConnect()

  const isConnected = typeof account === 'string' && !!library

  const dealRewarderContract = useDealRewarderContract(
    '0x55c5682ddBB392a9fF40F55FC33ea9c56fB29C25'
  )
  console.log(dealRewarderContract)
  const blockNumber = useBlockNumber()

  const handleDeployContractRewarder = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(ABI, bytecode, signer)
    const contract = await factory.deploy()
    await contract.deployed()

    console.log('DealRewarder deployed to:', contract.address)
  }

  useEffect(() => {
    //@ts-ignore
    window.dealRewarderContract = dealRewarderContract
    console.log(':)', blockNumber)
  }, [dealRewarderContract])

  const [showSlider, setShowSlider] = useState(false)

  const [contractAddress, setContractAddress] = useState()



  return (
    <div>
      {showSlider ? (
        <Slider
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          showSlider={showSlider}
          setShowSlider={setShowSlider}
        />
      ) : undefined}
      <div className="relative isolate bg-white">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="px-6 pt-6 lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <Account triedToEagerConnect={triedToEagerConnect} />
            </div>
            <div className='grid grid-flow-col mt-10 justify-start'>
            <h1 className=" max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Click{' '}
            </h1>
            <Image className='mt-2 ml-4' src="/logo.svg" alt="logo" width="50" height="50" />
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Filecoin deals are temporary, but they don't have to be. F5 is a smart-contract based primitive that incentivises renewal of Filecoin storage deals. And it's as simple as hitting the F5 refresh key.
            </p>
            {/* <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-base font-semibold leading-7 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div> */}
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="grid  ">
              <button
                onClick={() => setShowSlider(true)}
                className="place-self-center	 rounded-md hover:bg-gray-300 text-gray-500 border-gray-500 border-4 h-[200px] w-[200px] justify-center text-8xl font-[monospace]"
              >
                <Image className='m-auto' src="/logo.svg" alt="logo" width="80" height="80" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export const Slider = ({
  showSlider,
  setShowSlider,
  contractAddress,
  setContractAddress,
}) => {
  const [open, setOpen] = useState(true)
  const [contract, setContract]: [any, any] = useState()

  const [cid, setCID]: [string, any] = useState('')
  const [size, setSize]: [number, any] = useState(0)
  const [lengthInDays, setLengthInDays]: [number, any] = useState(0)

  // const dealRewarderContract = useDealRewarderContract(
  //   '0xF7bCb8F53f62D89c40ED92a1e8593384271e6EB4'
  // )

  const dealRewarderContract = useDealRewarderContract(
    '0x55c5682ddBB392a9fF40F55FC33ea9c56fB29C25'
  )

  useState(() => {
    setContract(dealRewarderContract)
    //@ts-ignore
    window.contract = dealRewarderContract
  }, [contractAddress])

  const handleDeployContractRewarder = async () => {
    // //@ts-ignore
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    // const factory = new ethers.ContractFactory(ABI, bytecode, signer)
    // const contract = await factory.deploy()
    // await contract.deployed()

    setContract(contract)

    console.log('DealRewarder deployed to:', contract.address)
  }

  const handleAddCid = async () => {
    try {
      const cidHexRaw = new CID(cid).toString('base16').substring(1)
      const cidHex = '0x00' + cidHexRaw
      console.log('Hex bytes are:', cidHex)

      console.log('Addind, ', cidHex, size, lengthInDays)

      await contract.addCID(cidHex, size, lengthInDays)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              New project
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get started by filling in the information below to
                              create your new project.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setShowSlider(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="cid"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Load contract at address
                            </label>
                            <label
                              htmlFor="cid"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {contract?.address}
                            </label>
                          </div>
                          <div className="flex flex-row sm:col-span-2">
                            <input
                              onChange={(e) =>
                                setContractAddress(e.target.value)
                              }
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="mr-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {/* <button
                              // type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Load
                            </button> */}
                          </div>
                        </div>

                        {/* Project name */}

                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="cid"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              CID
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => setCID(e.target.value)}
                              value={cid}
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="cid"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Size in bytes
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => setSize(e.target.value)}
                              value={size}
                              type="number"
                              name="size"
                              id="cid-size"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="cid"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              For how long do you want it available? In days
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => setLengthInDays(e.target.value)}
                              value={lengthInDays}
                              type="number"
                              name="size"
                              id="cid-size"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        {/* Privacy */}
                        <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <legend className="sr-only">
                            SP Compensation policy
                          </legend>
                          <div
                            className="text-sm font-medium text-gray-900"
                            aria-hidden="true"
                          >
                            SP Compensation policy
                          </div>
                          <div className="space-y-5 sm:col-span-2">
                            <div className="space-y-5 sm:mt-0">
                              <div className="relative flex items-start">
                                <div className="absolute flex h-5 items-center">
                                  <input
                                    id="public-access"
                                    name="privacy"
                                    aria-describedby="public-access-description"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    defaultChecked
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label
                                    htmlFor="public-access"
                                    className="font-medium text-gray-900"
                                  >
                                    100% at the end
                                  </label>
                                  <p
                                    id="public-access-description"
                                    className="text-gray-500"
                                  >
                                    The miner receives 100% of the bounty at the
                                    end and nothing before
                                  </p>
                                </div>
                              </div>
                              <div className="relative flex items-start">
                                <div className="absolute flex h-5 items-center">
                                  <input
                                    id="restricted-access"
                                    name="privacy"
                                    aria-describedby="restricted-access-description"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="pl-7 text-sm" disabled>
                                  <label
                                    htmlFor="restricted-access"
                                    className="font-medium text-gray-900"
                                  >
                                    Spread over time (not yet available)
                                  </label>
                                  <p
                                    id="restricted-access-description"
                                    className="text-gray-500 "
                                  >
                                    The miner can collect rewards over time
                                  </p>
                                </div>
                              </div>
                            </div>
                            <hr className="border-gray-200" />
                            {/* <div className="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                              <div className="flex-1">
                                <a
                                  href="#"
                                  className="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                >
                                  <LinkIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                    aria-hidden="true"
                                  />
                                  <span>Copy link</span>
                                </a>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
                                >
                                  <QuestionMarkCircleIcon
                                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <span>Learn more about sharing</span>
                                </a>
                              </div>
                            </div> */}
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        {/* <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button> */}
                        <button
                          onClick={handleAddCid}
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create Bounty
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const bytecode =
  '608060405234801561001057600080fd5b5033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060405180606001604052806208a2f060070b8152602001620f618060070b8152602001600115158152509050600060405180606001604052806208d9a060070b8152602001620f618060070b81526020016001151581525090508160036000610bb967ffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060208201518160000160086101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060408201518160000160106101000a81548160ff021916908315150217905550905050806003600061138967ffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060208201518160000160086101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060408201518160000160106101000a81548160ff02191690831515021790555090505050506137858061020d6000396000f3fe6080604052600436106101095760003560e01c806377b05cea116100955780638f8a6d8f116100645780638f8a6d8f14610373578063b97c601a146103b0578063c729ebce146103d9578063ebc167d714610402578063fab903721461042b57610109565b806377b05cea146102b357806377fab482146102f05780637ca56b4c1461031b5780638da5cb5b1461034857610109565b80633d3f3856116100dc5780633d3f3856146101c85780633d7650b2146101f15780634f9c09cc1461022e5780636aba510b1461024a578063703097391461028a57610109565b806303988f841461010e5780631a7fd6c61461014b57806321832bb714610188578063333805901461019f575b600080fd5b34801561011a57600080fd5b506101356004803603810190610130919061243f565b61046a565b604051610142919061248f565b60405180910390f35b34801561015757600080fd5b50610172600480360381019061016d919061261c565b6104a8565b60405161017f9190612693565b60405180910390f35b34801561019457600080fd5b5061019d6104ed565b005b3480156101ab57600080fd5b506101c660048036038101906101c19190612747565b61082b565b005b3480156101d457600080fd5b506101ef60048036038101906101ea91906127bb565b610915565b005b3480156101fd57600080fd5b50610218600480360381019061021391906127e8565b610953565b6040516102259190612693565b60405180910390f35b610248600480360381019061024391906127bb565b610989565b005b34801561025657600080fd5b50610271600480360381019061026c9190612831565b61098c565b6040516102819493929190612972565b60405180910390f35b34801561029657600080fd5b506102b160048036038101906102ac91906129be565b610a7a565b005b3480156102bf57600080fd5b506102da60048036038101906102d59190612a11565b610b57565b6040516102e79190612a4d565b60405180910390f35b3480156102fc57600080fd5b50610305610b86565b6040516103129190612a4d565b60405180910390f35b34801561032757600080fd5b50610330610b99565b60405161033f93929190612a68565b60405180910390f35b34801561035457600080fd5b5061035d610bd8565b60405161036a9190612ae0565b60405180910390f35b34801561037f57600080fd5b5061039a600480360381019061039591906127e8565b610bfe565b6040516103a79190612b0a565b60405180910390f35b3480156103bc57600080fd5b506103d760048036038101906103d29190612b25565b610c2c565b005b3480156103e557600080fd5b5061040060048036038101906103fb91906127bb565b610da1565b005b34801561040e57600080fd5b50610429600480360381019061042491906127bb565b610e6d565b005b34801561043757600080fd5b50610452600480360381019061044d91906127bb565b610f03565b60405161046193929190612a68565b60405180910390f35b6005818154811061047a57600080fd5b9060005260206000209060049182820401919006600802915054906101000a900467ffffffffffffffff1681565b6002828051602081018201805184825260208301602085012081835280955050505050506020528060005260406000206000915091509054906101000a900460ff1681565b600060058054905011610535576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052c90612bf1565b60405180910390fd5b6000600560008154811061054c5761054b612c11565b5b90600052602060002090600491828204019190066008029054906101000a900467ffffffffffffffff169050600061058382610f54565b90506000816000015190506000826020015183600001516105a49190612c6f565b9050600081905060005b6005805490508167ffffffffffffffff16101561079c57600080600060058467ffffffffffffffff16815481106105e8576105e7612c11565b5b90600052602060002090600491828204019190066008029054906101000a900467ffffffffffffffff169050600360008267ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160109054906101000a900460ff161561070c57600360008267ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160009054906101000a900460070b9250600360008267ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160089054906101000a900460070b600360008367ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060000160009054906101000a900460070b6107059190612c6f565b9150610735565b61071581610f54565b975087600001519250876020015188600001516107329190612c6f565b91505b8460070b8360070b1315610775576040517f5149278e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8460070b8260070b12610786578194505b505050808061079490612ccf565b9150506105ae565b5060006107b384836107ae9190612cff565b610b57565b9050600460009054906101000a900460070b60070b8160070b126107f15760006107dc87610ff1565b90506107eb8160000151610915565b50610823565b6040517f184bd9f800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461088557600080fd5b600160008585604051610899929190612d8f565b908152602001604051809103902060006101000a81548160ff02191690831515021790555081600185856040516108d1929190612d8f565b90815260200160405180910390208190555080600460006101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555050505050565b6000604051806020016040528060008152509050606090506000670de0b6b3a7640000905061094a600082600080868861098c565b50505050505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b50565b6000806000606060008073fe0000000000000000000000000000000000000573ffffffffffffffffffffffffffffffffffffffff168c8c8c8c8c8c6040516020016109dc96959493929190612da8565b6040516020818303038152906040526040516109f89190612e41565b600060405180830381855af49150503d8060008114610a33576040519150601f19603f3d011682016040523d82523d6000602084013e610a38565b606091505b5091509150600080600083806020019051810190610a569190612f09565b92509250925084838383985098509850985050505050509650965096509692505050565b600060405180606001604052808460070b81526020018360070b815260200160011515815250905080600360008667ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060208201518160000160086101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060408201518160000160106101000a81548160ff02191690831515021790555090505050505050565b600080620151809050600081601e85610b709190612f78565b610b7a9190612fe4565b90508092505050919050565b600460009054906101000a900460070b81565b60078060000160009054906101000a900460070b908060000160089054906101000a900460070b908060000160109054906101000a900460ff16905083565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600083604051610c3c9190612e41565b908152602001604051809103902060009054906101000a900460ff16610c97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8e906130c0565b60405180910390fd5b80600184604051610ca89190612e41565b90815260200160405180910390205414610cf7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cee9061312c565b60405180910390fd5b610d01838361108e565b610d40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d37906131be565b60405180910390fd5b6001600284604051610d529190612e41565b908152602001604051809103902060008467ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b6000610dac82610f54565b905060006040518060600160405280836000015160070b8152602001836020015160070b815260200160011515815250905080600760008201518160000160006101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060208201518160000160086101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff16021790555060408201518160000160106101000a81548160ff021916908315150217905550905050505050565b6000610e78826110ef565b90506000610e858361118c565b9050610ea882600001518260000151846020015167ffffffffffffffff16610c2c565b60058390806001815401808255809150506001900390600052602060002090600491828204019190066008029091909190916101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550505050565b60036020528060005260406000206000915090508060000160009054906101000a900460070b908060000160089054906101000a900460070b908060000160109054906101000a900460ff16905083565b610f5c61233d565b6000610f718367ffffffffffffffff16611229565b90506000610fbb6309c30b206040518060400160405280600281526020017e050000000000000000000000000000000000000000000000000000000000008152508460713461125d565b90506000610fc882611398565b9050610fd261233d565b610fe5828261148990919063ffffffff16565b80945050505050919050565b610ff961235d565b600061100e8367ffffffffffffffff16611229565b905060006110586307a1f0516040518060400160405280600281526020017e050000000000000000000000000000000000000000000000000000000000008152508460713461125d565b9050600061106582611398565b905061106f61235d565b611082828261151d90919063ffffffff16565b80945050505050919050565b6000806002846040516110a19190612e41565b908152602001604051809103902060008467ffffffffffffffff1667ffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050801591505092915050565b6110f761237a565b600061110c8367ffffffffffffffff16611229565b90506000611156634505760a6040518060400160405280600281526020017e050000000000000000000000000000000000000000000000000000000000008152508460713461125d565b9050600061116382611398565b905061116d61237a565b611180828261155890919063ffffffff16565b80945050505050919050565b61119461239e565b60006111a98367ffffffffffffffff16611229565b905060006111f36337bc36da6040518060400160405280600281526020017e050000000000000000000000000000000000000000000000000000000000008152508460713461125d565b9050600061120082611398565b905061120a61239e565b61121d82826115d990919063ffffffff16565b80945050505050919050565b606060006112376040611614565b905061124c838261163b90919063ffffffff16565b6112558161164b565b915050919050565b606060008073fe0000000000000000000000000000000000000373ffffffffffffffffffffffffffffffffffffffff1688856000888a8c6040516020016112a9969594939291906131de565b6040516020818303038152906040526040516112c59190612e41565b600060405180830381855af49150503d8060008114611300576040519150601f19603f3d011682016040523d82523d6000602084013e611305565b606091505b509150915060011515821515146040518060400160405280601181526020017f6163746f722063616c6c206661696c656400000000000000000000000000000081525090611389576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113809190613291565b60405180910390fd5b50809250505095945050505050565b60606000806000848060200190518101906113b39190612f09565b925092509250600067ffffffffffffffff168267ffffffffffffffff1614806113f05750607167ffffffffffffffff168267ffffffffffffffff16145b61142f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611426906132ff565b60405180910390fd5b6000831461143c846116a4565b9061147d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114749190613291565b60405180910390fd5b50809350505050919050565b6000806000806114a2828661170e90919063ffffffff16565b8093508192505050600281146114bb576114ba61331f565b5b6114ce828661175d90919063ffffffff16565b80935081955050506114e9828661175d90919063ffffffff16565b809350819450505083866000019060070b908160070b8152505082866020019060070b908160070b81525050505050505050565b600061153281836117bd90919063ffffffff16565b846000018193508267ffffffffffffffff1667ffffffffffffffff168152505050505050565b60008061156e828461170e90919063ffffffff16565b809350819250505060008111156115d357611592828461180c90919063ffffffff16565b8560000181945082905250506115b182846117bd90919063ffffffff16565b856020018194508267ffffffffffffffff1667ffffffffffffffff1681525050505b50505050565b60006115ee81836117bd90919063ffffffff16565b846000018193508267ffffffffffffffff1667ffffffffffffffff168152505050505050565b61161c6123bb565b61162a8160000151836119b6565b506000816020018181525050919050565b61164782600083611a2f565b5050565b60606000826020015114611694576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168b9061339a565b60405180910390fd5b8160000151600001519050919050565b606060008212156116de576116b882611bd8565b6040516020016116c8919061341c565b6040516020818303038152906040529050611709565b6116e782611bd8565b6040516020016116f7919061341c565b60405160208183030381529060405290505b919050565b60008060008061171e8686611ca6565b8167ffffffffffffffff169150809750819350829450505050600460ff168260ff161461174e5761174d61331f565b5b80859350935050509250929050565b60008060008061176d8686611ca6565b8167ffffffffffffffff169150809750819350829450505050600160ff168260ff1614806117a15750600060ff168260ff16145b6117ae576117ad61331f565b5b80859350935050509250929050565b6000806000806117cd8686611ca6565b8167ffffffffffffffff169150809750819350829450505050600060ff168260ff16146117fd576117fc61331f565b5b80859350935050509250929050565b6060600080600061181d8686611ca6565b8167ffffffffffffffff169150809750819350829450505050600660ff168260ff1614806118515750600260ff168260ff16145b61185e5761185d61331f565b5b600660ff168260ff16036118a7576118768686611ca6565b8167ffffffffffffffff169150809750819350829450505050600260ff168260ff16146118a6576118a561331f565b5b5b600081866118b59190613442565b905060008267ffffffffffffffff8111156118d3576118d26124c5565b5b6040519080825280601f01601f1916602001820160405280156119055781602001600182028036833780820191505090505b5090506000808890505b838110156119985789818151811061192a57611929612c11565b5b602001015160f81c60f81b83838151811061194857611947612c11565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350818061198290613476565b925050808061199090613476565b91505061190f565b508184896119a69190613442565b9650965050505050509250929050565b6119be6123db565b60006020836119cd91906134be565b146119f9576020826119df91906134be565b60206119eb91906134ef565b826119f69190613442565b91505b818360200181815250506040518084526000815282810160200181811015611a2057600080fd5b80604052505082905092915050565b60178167ffffffffffffffff1611611a6a57611a648160058460ff16901b60ff16178460000151611e3490919063ffffffff16565b50611bd3565b60ff8167ffffffffffffffff1611611ac857611a9d601860058460ff16901b178460000151611e3490919063ffffffff16565b50611ac28167ffffffffffffffff1660018560000151611e9e9092919063ffffffff16565b50611bd2565b61ffff8167ffffffffffffffff1611611b2757611afc601960058460ff16901b178460000151611e3490919063ffffffff16565b50611b218167ffffffffffffffff1660028560000151611e9e9092919063ffffffff16565b50611bd1565b63ffffffff8167ffffffffffffffff1611611b8857611b5d601a60058460ff16901b178460000151611e3490919063ffffffff16565b50611b828167ffffffffffffffff1660048560000151611e9e9092919063ffffffff16565b50611bd0565b611ba9601b60058460ff16901b178460000151611e3490919063ffffffff16565b50611bce8167ffffffffffffffff1660088560000151611e9e9092919063ffffffff16565b505b5b5b5b505050565b606060006001611be784611f2b565b01905060008167ffffffffffffffff811115611c0657611c056124c5565b5b6040519080825280601f01601f191660200182016040528015611c385781602001600182028036833780820191505090505b509050600082602001820190505b600115611c9b578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611c8f57611c8e612fb5565b5b04945060008503611c46575b819350505050919050565b600080600080611cb6868661207e565b9050600185611cc59190613442565b94506000600560e0831660ff16901c90506000601f83169050601c8160ff1610611cf257611cf161331f565b5b60188160ff161015611d15578181888160ff169150955095509550505050611e2d565b60188160ff1603611d6a576000611d2c898961207e565b9050600188611d3b9190613442565b975060188160ff161015611d5257611d5161331f565b5b8281898160ff16915096509650965050505050611e2d565b60198160ff1603611dab576000611d8189896120e5565b9050600288611d909190613442565b97508281898161ffff16915096509650965050505050611e2d565b601a8160ff1603611dee576000611dc2898961214c565b9050600488611dd19190613442565b97508281898163ffffffff16915096509650965050505050611e2d565b601b8160ff1614611e0257611e0161331f565b5b6000611e0e89896121b3565b9050600888611e1d9190613442565b9750828189965096509650505050505b9250925092565b611e3c6123db565b600083600001515190506000600182611e559190613442565b905084602001518210611e7957611e7885600283611e739190613523565b61221a565b5b84516020838201018581538151831115611e91578282525b5050849250505092915050565b611ea66123db565b6000846000015151905060008184611ebe9190613442565b90508560200151811115611ee357611ee286600283611edd9190613523565b61221a565b5b6000600185610100611ef59190613698565b611eff91906134ef565b905086518281018783198251161781528151841115611f1c578382525b50508693505050509392505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611f89577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611f7f57611f7e612fb5565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611fc6576d04ee2d6d415b85acef81000000008381611fbc57611fbb612fb5565b5b0492506020810190505b662386f26fc100008310611ff557662386f26fc100008381611feb57611fea612fb5565b5b0492506010810190505b6305f5e100831061201e576305f5e100838161201457612013612fb5565b5b0492506008810190505b612710831061204357612710838161203957612038612fb5565b5b0492506004810190505b60648310612066576064838161205c5761205b612fb5565b5b0492506002810190505b600a8310612075576001810190505b80915050919050565b600060018261208d9190613442565b835110156120d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120c79061372f565b60405180910390fd5b60008260010184015190508091505092915050565b60006002826120f49190613442565b83511015612137576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161212e9061372f565b60405180910390fd5b60008260020184015190508091505092915050565b600060048261215b9190613442565b8351101561219e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121959061372f565b60405180910390fd5b60008260040184015190508091505092915050565b60006008826121c29190613442565b83511015612205576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121fc9061372f565b60405180910390fd5b60008260080184015190508091505092915050565b60008260000151905061222d83836119b6565b50612238838261223e565b50505050565b6122466123db565b6122528383845161225a565b905092915050565b6122626123db565b825182111561227057600080fd5b60008460000151519050600083826122889190613442565b905085602001518111156122ad576122ac866002836122a79190613523565b61221a565b5b600080875180518560208301019350808511156122c8578482525b60208901925050505b6020861061230f57805182526020826122ea9190613442565b91506020816122f99190613442565b905060208661230891906134ef565b95506122d1565b60006001876020036101000a0390508019825116818451168181178552505050879450505050509392505050565b6040518060400160405280600060070b8152602001600060070b81525090565b6040518060200160405280600067ffffffffffffffff1681525090565b604051806040016040528060608152602001600067ffffffffffffffff1681525090565b6040518060200160405280600067ffffffffffffffff1681525090565b60405180604001604052806123ce6123db565b8152602001600081525090565b604051806040016040528060608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61241c81612409565b811461242757600080fd5b50565b60008135905061243981612413565b92915050565b600060208284031215612455576124546123ff565b5b60006124638482850161242a565b91505092915050565b600067ffffffffffffffff82169050919050565b6124898161246c565b82525050565b60006020820190506124a46000830184612480565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6124fd826124b4565b810181811067ffffffffffffffff8211171561251c5761251b6124c5565b5b80604052505050565b600061252f6123f5565b905061253b82826124f4565b919050565b600067ffffffffffffffff82111561255b5761255a6124c5565b5b612564826124b4565b9050602081019050919050565b82818337600083830152505050565b600061259361258e84612540565b612525565b9050828152602081018484840111156125af576125ae6124af565b5b6125ba848285612571565b509392505050565b600082601f8301126125d7576125d66124aa565b5b81356125e7848260208601612580565b91505092915050565b6125f98161246c565b811461260457600080fd5b50565b600081359050612616816125f0565b92915050565b60008060408385031215612633576126326123ff565b5b600083013567ffffffffffffffff81111561265157612650612404565b5b61265d858286016125c2565b925050602061266e85828601612607565b9150509250929050565b60008115159050919050565b61268d81612678565b82525050565b60006020820190506126a86000830184612684565b92915050565b600080fd5b600080fd5b60008083601f8401126126ce576126cd6124aa565b5b8235905067ffffffffffffffff8111156126eb576126ea6126ae565b5b602083019150836001820283011115612707576127066126b3565b5b9250929050565b60008160070b9050919050565b6127248161270e565b811461272f57600080fd5b50565b6000813590506127418161271b565b92915050565b60008060008060608587031215612761576127606123ff565b5b600085013567ffffffffffffffff81111561277f5761277e612404565b5b61278b878288016126b8565b9450945050602061279e8782880161242a565b92505060406127af87828801612732565b91505092959194509250565b6000602082840312156127d1576127d06123ff565b5b60006127df84828501612607565b91505092915050565b6000602082840312156127fe576127fd6123ff565b5b600082013567ffffffffffffffff81111561281c5761281b612404565b5b612828848285016125c2565b91505092915050565b60008060008060008060c0878903121561284e5761284d6123ff565b5b600061285c89828a01612607565b965050602061286d89828a0161242a565b955050604061287e89828a01612607565b945050606061288f89828a01612607565b935050608087013567ffffffffffffffff8111156128b0576128af612404565b5b6128bc89828a016125c2565b92505060a06128cd89828a01612607565b9150509295509295509295565b6000819050919050565b6128ed816128da565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561292d578082015181840152602081019050612912565b60008484015250505050565b6000612944826128f3565b61294e81856128fe565b935061295e81856020860161290f565b612967816124b4565b840191505092915050565b60006080820190506129876000830187612684565b61299460208301866128e4565b6129a16040830185612480565b81810360608301526129b38184612939565b905095945050505050565b6000806000606084860312156129d7576129d66123ff565b5b60006129e586828701612607565b93505060206129f686828701612732565b9250506040612a0786828701612732565b9150509250925092565b600060208284031215612a2757612a266123ff565b5b6000612a3584828501612732565b91505092915050565b612a478161270e565b82525050565b6000602082019050612a626000830184612a3e565b92915050565b6000606082019050612a7d6000830186612a3e565b612a8a6020830185612a3e565b612a976040830184612684565b949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612aca82612a9f565b9050919050565b612ada81612abf565b82525050565b6000602082019050612af56000830184612ad1565b92915050565b612b0481612409565b82525050565b6000602082019050612b1f6000830184612afb565b92915050565b600080600060608486031215612b3e57612b3d6123ff565b5b600084013567ffffffffffffffff811115612b5c57612b5b612404565b5b612b68868287016125c2565b9350506020612b7986828701612607565b9250506040612b8a8682870161242a565b9150509250925092565b600082825260208201905092915050565b7f54686572652073686f756c64206265206174206c656173742031206465616c00600082015250565b6000612bdb601f83612b94565b9150612be682612ba5565b602082019050919050565b60006020820190508181036000830152612c0a81612bce565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612c7a8261270e565b9150612c858361270e565b925082820190507fffffffffffffffffffffffffffffffffffffffffffffffff80000000000000008112677fffffffffffffff82131715612cc957612cc8612c40565b5b92915050565b6000612cda8261246c565b915067ffffffffffffffff8203612cf457612cf3612c40565b5b600182019050919050565b6000612d0a8261270e565b9150612d158361270e565b92508282039050677fffffffffffffff81137fffffffffffffffffffffffffffffffffffffffffffffffff800000000000000082121715612d5957612d58612c40565b5b92915050565b600081905092915050565b6000612d768385612d5f565b9350612d83838584612571565b82840190509392505050565b6000612d9c828486612d6a565b91508190509392505050565b600060c082019050612dbd6000830189612480565b612dca6020830188612afb565b612dd76040830187612480565b612de46060830186612480565b8181036080830152612df68185612939565b9050612e0560a0830184612480565b979650505050505050565b6000612e1b826128f3565b612e258185612d5f565b9350612e3581856020860161290f565b80840191505092915050565b6000612e4d8284612e10565b915081905092915050565b612e61816128da565b8114612e6c57600080fd5b50565b600081519050612e7e81612e58565b92915050565b600081519050612e93816125f0565b92915050565b6000612eac612ea784612540565b612525565b905082815260208101848484011115612ec857612ec76124af565b5b612ed384828561290f565b509392505050565b600082601f830112612ef057612eef6124aa565b5b8151612f00848260208601612e99565b91505092915050565b600080600060608486031215612f2257612f216123ff565b5b6000612f3086828701612e6f565b9350506020612f4186828701612e84565b925050604084015167ffffffffffffffff811115612f6257612f61612404565b5b612f6e86828701612edb565b9150509250925092565b6000612f838261270e565b9150612f8e8361270e565b9250828202612f9c8161270e565b9150808214612fae57612fad612c40565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612fef8261270e565b9150612ffa8361270e565b92508261300a57613009612fb5565b5b600160000383147fffffffffffffffffffffffffffffffffffffffffffffffff80000000000000008314161561304357613042612c40565b5b828205905092915050565b7f636964206d757374206265206164646564206265666f726520617574686f726960008201527f7a696e6700000000000000000000000000000000000000000000000000000000602082015250565b60006130aa602483612b94565b91506130b58261304e565b604082019050919050565b600060208201905081810360008301526130d98161309d565b9050919050565b7f646174612073697a65206d757374206d61746368206578706563746564000000600082015250565b6000613116601d83612b94565b9150613121826130e0565b602082019050919050565b6000602082019050818103600083015261314581613109565b9050919050565b7f6465616c206661696c656420706f6c69637920636865636b3a2068617320707260008201527f6f766964657220616c726561647920636c61696d65642074686973206369643f602082015250565b60006131a8604083612b94565b91506131b38261314c565b604082019050919050565b600060208201905081810360008301526131d78161319b565b9050919050565b600060c0820190506131f36000830189612480565b6132006020830188612afb565b61320d6040830187612480565b61321a6060830186612480565b818103608083015261322c8185612939565b905081810360a08301526132408184612939565b9050979650505050505050565b600081519050919050565b60006132638261324d565b61326d8185612b94565b935061327d81856020860161290f565b613286816124b4565b840191505092915050565b600060208201905081810360008301526132ab8184613258565b905092915050565b7f726573706f6e736520636f646563206e6f7420737570706f7274656400000000600082015250565b60006132e9601c83612b94565b91506132f4826132b3565b602082019050919050565b60006020820190508181036000830152613318816132dc565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f496e76616c69642043424f520000000000000000000000000000000000000000600082015250565b6000613384600c83612b94565b915061338f8261334e565b602082019050919050565b600060208201905081810360008301526133b381613377565b9050919050565b7f6163746f72206572726f7220636f6465202d0000000000000000000000000000815250565b600081905092915050565b60006133f68261324d565b61340081856133e0565b935061341081856020860161290f565b80840191505092915050565b6000613427826133ba565b60128201915061343782846133eb565b915081905092915050565b600061344d82612409565b915061345883612409565b92508282019050808211156134705761346f612c40565b5b92915050565b600061348182612409565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036134b3576134b2612c40565b5b600182019050919050565b60006134c982612409565b91506134d483612409565b9250826134e4576134e3612fb5565b5b828206905092915050565b60006134fa82612409565b915061350583612409565b925082820390508181111561351d5761351c612c40565b5b92915050565b600061352e82612409565b915061353983612409565b925082820261354781612409565b9150828204841483151761355e5761355d612c40565b5b5092915050565b60008160011c9050919050565b6000808291508390505b60018511156135bc5780860481111561359857613597612c40565b5b60018516156135a75780820291505b80810290506135b585613565565b945061357c565b94509492505050565b6000826135d55760019050613691565b816135e35760009050613691565b81600181146135f9576002811461360357613632565b6001915050613691565b60ff84111561361557613614612c40565b5b8360020a91508482111561362c5761362b612c40565b5b50613691565b5060208310610133831016604e8410600b84101617156136675782820a90508381111561366257613661612c40565b5b613691565b6136748484846001613572565b9250905081840481111561368b5761368a612c40565b5b81810290505b9392505050565b60006136a382612409565b91506136ae83612409565b92506136db7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846135c5565b905092915050565b7f736c6963696e67206f7574206f662072616e6765000000000000000000000000600082015250565b6000613719601483612b94565b9150613724826136e3565b602082019050919050565b600060208201905081810360008301526137488161370c565b905091905056fea264697066735822122063f9adc9f59fd8166c176e1683d9956a52b365581a20c460f4aba85935d338b264736f6c63430008110033'
