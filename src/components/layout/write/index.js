import PropTypes from 'prop-types';
import TextInput from '../../elements/applicationUi/textareas/textarea2';
import Sign from '../../elements/applicationUi/actionPanels/actionPanel7';
const { faker } = require('@faker-js/faker');

const rows = [
	{ key: 'Full Name', value: faker.name.findName() },
	{ key: 'Mailing address', value: faker.address.streetAddress() + ', Mera City' },
	{ key: 'Application Type', value: 'Land Registry' },
	{ key: 'Property Price', value: faker.finance.amount(50000, 150000, 0, '$') },
	{
		key: 'Specifications',
		value:
			faker.finance.amount(80, 140, 0, '') +
			'x' +
			faker.finance.amount(80, 140, 0, '') +
			' sqm parcel spanning [' +
			faker.address.nearbyGPSCoordinate([ 33, -170 ], 10, true) +
			'] to [' +
			faker.address.nearbyGPSCoordinate([ 33, -170 ], 10, true) +
			'].'
	}
];
const Write = () => {
	return (
		<main className="m-2">
			<div className="bg-gradient-to-r from-yellow-500 via-bitcoin-400 to-transparent p-1 rounded-lg">
				<div className="p-20 rounded-lg bg-black lg:grid lg:gap-8">
					<TextInput rows={rows} />
					<Sign rows={rows} />
				</div>
			</div>
		</main>
	);
};

Write.propTypes = {
	children: PropTypes.node.isRequired
};

export default Write;
