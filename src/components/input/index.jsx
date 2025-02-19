import { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ReactDatePicker from "react-datepicker";
import { useController } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

/* Text input */
export const TextInput = (props) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-red-500">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}
            <input
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={props.name} // send down the input name
                placeholder={props.placeholder}
                disabled={props.disabled}
                type={props.type || "text"}
                min={0}
                className={
                    props.error
                        ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border !border-danger ${props.className}`
                        : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
                }
            />
        </div>
    );
};
/* Password input */
export const PasswordInput = (props) => {
    const [show, setShow] = useState(false);
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-red-500">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <div className="relative">
                <input
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={props.name} // send down the input name
                    placeholder={props.placeholder}
                    type={show ? "text" : "password"}
                    disabled={props.disabled}
                    className={
                        props.error
                            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
                            : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
                    }
                />

                {show ? (
                    <AiOutlineEye
                        size={21}
                        className="cursor-pointer absolute top-3 right-3 text-gray-500"
                        onClick={() => setShow(!show)}
                    />
                ) : (
                    <AiOutlineEyeInvisible
                        size={21}
                        className="cursor-pointer absolute top-3 right-3 text-gray-500"
                        onClick={() => setShow(!show)}
                    />
                )}
            </div>
        </div>
    );
};

/* Textarea input */
export const TextAreaInput = (props) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-danger">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <textarea
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={props.name} // send down the input name
                placeholder={props.placeholder}
                disabled={props.disabled}
                rows={props.rows || 4}
                className={
                    props.error
                        ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
                        : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
                }
            />
        </div>
    );
};

/* Date input */
export const DateInput = (props) => {
    const {
        field: { onChange, onBlur, value, ref },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue ? new Date(props.defaultvalue) : null,
    });

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-danger">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <div>
                <ReactDatePicker
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={props.name} // send down the input name
                    ref={ref} // send input ref, so we can focus on input when error appear
                    placeholderText={props.placeholder}
                    selected={value ? new Date(value) : null}
                    disabled={props.disabled}
                    dateFormat="dd-MM-yyyy"
                    className={
                        props.error
                            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
                            : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
                    }
                />
            </div>
        </div>
    );
};

/* ------------------------ Single Select field -------------------- */

const customStyles = (error) => {
    const myStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 50,
            fontSize: 14,
            color: "#000",
            background: "#fff",
            boxShadow: "none",
            "&:hover": { borderColor: "1px solid #fff" },
            border: error ? "1px solid red" : "1px solid #dfdfdf",
            borderRadius: 6,
        }),
    };
    return myStyles;
};

/* Single select field */
export const SingleSelect = (props) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    const handleSelect = (event) => {
        onChange(event);
        props.onSelected?.(event);
    };

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-danger">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <Select
                classNamePrefix={`custom-select`}
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={props.name} // send down the input name
                styles={customStyles(props.error)}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                options={props.options}
                onChange={handleSelect}
                isClearable={props.isClearable}
                defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
                placeholder={props.placeholder}
            />
        </div>
    );
};

/* ------------------------ Multi Select field -------------------- */
export const MultiSelect = (props) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    const handleSelect = (event) => {
        onChange(event);
        props.onSelected?.(event);
    };

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-danger">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <Select
                isMulti
                value={value}
                onBlur={onBlur}
                name={props.name}
                options={props.options}
                onChange={handleSelect}
                classNamePrefix={`custom-select`}
                styles={customStyles(props.error)}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                isClearable={props.isClearable}
                placeholder={props.placeholder}
                defaultValue={
                    props.defaultvalue
                        ? props.defaultvalue.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))
                        : null
                }
            />
        </div>
    );
};

/* ------------------------ Searchable Select field -------------------- */
export const SearchableSelect = (props) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name: props.name,
        control: props.control,
        rules: { ...props.rules },
        defaultValue: props.defaultvalue,
    });

    /* Search from API */
    const searchOptions = (inputValue, callback) => {
        props.onSearch(inputValue).then((results) => {
            if (results) {
                setTimeout(() => {
                    callback(results);
                }, 500);
            }
        });
    };

    const handleSelect = (event) => {
        onChange(event);
        props.onSelected?.(event);
    };

    return (
        <div>
            {props.error ? (
                <p className="text-sm mb-1 text-danger">{props.error}</p>
            ) : (
                <p className="text-sm mb-1 text-gray-500">{props.label}</p>
            )}

            <AsyncSelect
                classNamePrefix={`custom-select`}
                cacheOptions
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={props.name} // send down the input name
                styles={customStyles(props.error)}
                onChange={handleSelect}
                loadOptions={searchOptions}
                isClearable={props.isClearable}
                defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
                placeholder={props.placeholder}
                loadingMessage={() => "Searching ..."}
                noOptionsMessage={() => "No results found !"}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    );
};
