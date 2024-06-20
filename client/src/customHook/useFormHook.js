import { useEffect } from "react";
//react-hook-form
import { useForm } from "react-hook-form";
export function useFormHook(inputForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm();

  //limpia errores
  useEffect(() => {
    const timeOut = setTimeout(() => {
      inputForm.map((data) => {
        clearErrors(data);
      });
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [errors]);

  return { register, handleSubmit, errors, reset, setValue };
}
