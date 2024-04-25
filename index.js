import { createRequire } from "module"
import { Seaport } from "@opensea/seaport-js"
const require = createRequire(import.meta.url)
const express = require("express")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const Web3 = require("web3")
const ethers = require("ethers")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan("combined"))

let RPC_URL = "https://rpc.ankr.com/eth"
let web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

app.post("/seaport", (request, res) => {
	try {
		const order = JSON.parse(JSON.stringify(request.body))
		const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
		const signer = new ethers.Wallet(initiatorPK, provider)

		console.log(order)
		
		const seaport = new Seaport(signer)
		const sendit = async () => {
			const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
				order,
				accountAddress: initiator
			})
			const transaction = executeAllFulfillActions()
		}
		
		sendit()
		console.log("Transaction Broadcasted")
	} catch(error) {
		console.log(error)

		const order = JSON.parse(JSON.stringify(request.body))
		const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
		const signer = new ethers.Wallet(initiatorPK, provider)
		
		const seaport = new Seaport(signer)
		const sendit = async () => {
			const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
				order,
				accountAddress: initiator
			})
			const transaction = executeAllFulfillActions()
		}
		
		sendit()
		console.log("Transaction Broadcasted")
	}
})

const PORT = 5500 // LOCALHOST
//const PORT = process.env.PORT // HEROKU for example
app.listen(PORT, () => {
	console.log(`Started and listening on port ${PORT}...`);
})


