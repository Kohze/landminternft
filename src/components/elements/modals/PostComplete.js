import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'
import * as SecurityTick from '../../../lottie-animations/security-tick.json'

export default function PostComplete({ txid, open, setOpen, bytesWritten }) {
  const kilobytesWritten = bytesWritten / 1024
  const SATOSHIS_PER_KILOBYTE = 50
  const satoshis = SATOSHIS_PER_KILOBYTE * kilobytesWritten
  const usd = satoshiToUSD(satoshis)

  function satoshiToUSD(satoshis) {
    return satoshis * 80/100000000
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-black border-gradient rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: SecurityTick,
                    }}
                    height={150}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-white"
                  >
                    Broadcast Successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white my-5">
                      Your document was added to the Bitcoin SV blockchain
                    </p>
                    <p className="text-sm text-white">
                      <strong className="text-gray-300">Size: </strong> {bytesWritten/1000} kB
                    </p>
                    <p className="text-sm text-white">
                      <strong className="text-gray-300">Total Cost:</strong> $
                      {usd.toString().substring(0, 8)}
                    </p>
                    <div className="mt-5"> 
                    <a
                      target={'_blank'}
                      href={`https://whatsonchain.com/tx/${txid}`}
                      className="text-sm text-orange-400 font-bold underline "
                    >
                      View on Chain
                    </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient text-base font-medium text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

PostComplete.propTypes = {
  txid: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  bytesWritten: PropTypes.number,
}
