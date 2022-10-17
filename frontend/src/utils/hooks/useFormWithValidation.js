import React, {
    useCallback
} from 'react';

const useFormWithValidation = () => {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    function onChange(evt) {
        const input = evt.target;
        const name = input.name;
        const value = input.value;

        setValues({...values, [name]: value});
        setErrors({...errors, [name]: input.validationMessage});
        setIsValid(input.closest('form').checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setErrors, setIsValid, setValues]
    )

    return {
        values,
        setValues,
        errors,
        isValid,
        setIsValid,
        onChange,
        resetForm,
    }
};

export default useFormWithValidation;