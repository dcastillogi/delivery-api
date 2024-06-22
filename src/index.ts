const RECOMMENDED_PRICE = {
	N: 14500,
	DA: 22500,
	L: 7000,
}; // Based on "Interrapidisimo" prices

type City = {
	category: 'N' | 'DA' | 'L';
	name: string;
	department: string;
};

type CityMap = {
	[key: string]: City;
};

const getData = async (): Promise<CityMap> => {
	const response = await fetch(
		'https://raw.githubusercontent.com/dcastillogi/delivery-api/3eb07993282af513bfd471310284c3a634b8bc86/data/data.json'
	);
	return response.json() as Promise<CityMap>;
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { searchParams } = new URL(request.url);
		const origin = searchParams.get('origin');
		const destination = searchParams.get('destination');

		if (!origin || !destination) {
			return new Response('Missing fields', { status: 400 });
		}

		const cities = await getData();

		if (!cities[origin] || !cities[destination]) {
			return new Response('Invalid cities', { status: 400 });
		}

		if (origin === destination) {
			return Response.json({ price: RECOMMENDED_PRICE['L'], deliveryType: 'L' });
		}

		const originCity = cities[origin];
		const destinationCity = cities[destination];

		const price = Math.max(RECOMMENDED_PRICE[originCity.category], RECOMMENDED_PRICE[destinationCity.category]);
		const deliveryType = price === RECOMMENDED_PRICE['N'] ? 'N' : 'DA';

		return Response.json({ price, deliveryType });
	},
} satisfies ExportedHandler<Env>;
