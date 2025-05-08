// import { useState } from "react";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";
// import ReactDatePicker from "react-datepicker";
// import { useController } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// /* Text input */
// export const TextInput = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-red-500">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}
//       <input
//         onChange={onChange} // send value to hook form
//         onBlur={onBlur} // notify when input is touched/blur
//         value={value} // input value
//         name={props.name} // send down the input name
//         placeholder={props.placeholder}
//         disabled={props.disabled}
//         type={props.type || "text"}
//         min={0}
//         className={
//           props.error
//             ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border !border-danger ${props.className}`
//             : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
//         }
//       />
//     </div>
//   );
// };
// /* Password input */
// export const PasswordInput = (props) => {
//   const [show, setShow] = useState(false);
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-red-500">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <div className="relative">
//         <input
//           onChange={onChange} // send value to hook form
//           onBlur={onBlur} // notify when input is touched/blur
//           value={value} // input value
//           name={props.name} // send down the input name
//           placeholder={props.placeholder}
//           type={show ? "text" : "password"}
//           disabled={props.disabled}
//           className={
//             props.error
//               ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
//               : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
//           }
//         />

//         {show ? (
//           <AiOutlineEye
//             size={21}
//             className="cursor-pointer absolute top-3 right-3 text-gray-500"
//             onClick={() => setShow(!show)}
//           />
//         ) : (
//           <AiOutlineEyeInvisible
//             size={21}
//             className="cursor-pointer absolute top-3 right-3 text-gray-500"
//             onClick={() => setShow(!show)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// /* Textarea input */
// export const TextAreaInput = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-danger">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <textarea
//         onChange={onChange} // send value to hook form
//         onBlur={onBlur} // notify when input is touched/blur
//         value={value} // input value
//         name={props.name} // send down the input name
//         placeholder={props.placeholder}
//         disabled={props.disabled}
//         rows={props.rows || 4}
//         className={
//           props.error
//             ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
//             : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
//         }
//       />
//     </div>
//   );
// };

// /* Date input */
// export const DateInput = (props) => {
//   const {
//     field: { onChange, onBlur, value, ref },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue ? new Date(props.defaultvalue) : null,
//   });

//   const handleDateChange = (date) => {
//     console.log(date); // This will log the selected date
//     onChange(date); // Call the original onChange to update the form state
//   };

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-danger">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <div>
//         <ReactDatePicker
//           onChange={handleDateChange} // send value to hook form
//           onBlur={onBlur} // notify when input is touched/blur
//           value={value} // input value
//           name={props.name} // send down the input name
//           ref={ref} // send input ref, so we can focus on input when error appear
//           placeholderText={props.placeholder}
//           selected={value ? new Date(value) : null}
//           disabled={props.disabled}
//           dateFormat="dd-MM-yyyy"
//           className={
//             props.error
//               ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
//               : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
//           }
//         />
//       </div>
//     </div>
//   );
// };

// /* ------------------------ Single Select field -------------------- */

// const customStyles = (error) => {
//   const myStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       minHeight: 50,
//       fontSize: 14,
//       color: "#000",
//       background: "#fff",
//       boxShadow: "none",
//       "&:hover": { borderColor: "1px solid #fff" },
//       border: error ? "1px solid red" : "1px solid #dfdfdf",
//       borderRadius: 6,
//     }),
//   };
//   return myStyles;
// };

// /* Single select field */
// export const SingleSelect = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   const handleSelect = (event) => {
//     onChange(event);
//     props.onSelected?.(event);
//   };

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-danger">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <Select
//         classNamePrefix={`custom-select`}
//         onBlur={onBlur} // notify when input is touched/blur
//         value={value} // input value
//         name={props.name} // send down the input name
//         styles={customStyles(props.error)}
//         components={{
//           DropdownIndicator: () => null,
//           IndicatorSeparator: () => null,
//         }}
//         options={props.options}
//         onChange={handleSelect}
//         isClearable={props.isClearable}
//         defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
//         placeholder={props.placeholder}
//       />
//     </div>
//   );
// };

// /* ------------------------ Multi Select field -------------------- */
// export const MultiSelect = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   const handleSelect = (event) => {
//     onChange(event);
//     props.onSelected?.(event);
//   };

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-danger">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <Select
//         isMulti
//         value={value}
//         onBlur={onBlur}
//         name={props.name}
//         options={props.options}
//         onChange={handleSelect}
//         classNamePrefix={`custom-select`}
//         styles={customStyles(props.error)}
//         components={{
//           DropdownIndicator: () => null,
//           IndicatorSeparator: () => null,
//         }}
//         isClearable={props.isClearable}
//         placeholder={props.placeholder}
//         defaultValue={
//           props.defaultvalue
//             ? props.defaultvalue.map((item) => ({
//                 value: item.value,
//                 label: item.label,
//               }))
//             : null
//         }
//       />
//     </div>
//   );
// };

// /* ------------------------ Searchable Select field -------------------- */
// export const SearchableSelect = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   /* Search from API */
//   const searchOptions = (inputValue, callback) => {
//     props.onSearch(inputValue).then((results) => {
//       if (results) {
//         setTimeout(() => {
//           callback(results);
//         }, 500);
//       }
//     });
//   };

//   const handleSelect = (event) => {
//     onChange(event);
//     props.onSelected?.(event);
//   };

//   return (
//     <div>
//       {props.error ? (
//         <p className="text-sm mb-1 text-danger">{props.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">{props.label}</p>
//       )}

//       <AsyncSelect
//         classNamePrefix={`custom-select`}
//         cacheOptions
//         onBlur={onBlur} // notify when input is touched/blur
//         value={value} // input value
//         name={props.name} // send down the input name
//         styles={customStyles(props.error)}
//         onChange={handleSelect}
//         loadOptions={searchOptions}
//         isClearable={props.isClearable}
//         defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
//         placeholder={props.placeholder}
//         loadingMessage={() => "Searching ..."}
//         noOptionsMessage={() => "No results found !"}
//         components={{
//           DropdownIndicator: () => null,
//           IndicatorSeparator: () => null,
//         }}
//       />
//     </div>
//   );
// };
// // image upload
// export const ImageUpload = (props) => {
//   const {
//     field: { onChange, onBlur, value },
//     fieldState: { error },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: {
//       required: props.required ? "Image is required" : false,
//       validate: (file) => {
//         if (!file && props.required) return "Image is required";
//         return (
//           !file || file.size < 2 * 1024 * 1024 || "File must be less than 2MB"
//         );
//       },
//     },
//     defaultValue: props.defaultValue || null,
//   });

//   const [preview, setPreview] = useState(
//     value ? URL.createObjectURL(value) : props.defaultValue || null
//   );

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       onChange(file);
//       setPreview(URL.createObjectURL(file)); // Show file preview
//       props.onUpload?.(file); // Callback for additional handling
//     }
//   };
//   return (
//     <div className="flex flex-col space-y-1">
//       <span className="text-sm  text-gray-500 flex ">
//         {props?.label}{" "}
//         <span className="text-white">{props?.rules?.required ? "*" : ""}</span>
//       </span>
//       <div className="relative border rounded-md w-full cursor-pointer bg-white">
//         <input
//           type="file"
//           accept="image/*"
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           onBlur={onBlur}
//           onChange={handleFileChange}
//         />
//         <div className="flex items-center space-x-2 cursor-pointer">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               className="h-12 w-12 object-cover rounded-md cursor-pointer"
//             />
//           ) : (
//             <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-md cursor-pointer">
//               {props?.imgUrl ? (
//                 <img
//                   src={`${process.env.REACT_APP_API_SERVER}${props?.imgUrl}`}
//                   alt="loading"
//                   className="h-12 w-12 object-cover rounded-md cursor-pointer"
//                 />
//               ) : (
//                 "📷"
//               )}
//             </div>
//           )}
//           <span className="text-gray-700">Click to upload</span>
//         </div>
//       </div>
//       {props?.error && (
//         <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
//       )}
//     </div>
//   );
// };

// /* checkbox input */
// export const TextCheckbox = (props) => {
//   const {
//     field: { onBlur, value },
//   } = useController({
//     name: props.name,
//     control: props.control,
//     rules: { ...props.rules },
//     defaultValue: props.defaultvalue,
//   });

//   return (
//     <div>
//       {props?.error ? (
//         <p className="text-sm mb-1 text-red-500">{props?.error}</p>
//       ) : (
//         <p className="text-sm mb-1 text-gray-500">
//           {props?.label}{" "}
//           <span className="text-red-500">
//             {props?.rules?.required ? "*" : ""}
//           </span>
//         </p>
//       )}
//       <input
//         onChange={props?.onChange} // send value to hook form
//         onBlur={onBlur} // notify when input is touched/blur
//         value={value} // input value
//         name={props?.name} // send down the input name
//         placeholder={props?.placeholder}
//         disabled={props?.disabled}
//         type={props?.type || "text"}
//         min={0}
//         checked={props.checked}
//         className={
//           props?.error
//             ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border !border-danger ${props?.className}`
//             : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props?.className}`
//         }
//       />
//     </div>
//   );
// };
import { useEffect, useState } from "react";
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

  // console.log("value", value);

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
            ? `w-full text-sm bg-lightCard dark:bg-darkCard disabled:bg-gray-300 rounded-md outline-none p-[14px] border  dark:text-darkTitle border-red-500 ${props.className}`
            : `w-full text-sm bg-lightCard dark:bg-darkCard text-lightTitle dark:text-darkTitle disabled:bg-gray-300 rounded-md outline-none p-[14px] border   border-lightBorder  dark:border-darkBorder ${props.className}`
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
        <p className="text-sm mb-1 text-danger">{props.error}</p>
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
        <p className="text-sm mb-1 text-danger text-red-500">{props.error}</p>
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
            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-red-500 ${props.className}`
            : `w-full text-sm bg-lightCard dark:bg-darkCard text-lightTitle dark:text-darkTitle disabled:bg-gray-300 rounded-md outline-none p-[14px] border   border-lightBorder  dark:border-darkBorder ${props.className}`
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

const customStyles = (error, themeValue) => {
  console.log("themeValue:", themeValue);

  const myStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: 50,
      fontSize: 14,
      color: "black",
      background: themeValue === 'light' ? '#FFFFFF' : "#1E293B",
      boxShadow: "none",
      "&:hover": { borderColor: "1px solid #fff" },
      border: error ? "1px solid red" : "1px solid #dfdfdf",
      borderRadius: 6,
      cursor: "pointer",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#87CEEB'
        : state.isFocused
        ? '#7FB3F0'
        : '',
      color:
        state.isSelected || state.isFocused
          ? themeValue === 'light'
            ? 'black'
            : '#fff'
          : '',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: themeValue === 'light' ? 'black' : 'white',
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
  // console.log("value",value)

  const handleSelect = (event) => {
    onChange(event);
    props.onSelected?.(event);
  };

  // mode added 
  // ||"light"
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

console.log("theme1",theme)

  // Optional: Listen for theme changes across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      setTheme(event.detail); // Update the state with the new theme from the event
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);
  
  return (
    <div className="cursor-pointer">
      {props.error ? (
        <p className="text-sm mb-1 text-danger text-red-500">{props.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500 ">{props.label}</p>
      )}
      <Select
        classNamePrefix={`custom-select`}
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props.name} // send down the input name
        styles={customStyles(props.error,theme) }
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}      
        options={props.options}
        onChange={handleSelect}
        isClearable={props.isClearable}
        defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
        placeholder={props.placeholder}
        // disabled={props.disabled}
        isDisabled={props.disabled} 
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
        classNamePrefix={`custom-select `}
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

// global image uploadd file

export const ImageUpload = (props) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: props.required ? "Image is required" : false,
      validate: (file) => {
        if (!file && props.required) return "Image is required";
        return !file || file.size < 2 * 1024 * 1024 || "File must be less than 2MB";
      },
    },
    defaultValue: props.defaultValue || null,
  });

  const [preview, setPreview] = useState(
    value ? URL.createObjectURL(value) : props.defaultValue || null
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file)); // Show file preview
      props.onUpload?.(file); // Callback for additional handling
    }
  }; 
  return (
    <div className="flex flex-col space-y-1">
  
      <span className="text-sm mb- text-gray-500 flex gap-1">
        {props?.label}{" "}
        <span className="text-white">{props?.rules?.required ? "*" : ""}</span>
      </span>
      <div className="relative  rounded-md w-full cursor-pointer  border bg-lightCard dark:bg-darkCard border-lightBorder  dark:border-darkBorder">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
          onBlur={onBlur}
          onChange={handleFileChange}
        />
        <div className="flex items-center space-x-2 cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-12 w-12 object-cover rounded-md cursor-pointer "
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center  rounded-md cursor-pointer bg-gray-200 dark:bg-black">
              {props?.imgUrl ? (
                <img
                  src={`${process.env.REACT_APP_API_SERVER}${props?.imgUrl}`}
                  alt="loading"
                  className="h-12 w-12 object-cover rounded-md cursor-pointer "
                />
              ) : (
                "📷"
              )}
            </div>
          )}
          <span className="text-gray-700 dark:text-gray-300 ">Click to upload</span>
        </div>
      </div>
      {props?.error && (
        <p className="text-xs text-red-500 pl-3.5 ">{props?.error}</p>
      )}
    </div>
  );
};

/* checkbox input */
export const TextCheckbox = (props) => {
  const {
    field: {  onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,

  });

  return (
    <div>
      {props?.error ? (
        <p className="text-sm mb-1 text-red-500">{props?.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">
          {props?.label}{" "}
          <span className="text-red-500">
            {props?.rules?.required ? "*" : ""}
          </span>
        </p>
      )}
      <input
        onChange={props?.onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props?.name} // send down the input name
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        type={props?.type || "text"}
        min={0}
        checked={props.checked}
        className={
          props?.error
            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border !border-danger ${props?.className}`
            : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border  disabled:border-gray-300 ${props?.className}`
        }
      />
    </div>
  );
};



export const ExcelUpload = (props) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: props.required ? "File is required" : false,
      validate: (file) => {
        if (!file && props.required) return "File is required";
        const allowedTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "application/vnd.ms-excel", // .xls
          "text/csv", // .csv
        ];
        if (file && !allowedTypes.includes(file.type)) {
          return "Only Excel or CSV files are allowed";
        }
        return !file || file.size < 5 * 1024 * 1024 || "File must be less than 5MB";
      },
    },
    defaultValue: null,
  });

  const [fileName, setFileName] = useState(value ? value.name : "");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
      setFileName(file.name);
      props.onUpload?.(file); // Optional callback
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm mb-1 text-gray-500 flex gap-1">
        {props?.label}{" "}
        <span className="text-red-500">{props?.required ? "*" : ""}</span>
      </span>
      <div className="relative border border-lightBorder dark:border-darkBorder rounded-md w-full cursor-pointer bg-lightCard dark:bg-darkCard text-lightTitle dark:text-darkTitle px-4 py-2">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onBlur={onBlur}
          onChange={handleFileChange}
        />
        <div className="flex items-center justify-between">
          <span className="text-lightTitle dark:text-darkTitle truncate w-5/6">
            {fileName || "Click to upload Excel/CSV file"}
          </span>
          <span className="text-blue-500 font-medium">📁</span>
        </div>
      </div>
      {error && <p className="text-xs text-red-500 pl-3.5">{error.message}</p>}
    </div>
  );
};
