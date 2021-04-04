const MSG = {
	SHOW_FORM: "SHOW_FORM",
}

// change showform(true/false)
export function showFormMsg(showForm) {
	return {
		type: MSG.SHOW_FORM,
		showForm,
	}
}

function update(msg, model) {
	switch (msg.type) {
		case MSG.SHOW_FORM: {
			const { showForm } = msg
			return { ...model, showForm }
		}
		default:
			return model
	}
}

export default update
