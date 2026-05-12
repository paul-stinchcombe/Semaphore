import { Semaphore } from './lib/Semaphore';

console.log('Semaphore Example');
console.log('--------------------------------');

const throttler = new Semaphore(2);
const facebook = throttler.callFunction(getUrl, 'https://www.facebook.com');
const amazon = throttler.callFunction(getUrl, 'https://www.amazon.com');
const netflix = throttler.callFunction(getUrl, 'https://www.netflix.com');
const google = throttler.callFunction(getUrl, 'https://www.google.com');

Promise.allSettled([facebook, amazon, netflix, google]).then((results) => {
	console.log('--------------------------------');
});

async function getUrl(url: string) {
	console.log(`Getting URL: ${url}`);
	const response = await fetch(url);
	return response.text();
}
