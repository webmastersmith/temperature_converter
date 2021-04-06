import * as R from "ramda"
const MSG = {
	LEFTVALUE: "LEFTVALUE",
	RIGHTVALUE: "RIGHTVALUE",
	UNIT: "UNIT",
}

// changeTemp returns {side: left, num: 30}
export function changeTemp(value) {
	const side = value.side === "left" ? MSG.LEFTVALUE : MSG.RIGHTVALUE
	return {
		type: side,
		value,
	}
}
// changeUnit returns {side: left, unit: "CELCIUS"}
export function changeUnit(value) {
	return {
		type: MSG.UNIT,
		value,
	}
}

const fixNum = R.curry((digit, temp) => parseFloat(temp.toFixed(digit)))

// Farenheit to Celsius
// (F - 32) x .5556 = C
const FARENHEITCELSIUS = R.pipe(
	R.subtract(R.__, 32),
	R.multiply(5556),
	R.divide(R.__, 10000),
	fixNum(4)
)
// console.log("FtoC", FtoC(30), "// -1.1111C")
// Farenheit to Kelvin
// F to C + 273.15 = K
const FARENHEITKELVIN = R.pipe(FARENHEITCELSIUS, R.add(273.15), fixNum(3))
// console.log("FtoK", FtoK(30), "// 272.039K")
// Celsius to Farenheit
// (C x 1.8) + 32 = F
const CELSIUSFARENHEIT = R.pipe(
	R.multiply(18),
	R.add(320),
	R.divide(R.__, 10),
	fixNum(2)
)
// console.log("CtoF", CtoF(30), "// 86F")
// Celsius to Kelvin
// C + 273.15 = K
const CELSIUSKELVIN = R.pipe(R.add(273.15), fixNum(2))
// console.log("CtoK", CtoK(30), "// 303.15K")

// Kelvin to Celsius
// K - 273.15 = C
const KELVINCELSIUS = R.pipe(
	R.multiply(100),
	R.subtract(R.__, 27315),
	R.divide(R.__, 100),
	fixNum(2)
)
// console.log("KtoC", KtoC(30), "// -243.15C")
// Kelvin to Farenheit
// K to C; C to F
const KELVINFARENHEIT = R.pipe(KELVINCELSIUS, CELSIUSFARENHEIT, fixNum(2))
// console.log("KtoF", KtoF(30), "// -405.67F")

// prettier-ignore
function getFunction(name) {
				switch (name) {
					case "FARENHEITCELSIUS": return FARENHEITCELSIUS
					case "FARENHEITKELVIN": return FARENHEITKELVIN
					case "CELSIUSFARENHEIT": return CELSIUSFARENHEIT
					case "CELSIUSKELVIN": return CELSIUSKELVIN
					case "KELVINFARENHEIT": return KELVINFARENHEIT
					default: return name
				}
}
// prettier-ignore
function findDouble(name) {
				switch (name) {
					case "CELSIUSCELSIUS": return true
					case "FARENHEITFARENHEIT": return true
					case "KELVINKELVIN": return true
				}
}

function update(msg, model) {
	switch (msg.type) {
		case MSG.LEFTVALUE: {
			const { num } = msg.value
			const leftValue = num
			const { leftUnit, rightUnit } = model
			const fn = getFunction(leftUnit + rightUnit)
			const rightValue = fn(leftValue)
			return { ...model, leftValue, rightValue, sourceLeft: true }
		}
		case MSG.RIGHTVALUE: {
			const { num } = msg.value
			const rightValue = num
			const { leftUnit, rightUnit } = model
			const fn = getFunction(rightUnit + leftUnit)
			const leftValue = fn(rightValue)
			return { ...model, leftValue, rightValue, sourceLeft: false }
		}
		case MSG.UNIT: {
			const { side, unit } = msg.value
			// left side
			if (side === "left") {
				const { leftValue, rightUnit } = model
				// prettier-ignore
				if (findDouble(unit+rightUnit)) {
					document.querySelector('#rightSelect [value="CELSIUS"]').selected = true;
					return model
				}
				const fn = getFunction(unit + rightUnit)
				const rightValue = fn(leftValue)
				return { ...model, [side + "Unit"]: unit, rightValue }
			}
			// right side
			const { rightValue, leftUnit } = model
			// prettier-ignore
			if (findDouble(unit+leftUnit)) {
				document.querySelector('#leftSelect [value="CELSIUS"]').selected = true;
				return model
			}
			const fn = getFunction(unit + leftUnit)
			const leftValue = fn(rightValue)
			return { ...model, [side + "Unit"]: unit, leftValue }
		}
		default:
			return model
	}
}

export default update
