

export const selectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: 'none',
        minHeight: '40px',
        boxShadow: 'none',
        "& hover": {
            border: 'none'
        }
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        color: "var(--dsc-color-font-placeholder)"
    }),
    indicatorSeparator: (provided: any, state: any) => ({
        ...provided,
        display: "none"
    })
}

