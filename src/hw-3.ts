"use strict";

class MapNode<K, V> {
	key: K;
	value: V;
	next: MapNode<K, V> | null;

	constructor(key: K, value: V, next: MapNode<K, V> | null = null) {
		this.key = key;
		this.value = value;
		this.next = next;
	}
}

class MapClass<K, V> {
	private buckets: Array<MapNode<K, V> | null>;
	private capacity: number;
	private _size: number;

	constructor(capacity: number = 16) {
		this.capacity = capacity;
		this.buckets = new Array<MapNode<K, V> | null>(capacity).fill(null);
		this._size = 0;
	}

	get size(): number {
		return this._size;
	}

	private hash(key: K): number {
		const str = typeof key === "string" ? key : JSON.stringify(key);
		let hash = 0;

		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}

		return Math.abs(hash) % this.capacity;
	}

	private findNode(
		bucketIndex: number,
		key: K,
	): { node: MapNode<K, V>; prev: MapNode<K, V> | null } | null {
		let node = this.buckets[bucketIndex];
		let prev: MapNode<K, V> | null = null;

		while (node !== null) {
			if (node.key === key) {
				return { node, prev };
			}
			prev = node;
			node = node.next;
		}

		return null;
	}

	set(key: K, value: V): void {
		const index = this.hash(key);
		const found = this.findNode(index, key);

		if (found) {
			found.node.value = value;
			return;
		}

		const newNode = new MapNode(key, value, this.buckets[index]);
		this.buckets[index] = newNode;
		this._size++;
	}

	get(key: K): V | undefined {
		const index = this.hash(key);
		const found = this.findNode(index, key);
		return found ? found.node.value : undefined;
	}

	delete(key: K): boolean {
		const index = this.hash(key);
		const found = this.findNode(index, key);

		if (!found) {
			return false;
		}

		if (found.prev) {
			found.prev.next = found.node.next;
		} else {
			this.buckets[index] = found.node.next;
		}

		this._size--;
		return true;
	}

	clear(): void {
		this.buckets = new Array<MapNode<K, V> | null>(this.capacity).fill(null);
		this._size = 0;
	}
}
