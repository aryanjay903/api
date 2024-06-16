/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		apiUrl:
			process.env.NODE_ENV === "production"
				? process.env.API_URL // production api
				: "http://localhost:3000/api", // development api
	},
};

export default nextConfig;
