import { Toast } from "react-toastify/dist/components";

export default function toast(func, message) {
    if (!Toast.isActive(1234)) {
        func(message, {
            toastId: 1234,
        });
    }
}
