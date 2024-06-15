import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
	throw new Error(
		"Please define the MONGODB_URL environment variable inside .env.local"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { connection: null, promise: null };
}

const mongodb = async () => {
	if (cached.connection) {
		return cached.connection;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false, // Disable mongoose buffering
			dbname: "api",
		};
		cached.promise = mongoose
			.connect(MONGODB_URL, opts)
			.then((mongoose) => {
				return mongoose;
			})
			.catch((error) => {
				console.log(error);
			});
	}
	cached.connection = await cached.promise;
	return cached.connection;
};

export default mongodb;
