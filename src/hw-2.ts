"use strict";

// ─── Enums ───────────────────────────────────────────────────────────────────

/** Пол пользователя */
enum UserGender {
	Male = "male",
	Female = "female",
}

/** Роль пользователя в системе */
enum UserRole {
	Admin = "admin",
	Moderator = "moderator",
	User = "user",
}

/** Группа крови */
enum BloodGroup {
	APositive = "A+",
	ANegative = "A-",
	BPositive = "B+",
	BNegative = "B-",
	ABPositive = "AB+",
	ABNegative = "AB-",
	OPositive = "O+",
	ONegative = "O-",
}

// ─── Интерфейсы ──────────────────────────────────────────────────────────────

interface Hair {
	color: string;
	type: string;
}

interface Coordinates {
	lat: number;
	lng: number;
}

interface Address {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: Coordinates;
	country: string;
}

interface Bank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}

interface Company {
	department: string;
	name: string;
	title: string;
	address: Address;
}

interface Crypto {
	coin: string;
	wallet: string;
	network: string;
}

/** Основной интерфейс пользователя */
interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: UserGender;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: BloodGroup;
	height: number;
	weight: number;
	eyeColor: string;
	hair: Hair;
	ip: string;
	address: Address;
	macAddress: string;
	university: string;
	bank: Bank;
	company: Company;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: Crypto;
	role: UserRole;
}

/** Ответ API /users */
interface UsersResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

// ─── Функция ─────────────────────────────────────────────────────────────────

/**
 * Отправляет запрос к https://dummyjson.com/users и выводит данные в консоль.
 */
async function fetchUsers(): Promise<void> {
	try {
		const response = await fetch("https://dummyjson.com/users");

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status} ${response.statusText}`,
			);
		}

		const data: UsersResponse = await response.json();

		console.log("=== Users Response ===");
		console.log(`Total: ${data.total}`);
		console.log(`Skip: ${data.skip}`);
		console.log(`Limit: ${data.limit}`);
		console.log(`Users count: ${data.users.length}`);
		console.log("");

		data.users.forEach((user: User) => {
			console.log(
				`${user.id}. ${user.firstName} ${user.lastName} | ` +
					`Age: ${user.age} | Gender: ${user.gender} | Role: ${user.role} | ` +
					`Email: ${user.email}`,
			);
		});

		console.log("\n✅ Данные успешно загружены и отображены.");
	} catch (error) {
		console.error("❌ Ошибка при загрузке пользователей:", error);
	}
}

// ─── Запуск ──────────────────────────────────────────────────────────────────

fetchUsers();

export {};
