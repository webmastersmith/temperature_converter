import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { showFormMsg } from "./Controller"

const { pre } = hh(h)

// total page view
function view(dispatch, model) {
	return pre(JSON.stringify(model, null, 2))
}

export default view
