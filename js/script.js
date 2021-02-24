function addError(input, error) {
	if (!input) return;

	const field = input.closest("div.field");
	if (!field) return;

	removeErrors(field);

	field.classList.add("has-error");
	const icon = document.createElement("i");
	const text = document.createElement("p");
	const control = field.querySelector(".control");

	if (!icon || !text || !control) return;

	icon.classList.add("icon", "error");
	text.classList.add("text", "error");

	text.appendChild(document.createTextNode(error));

	field.appendChild(text);

	setTimeout(() => {
		control.appendChild(icon);
	}, 50);
}

function removeErrors(input) {
	if (!input) return;

	const field = input.closest("div.field");
	if (!field) return;

	field.classList.remove("has-error");

	field.querySelectorAll("i.icon.error, p.text.error").forEach((node) => {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	});
}

function isEmpty(input) {
	const value = input.value.trim();
	return value.length < 1;
}

function validDomain(email) {
	return email.match(/.*\.[A-Za-z]{2,255}$/);
}

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("register-form");

	const inputs = {
		"First Name": "[name='first_name']",
		"Last Name": "[name='last_name']",
		"Email Address": "[name='email_address']",
		Password: "[name='password']",
	};

	form.querySelectorAll(Object.values(inputs).toString()).forEach((input) => {
		input.addEventListener("input", () => {
			removeErrors(input);
		});
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// Validate empty
		Object.keys(inputs).forEach((key) => {
			const name = key;
			const input = form.querySelector(inputs[name]);

			if (isEmpty(input)) {
				addError(input, `${name} cannot be empty`);
			} else {
				removeErrors(input);
			}
		});

		// Validate email address
		const emailAddressInput = form.querySelector(inputs["Email Address"]);
		if (
			(emailAddressInput.validity && !emailAddressInput.validity.valid) ||
			!validDomain(emailAddressInput.value)
		) {
			addError(emailAddressInput, "Looks like this is not an email");
		}

		const errorFields = form.querySelectorAll("div.field.has-error");
		if (errorFields && !errorFields.length) {
			form.submit();
		}
	});
});
