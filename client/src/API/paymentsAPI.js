import { $API } from ".";

export const getPayments = async (month, year) => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/payment?month=${month}&year=${year}`
	);
  return data;
};

export const getPaymentByUserId = async (id, month, year) => {
  const {data} = await $API.get(
    `http://26.162.53.239:8080/payment/${id}?month=${month}&year=${year}`
  )
  return data
}