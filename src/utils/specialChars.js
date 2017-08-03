const specialChars = ["(", ")", " ", "+", "/", "-"];

export const validateInput = (template, char) => {
	let regex;
	switch (true) {
		 // eslint-disable-next-line 
		case template == 9 :
			regex = new RegExp(/[0-9]{1}/);
			return regex.test(char);
		default:
			regex = new RegExp(/[a-zA-Z]{1}/);
			return regex.test(char);
	}
}

export default specialChars;