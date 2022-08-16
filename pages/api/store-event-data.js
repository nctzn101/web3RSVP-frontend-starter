// import helpers

import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// export handler function for incoming requests
// request method must be POST
export default async function handler(req, res) {
	if (req.method === "POST") {
		return await storeEventData(req, res);
	} else {
		return res.status(405).json({ message: "Method not allowed", success: false });
	}
}

// function to get data from the request, store it; otherwise return error
// if storage is successful, return CID of the IPFS directory where the file is stored

async function storeEventData(req, res) { // store data about event on IPFS
	const body = req.body;
	try {
		const files = await makeFileObjects(body); // creates json file that includes metadata from req.body
		const cid = await storeFiles(files); // stores the json file to web3.storage
		return res.status(200).json({ success: true, cid: cid });

	} catch (err) {
		return res.status(500).json({ error: "Error creating event", success: false });
	}
}

async function makeFileObjects(body) { // compile data to be stored
	const buffer = Buffer.from(JSON.stringify(body));

	const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
	const files = await getFilesFromPath(imageDirectory); // get images (as array) from our images folder

	files.push(new File([buffer], "data.json")); // data.json is a new file with data from buffer, pushed to the files array
	return files;
}

// web3storage object to interact with
function makeStorageClient() {
	return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

async function storeFiles(files) {
	const client = makeStorageClient(); // create web3storage object
	const cid = await client.put(files); // get the cid once files are uploaded to IPFS
	return cid;

}