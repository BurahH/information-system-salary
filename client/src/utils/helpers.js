export const getDate = timeStamp => {
	const date = new Date(timeStamp);
	return date.toLocaleDateString();
};

export const getNDS = (sum, salary) => {
	const nds = salary * 12 > 1917000 ? sum * 0.15 : sum * 0.13;
	return Math.round(nds * 100) / 100;
};

export const getTimeStamp = (year, month, day) => {
	const date = new Date(year, month, day);
	return date.getTime();
};
