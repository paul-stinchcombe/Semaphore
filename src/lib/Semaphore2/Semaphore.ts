export default class Semaphore {
	private permits: number;
	private queue: (() => void)[] = [];

	constructor(permits: number) {
		this.permits = permits;
	}

	async acquire(): Promise<void> {
		if (this.permits > 0) {
			this.permits--;
			return Promise.resolve();
		}
		return new Promise((resolve) => this.queue.push(resolve));
	}

	release(): void {
		this.permits++;
		if (this.queue.length > 0 && this.permits > 0) {
			this.permits--;
			const next = this.queue.shift();
			if (next) next();
		}
	}
}
