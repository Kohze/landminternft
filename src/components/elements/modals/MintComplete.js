import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

export default function MintComplete({ txid, open, setOpen, src, tokenid, name, supply }) {
  const kilobytesWritten = (supply * 1570 + 350) / 1024
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
            <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
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
            <div className="relative inline-block align-bottom bg-green-700 border-gradient rounded-lg px-4 pt-5 pb-4 p-5 text-primary text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-10">
              <div>
                <div className=" text-center">
                  <div className="text-white">
                  <p className="text-xl mb-4">
                      Your land has been registered
                    </p>
                    <img
                      src={src}
                      className="w-full aspect-square  rounded-lg"
                    />
                    <p className="text-xs break-words my-2">
                      <span className="text-white text-sm">TXid</span> {txid}
                    </p>
                 
                    <a
                      href={`https://whatsonchain.com/tx/${txid}`}
                      target="_blank"
                      className="block bg-gradient-to-r from-green-200 to-green-300 text-black font-semibold w-full py-2 rounded-lg mt-2"
                    >
                      View on Chain
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

MintComplete.propTypes = {
  txid: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  name: PropTypes.string,
  supply: PropTypes.number,
}
