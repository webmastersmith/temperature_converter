import * as R from "ramda"
const MSG = {
	LEFTVALUE: "LEFTVALUE",
	// FARENHEIT: "FARENHEIT"
}

// change showform(true/false)
export function convertCtoF(leftValue) {
	return {
		type: MSG.LEFTVALUE,
		leftValue,
	}
}
// export function convertFtoC(isF) {
// 	return {
// 		type: MSG.FARENHEIT,
// 		isF,
// 	}
// }

// (30°C x 1.8) + 32 = 86°F
const findF = R.pipe(R.multiply(1.8), R.add(32))

// (50°F - 32) x .5556 = 10*C
const findC = R.pipe(R.subtract(R.__, 32), R.multiply(0.5556))

function update(msg, model) {
	switch (msg.type) {
		case MSG.LEFTVALUE: {
			const { leftValue } = msg
			return { ...model, leftValue }
		}
		default:
			return model
	}
}

export default update
