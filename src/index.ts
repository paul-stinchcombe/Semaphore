import { Semaphore } from './lib/Semaphore';
import { Semaphore as Semaphore2 } from './lib/Semaphore2';

const MAX_CONCURRENT_REQUESTS = 2;

///////////////// Semaphore Example 1 /////////////////
const example1 = async (): Promise<PromiseSettledResult<string>[]> => {
	return new Promise((resolve) => {
		console.log('Semaphore Example 1');
		console.log('--------------------------------');

		const throttler = new Semaphore2(MAX_CONCURRENT_REQUESTS);
		const facebook = runWithSemaphore('https://www.facebook.com');
		const amazon = runWithSemaphore('https://www.amazon.com');
		const netflix = runWithSemaphore('https://www.netflix.com');
		const google = runWithSemaphore('https://www.google.com');

		Promise.allSettled([facebook, amazon, netflix, google]).then((results) => {
			console.log('--------------------------------');
			resolve(results);
		});

		/**
		 * Run the function with the semaphore
		 * @param url - The URL to get
		 * @returns The text of the URL
		 */
		async function runWithSemaphore(url: string) {
			await throttler.acquire();
			try {
				return await getUrl(url);
			} finally {
				throttler.release();
			}
		}
	});
};
///////////////// End of Semaphore Example 1 /////////////////

///////////////// Semaphore Example 2 /////////////////
const example2 = async (): Promise<PromiseSettledResult<string>[]> => {
	return new Promise((resolve) => {
		console.log('\n\nSemaphore Example 2');
		console.log('--------------------------------');

		const throttler2 = new Semaphore(MAX_CONCURRENT_REQUESTS);
		const facebook2 = throttler2.callFunction(getUrl, 'https://www.facebook.com');
		const amazon2 = throttler2.callFunction(getUrl, 'https://www.amazon.com');
		const netflix2 = throttler2.callFunction(getUrl, 'https://www.netflix.com');
		const google2 = throttler2.callFunction(getUrl, 'https://www.google.com');

		Promise.allSettled([facebook2, amazon2, netflix2, google2]).then((results) => {
			console.log('--------------------------------');
		});
	});
};
///////////////// End of Semaphore Example 2 /////////////////

/**
 * Get the URL and return the text
 * @param url - The URL to get
 * @returns The text of the URL
 */
async function getUrl(url: string) {
	console.log(`Getting URL: ${url}`);
	const response = await fetch(url);
	return response.text();
}

const qualified = async (): Promise<number> => {
	const response = await fetch('https://galxeq1.kamiunlimited.com?address=0x9dB2FF2061dC2D5eDA183baC52F445E9c6334d96');
	const resp = await response.text();
	console.log(resp);
	const qualified = ((JSON.parse(resp).result >>> 0) & (1 << 2)) !== 0 ? 1 : 0;
	console.log(qualified > 0 ? 'Qualified' : 'Not Qualified');
	return qualified;
};

(async () => {
	const isQualified = await qualified();

	if (isQualified > 0) {
		await example1();
		await example2();
	}
})();
