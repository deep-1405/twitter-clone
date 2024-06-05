/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"help.twitter.com",
			"img.freepik.com",
			"images.cnbctv18.com",
			"encrypted-tbn0.gstatic.com",
			"lh3.googleusercontent.com",
			"firebasestorage.googleapis.com",
			"drive.google.com",
		],
	},
};

module.exports = nextConfig;
