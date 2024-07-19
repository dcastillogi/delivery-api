import { CITIES } from './lib/const';

const RECOMMENDED_PRICE: { [key: string]: number } = {
	N: 16000,
	DA: 24500,
	L: 7500,
	R: 9500,
}; // Based on "Interrapidisimo" prices

type City = {
	category: string;
	name: string;
	department: string;
};

type CityMap = {
	[key: string]: City;
};

const getData = async (): Promise<CityMap> => {
	return CITIES;
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

		if (originCity.department == destinationCity.department) {
			if (originCity.category === 'N' && destinationCity.category === 'N') {
				return Response.json({ price: RECOMMENDED_PRICE['R'], deliveryType: 'R' });
			}
		}

		const price = Math.max(RECOMMENDED_PRICE[originCity.category], RECOMMENDED_PRICE[destinationCity.category]);
		const deliveryType = price === RECOMMENDED_PRICE['N'] ? 'N' : 'DA';

		return Response.json({ price, deliveryType });
	},
} satisfies ExportedHandler<Env>;
