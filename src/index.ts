
const RECOMMENDED_PRICE = {
    'N': 14500,
    'DA': 22500,
    'L': 7000
} // Based on "Interrapidisimo" prices

const getData = async (): Promise<any> => {

}


export default {
	async fetch(request, env, ctx): Promise<Response> {
        const { searchParams } = new URL(request.url);
        const origin = searchParams.get('origin');
        const destination = searchParams.get('destination');
        
        if (!origin || !destination) {
            return new Response('Missing fields', { status: 400 });
        }


		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
