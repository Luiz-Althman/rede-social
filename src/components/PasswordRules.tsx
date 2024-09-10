import { useCallback, useEffect, useState } from 'react';
import styles from './PasswordRules.module.css';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import React from 'react';

interface PasswordRules {
    value: string;
}

export interface IValidation {
    label: string;
    isValid: boolean;
}

export function PasswordRules({ value = '' }: PasswordRules) {
    const [validations, setValidations] = useState<IValidation[]>([
        {
            label: 'Deve conter no mínimo de 8 caracteres',
            isValid: false,
        },
        {
            label: 'Deve conter no máximo de 20 caracteres',
            isValid: false,
        },
        // { label: 'Deve conter um caracter especial', isValid: false },
        // { label: 'Deve conter um número', isValid: false },
        // { label: 'Deve conter letra maíuscula', isValid: false },
        // { label: 'Deve conter letra minúscula', isValid: false },
    ]);

    const handleCheckValue = useCallback(() => {
        setValidations([
            {
                label: 'Deve conter no mínimo de 8 caracteres',
                isValid: value.length >= 8,
            },
            {
                label: 'Deve conter no máximo de 20 caracteres',
                isValid: value.length >= 8 && value.length <= 20,
            },
            // {
            //     label: 'Deve conter um caracter especial (@$!%*?&)',
            //     isValid: value.match(/[`!@$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/)
            //         ? true
            //         : false,
            // },
            // {
            //     label: 'Deve conter um número',
            //     isValid: value.match(/\d/) ? true : false,
            // },
            // {
            //     label: 'Deve conter letra maíuscula',
            //     isValid: value.match(/[A-Z]/) ? true : false,
            // },
            // {
            //     label: 'Deve conter letra minúscula',
            //     isValid: value.match(/[a-z]/) ? true : false,
            // },
        ]);
    }, [value]);

    useEffect(() => {
        handleCheckValue();
    }, [handleCheckValue]);

    return (
        <div className={styles.main}>
            {validations.map((validation: IValidation, index: number) => (
                <p key={`idx${index}`}>
                    {validation.isValid ? (
                        <ImCheckboxChecked />
                    ) : (
                        <ImCheckboxUnchecked />
                    )}
                    {validation.label}
                </p>
            ))}
        </div>
    );
}
