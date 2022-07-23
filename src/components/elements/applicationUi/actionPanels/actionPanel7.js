/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import RelysiaSDK from 'relysia'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Grid } from 'react-loader-spinner'
import { MA, SE, SERVICE_ID } from '@/config/relysiaApi'
import PropTypes from 'prop-types'
import PostComplete from '@/components/elements/modals/PostComplete'

export default function Example({ rows }) {
  const [loading, setLoading] = useState(false)
  const [txid, setTxid] = useState(null)
  const [open, setOpen] = useState(false)
  const auth = getAuth()

  async function handleWriteToChain() {
    setLoading(true)
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      MA,
      SE,
    )
    const authToken = await userCredentials.user.getIdToken()
    const relysia = new RelysiaSDK({ authToken })
    try {
      await relysia.createWallet({
        walletTitle: 'default',
        serviceId: SERVICE_ID,
      })
      // eslint-disable-next-line no-empty
    } catch (_e) {}
    const notes = rows.map(({ key, value }) => [key, value]).flat()
    const parameters = {
      serviceID: SERVICE_ID,
      body: {
        notes,
      },
    }

    const response = await relysia.post(parameters)
    setLoading(false)
    setTxid(response.txid)
    setOpen(true)
  }

  return (
    <div className="bg-gray-900 sm:rounded-xl mt-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-300">
          Sign Property Deed
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            By clicking the digital sign button, you confirm above information
            and write it immutably to the Bitcoin SV blockchain. Once written it
            can not be altered or deleted.
          </p>
        </div>
        <div className="mt-5">
          {loading ? (
            <button
            type="button"
            className="animate-pulse inline-flex disabled items-center px-4 py-2 shadow-sm font-medium rounded-md text-black bg-orange-400 duration-500 hover:bg-bitcoin-500 sm:text-sm"
          >
            Broadcasting ...
          </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 shadow-sm font-medium rounded-md text-black bg-gradient-to-r from-bitcoin-500 to-bitcoin-400 duration-500 hover:bg-bitcoin-500 sm:text-sm"
              onClick={handleWriteToChain}
            >
              Write to Chain
            </button>
          )}
        </div>
      </div>
      <PostComplete
        txid={txid}
        open={open}
        setOpen={setOpen}
        bytesWritten={
          rows
            .map(({ key, value }) => [key, value])
            .flat()
            .join().length + 200
        }
      />
    </div>
  )
}

Example.propTypes = {
  rows: PropTypes.array,
}
