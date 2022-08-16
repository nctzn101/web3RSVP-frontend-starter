import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";


// function connects to the contract deployed
function connectContract() {

	const contractAddress = "0x429aea90321CC2a99Eae32CEdF2e5B5b23615f55";
	const contractABI = abiJSON.abi;

	let rsvpContract;
	try {
		const { ethereum } = window;

		if (ethereum) {
			// check for ethereum object
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			rsvpContract = new ethers.Contract(contractAddress, contractABI, signer);
		} else {
			console.log("Ethereum object doesn't exist!");
		}
	} catch (error) {
		console.log("ERROR:", error);
	}

	return rsvpContract;
}

// export function
export default connectContract;