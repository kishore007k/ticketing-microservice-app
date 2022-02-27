import axios from "axios";
import { useState } from "react";
import { errorToast, successToast } from "../components/Toast";

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState([]);

	const doRequest = async () => {
		try {
			const response = await axios[method](url, body);
			successToast(JSON.stringify(response.data.email));

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (error) {
			const errorsArr = error.response.data.errors;

			setErrors(errorsArr);

			errorsArr.forEach((error) => {
				errorToast(JSON.stringify(error.message));
			});
		}
	};

	return { doRequest, errors };
};

export default useRequest;
