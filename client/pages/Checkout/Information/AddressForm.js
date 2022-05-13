import React from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";

export default function AddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full mt-3">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="grid w-full grid-cols-1 gap-4 h-fit">
          <TextField
            fullWidth
            name="firstName"
            color="black"
            type="text"
            label="First Name"
            variant="outlined"
            error={!!errors.firstName}
            {...register("firstName", { required: true })}
          />
          <TextField
            fullWidth
            name="lastName"
            color="black"
            type="text"
            label="Last Name"
            variant="outlined"
            error={!!errors.lastName}
            {...register("lastName", { required: true })}
          />
          <TextField
            fullWidth
            name="address1"
            color="black"
            type="text"
            label="Address Line 1"
            variant="outlined"
            error={!!errors.address1}
            {...register("address1", { required: true })}
          />
          <TextField
            fullWidth
            name="address2"
            color="black"
            type="text"
            label="Address Line 1"
            variant="outlined"
            error={!!errors.address2}
            {...register("address2")}
          />
          <TextField
            fullWidth
            name="city"
            color="black"
            type="text"
            label="City"
            variant="outlined"
            error={!!errors.city}
            {...register("city", { required: true })}
          />
          <TextField
            fullWidth
            name="state"
            color="black"
            type="text"
            label="State"
            variant="outlined"
            error={!!errors.state}
            {...register("state", { required: true })}
          />
          <TextField
            fullWidth
            name="zip"
            color="black"
            type="text"
            label="Zip / Postal Code"
            variant="outlined"
            error={!!errors.zip}
            {...register("zip", { required: true })}
          />
          {/* <FormInput required name="firstName" label="First Name" /> */}

          {/* <FormInput required name="lastName" label="Last Name" />
              <FormInput required name="address1" label="Address Line 1" />
              <FormInput name="address2" label="Address Line 2" />
              <FormInput required name="city" label="City" />
              <FormInput required name="state" label="State" />
              <FormInput required name="zip" label="Zip / Postal Code" /> */}
        </div>

        <button type="submit" className="p-3 mt-6 text-xl text-white bg-black">
          Submit
        </button>
      </form>
    </div>
  );
}
