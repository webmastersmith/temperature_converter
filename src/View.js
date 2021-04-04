import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { showFormMsg } from "./Controller"

const { pre, h1, div, i } = hh(h)

// total page view
function view(dispatch, model) {
	return div({ className: `max-w-60 w-100` }, [
		h1(
			{ className: `font-bold text-4xl border-b-2 border-black pb-2 mb-8` },
			"Temperture Converter"
		),
		div({ className: `w-20 h-20` }, [i({ className: `w-full icon-selector` })]),
		pre(JSON.stringify(model, null, 2)),
	])
}

export default view
