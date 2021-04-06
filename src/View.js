import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { changeTemp, changeUnit } from "./Controller"
import * as R from "ramda"

const { pre, h1, div, i, span, form, input, select, option } = hh(h)

// captilize first letter and lowercase rest of word.
const captilize = R.converge(R.concat, [
	R.pipe(R.head, R.toUpper),
	R.pipe(R.tail, R.toLower),
])

function inputBox(id, dispatch, model) {
	const { leftValue, rightValue } = model
	return input({
		className: `border border-black block w-100 mb-4 p-2`,
		type: "text",
		id: id,
		value: id === "left" ? leftValue : rightValue,
		oninput: (e) => {
			const side = document.getElementById(id)["id"]
			return dispatch(changeTemp({ num: e.target.value, side }))
		},
	})
}

function selectBox(id, dispatch, model) {
	const leftOption = ["CELSIUS", "FARENHEIT", "KELVIN"]
	const rightOption = ["FARENHEIT", "CELSIUS", "KELVIN"]
	const optionArr = id === "left" ? leftOption : rightOption
	return select(
		{
			className: `block w-100 border border-black p-2`,
			id: id + "Select",
			onchange: () => {
				const side = document.getElementById(id)["id"]
				const unit = document.getElementById(id + "Select").value
				return dispatch(changeUnit({ side, unit }))
			},
		},
		// create options array
		R.map((unit) => option({ value: unit }, captilize(unit)))(optionArr)
	)
}

// create inputBox and selectBox column.
function inputColumn(css, id, dispatch, model) {
	const { leftValue, rightValue } = model
	return div({ className: css }, [
		inputBox(id, dispatch, model),
		selectBox(id, dispatch, model),
	])
}

function tempertureForm(dispatch, model) {
	return form({ className: `` }, [
		inputColumn(`w-40 inline-block float-left`, "left", dispatch, model),
		div({ className: `w-20 inline-block h-100 text-center py-2` }, span("=")),
		inputColumn(`w-40 inline-block float-right`, "right", dispatch, model),
	])
}

// total page view
function view(dispatch, model) {
	return div({ className: `max-w-60 w-100` }, [
		h1(
			{ className: `font-bold text-4xl border-b-2 border-black pb-2 mb-8` },
			"Temperture Unit Converter"
		),
		tempertureForm(dispatch, model),
		// i({ className: `w-full icon-selector w-20 h-20` }),
		pre({ className: `mt-20` }, JSON.stringify(model, null, 2)),
	])
}

export default view
