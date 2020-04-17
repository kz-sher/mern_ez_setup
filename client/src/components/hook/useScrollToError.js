import { useEffect } from 'react';
import { useFormikContext } from "formik";
import { scrollToPoint } from 'utils/general.util';

const intersect = (obj1, obj2) => {
    return Object.keys(obj1).filter(key => key in obj2);
}

const useScrollToError = () => {
    const { errors, initialValues, isSubmitting, isValidating } = useFormikContext();
    useEffect(() => {
        const keys = Object.keys(errors);
        if (keys.length > 0 && isSubmitting && !isValidating) {
            const orderedKeys = intersect(initialValues, errors);
            const inputField = document.querySelector(`input[name="${orderedKeys[0]}"]`);
            scrollToPoint(inputField.parentElement.offsetTop);
        }
    }, [errors, initialValues, isSubmitting, isValidating]);
}

export default useScrollToError;