import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { convertCtoF } from "./Controller"

const { pre, h1, div, i, span, form, input, select, option } = hh(h)

function getSide() {}

// create input box and drop down.
function inputColumn(css, id, dispatch, model) {
	const { leftValue, leftUnit, rightValue, rightUnit, sourceLeft } = model
	return div({ className: css }, [
		input({
			className: `border border-black block w-100 mb-4 p-2`,
			type: "text",
			id,
			value: id === "left" ? leftValue : rightValue,
			oninput: (e) => dispatch(convertCtoF(e.target.value)),
		}),
		select(
			{
				className: `block w-100 border border-black p-2`,
				id,
				onchange: () => {
					const side = document.getElementById(id)["id"]
					const unit = document.getElementById(id).value
					console.log({ side, unit })
				},
			},
			// prettier-ignore
			[
				option({ className: ``, value: "celsius"}, leftUnit),
				option({ className: ``, value: "fahrenheit"}, rightUnit),
			]
		),
	])
}

function tempertureForm(dispatch, model) {
	return form({ className: `` }, [
		inputColumn(`w-40 inline-block float-left`, "left", dispatch, model),
		div({ className: `w-20 inline-block h-100 text-center py-2` }, [
			span({ className: `` }, "="),
		]),
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
