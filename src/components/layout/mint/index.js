import { useState } from 'react';
import React from "react";
import ReactDOM from "react-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { MA, SE, SERVICE_ID } from '@/config/relysiaApi';
import RelysiaSDK from 'relysia';
import { TailSpin } from 'react-loader-spinner';
import MintComplete from '@/components/elements/modals/MintComplete';

const files = [
	{
		title: 'CityMap',
		source: 'https://i.imgur.com/nDxl1yI.jpg',
    bcat: '34jk3k4j3k4jk34kj3jk',
		name: 'CityMap'
	},
];

  
function Images({ setSelectedIndex }) {
	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-1 lg:gap-x-4 xl:gap-x-8"
		>
			{files.map((file, index) => (
				<li
					key={file.source}
					className="relative transition-all hover:scale-105"
					onClick={() => setSelectedIndex(index)}
				>
					<div className="group block w-full aspect-square rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-yellow-100 focus-within:ring-yellow-500 overflow-hidden">
						<img
							src={file.source}
							alt=""
							className="h-full object-cover pointer-events-none group-hover:brightness-105 duration-150"
						/>
						<button type="button" className="absolute inset-0 focus:outline-none">
							<span className="sr-only">View details for {file.title}</span>
						</button>
					</div>
				
				</li>
			))}
		</ul>
	);
}
function Preview({ src, name, description, supply }) {
	return (
		<div className="p-4 rounded-2xl border-gradient">
			<img src={src} className="w-full aspect-square mb-4" />
			<h2 className="text-white text-lg font-bold">{name}</h2>
			<p className="text-white text mt-5">{description}</p>
			<p className="text-orange-300 mt-5">
				{' '}
				{supply ? supply == 0 || supply > 10 ? 10 + ' Edition' : supply + ' Edition' : null}
				{supply && supply > 0 && supply > 1 ? 's' : ''}{' '}
			</p>
		</div>
	);
}
const Mint = () => {
	const [ selectedIndex, setSelectedIndex ] = useState(0);
	const [ loading, setLoading ] = useState(false);
	const [ txid, setTxid ] = useState(null);
	const [ token, setToken ] = useState(null);
	const [ open, setOpen ] = useState(false);

	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ signature, setSignature ] = useState('');

	const [ symbol, setSymbol ] = useState();
	const [ description, setDescription ] = useState();
	const [ supply, setSupply ] = useState();
	const [ decimals, setDecimals ] = useState();
	const [ sats, setSats ] = useState();

	const file = files[selectedIndex];
	const auth = getAuth();

	async function handleMintToken(e) {
		e.preventDefault();
		if (!file) return false;

		setLoading(true);
		const userCredentials = await signInWithEmailAndPassword(auth, MA, SE);
		const authToken = await userCredentials.user.getIdToken();
		const relysia = new RelysiaSDK({ authToken });
		const parameters = {
			serviceId: SERVICE_ID,
			data: {
				name: name,
				protocolId: 'STAS',
				symbol: `${Math.random().toString(36).substring(2, 7)}`,
				description: description,
				image: file.source,
				tokenSupply: parseInt(supply) || 1,
				satsPerToken: 1,
				splitable: false,
				properties: {
					legal: {
						terms:
							'© 2020 TAAL TECHNOLOGIES SEZC\nALL RIGHTS RESERVED. ANY USE OF THIS SOFTWARE IS SUBJECT TO TERMS AND CONDITIONS OF LICENSE. USE OF THIS SOFTWARE WITHOUT LICENSE CONSTITUTES INFRINGEMENT OF INTELLECTUAL PROPERTY. FOR LICENSE DETAILS OF THE SOFTWARE, PLEASE REFER TO: www.taal.com/stas-token-license-agreement',
						licenceId: 'None'
					},
					issuer: {
						organisation: 'Osmio.',
						legalForm: '-',
						governingLaw: '-',
						issuerCountry: '-',
						jurisdiction: '-',
						email: 'info@osmio.com'
					},
					meta: {
						schemaId: 'NFT1.0',
						website: 'osmio.com',
						legal: {
							terms: 'land mining example nft'
						},
						media: [
							{
								URI: file.bcat,
								type: 'image/jpeg'
							}
						]
					}
				}
			}
		};

		const response = await relysia.issue(parameters);
		setLoading(false);
		console.log(response);
		setToken(response.tokenId);
		setTxid(response.tokenObj.issueTxid);
		setOpen(true);
		return false;
	}

	const formGroup = 'flex flex-col text-gray-400 space-y-1 border border-gray-700 rounded-lg pt-1';
	const input = 'border-none bg-black rounded-lg border-transparent focus:border-transparent focus:ring-0';
	const label = 'text-white text-xs uppercase font-bold mx-3';

	

	return (
		<div className="flex">
			<div className="w-100 mx-auto" />
			<main className="h-full min-h-screen p-4 md:p-10 space-y-10">
				{/* <div>
          <h1 className="text-4xl text-white font-bold">
            Create a single or collectible NFT
          </h1>
          <h3 className="text-xl text-white">
            This demo is not linked to any wallet, have fun!
          </h3>
        </div> */}

				<form className="w-full" onSubmit={handleMintToken}>
					<div className="flex">

						<div className="flex flex-grow flex-col space-y-8">
							<div className="flex flex-col space-y-8 md:flex-row md:space-x-16 md:space-y-0">
								
								<div className="space-y-5 flex-1 max-w-[22em]">
									<div>
										<p className="text-lg text-white font-bold">Property Details</p>
									</div>
									<div className="space-y-4">
										<div className={formGroup}>
											<label className={label}>Location</label>
											<input
												className={input}
												rows="20"
												type="text"
												value={location}
												onChange={(e) => setLocation(e.target.value)}
												maxLength={25}
												required
											/>
										</div>
										<div className={formGroup}>
											<label className={label}>Type (commercial or residential)</label>
											<input
												className={input}
												type="text"
												rows="3"
												value={type}
												onChange={(e) => setType(e.target.value)}
												maxLength={25}
												required
											/>
										</div>
										<div className={formGroup}>
											<label className={label}>Government Signature</label>
											<input
												className={input}
												type="text"
												rows="5"
												value={signature}
												onChange={(e) => setSignature(e.target.value)}
												maxLength={25}
												required
											/>
										</div>
										{loading ? (
								<div className="flex flex-1 items-center justify-center">
									<TailSpin ariaLabel="loading-indicator" color="white" height="30" />
								</div>
							) : (
								<button
									type="submit"
									className="inline-flex items-center justify-center w-40 py-4 shadow-sm font-bold rounded-md text-xl text-black bg-gradient-to-r from-green-200 to-green-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800 sm:text-sm"
								>
									Register your property
								</button>
							)}
									</div>
								</div>
								<div className="space-y-5 flex-[3] max-w-[32em]">
									<div>
										<p className="text-lg text-white font-bold">Select Property Location</p>
									</div>
									<Images setSelectedIndex={setSelectedIndex} />
								</div>
							</div>

							
						</div>

						
					</div>
				</form>

				<MintComplete txid={txid} name={name} tokenid={token} open={open} setOpen={setOpen} src={file.source} supply={supply} />
			</main>
		</div>
	);
};

export default Mint;
