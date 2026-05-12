export default class Semaphore {
	private currentRequests: {
		resolve: (value: any) => void;
		reject: (reason?: any) => void;
		fnToCall: (...args: any[]) => Promise<any>;
		args: any[];
	}[];
	private runningRequests: number;
	private maxConcurrentRequests: number;

	/**
	 * Creates a semaphore that limits the number of concurrent Promises being handled
	 * @param {*} maxConcurrentRequests max number of concurrent promises being handled at any time
	 */
	constructor(maxConcurrentRequests: any = 1) {
		this.currentRequests = [];
		this.runningRequests = 0;
		this.maxConcurrentRequests = maxConcurrentRequests;
	}

	/**
	 * Returns a Promise that will eventually return the result of the function passed in
	 * Use this to limit the number of concurrent function executions
	 * @param {*} fnToCall function that has a cap on the number of concurrent executions
	 * @param  {...any} args any arguments to be passed to fnToCall
	 * @returns Promise that will resolve with the resolved value as if the function passed in was directly called
	 */
	callFunction<T>(fnToCall: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
		return new Promise((resolve, reject) => {
			this.currentRequests.push({
				resolve,
				reject,
				fnToCall,
				args,
			});
			this.tryNext();
		});
	}

	tryNext() {
		if (!this.currentRequests.length) {
			return;
		} else if (this.runningRequests < this.maxConcurrentRequests) {
			let { resolve, reject, fnToCall, args } = this.currentRequests.shift() as {
				resolve: (value: any) => void;
				reject: (reason?: any) => void;
				fnToCall: (...args: any[]) => Promise<any>;
				args: any[];
			};
			this.runningRequests++;
			const req = fnToCall(...args);
			req.then((res: any) => resolve(res))
				.catch((err: any) => reject(err))
				.finally(() => {
					this.runningRequests--;
					this.tryNext();
				});
		}
	}
}

/* HOW TO USE */
// const throttler = new Semaphore(2);
// throttler.callFunction(fetch, 'www.facebook.com');
// throttler.callFunction(fetch, 'www.amazon.com');
// throttler.callFunction(fetch, 'www.netflix.com');
// throttler.callFunction(fetch, 'www.google.com');
