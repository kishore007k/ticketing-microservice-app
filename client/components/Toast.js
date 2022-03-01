import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (success) => {
	toast.success(`${success}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const errorToast = (error) => {
	toast.error(`${error}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
