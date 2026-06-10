function swapKeysAndValues<T>(obj: T): T {
	const swapped: T = {} as T;

	for (const key in obj) {
		swapped[obj[key] as keyof T] = key as unknown as T[keyof T];
	}
	return swapped;
}

const result = swapKeysAndValues({ a: 1, b: 2, c: 3 });
console.log(result);
