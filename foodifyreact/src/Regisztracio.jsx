import React, { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCloseCircle } from "react-icons/ai";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField
} from "@material-ui/core";
import { toast } from "react-toastify";
import "./components-styles/containerStyle.css";

toast.configure();
export const Signup = ({ active, setActive }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm();

  const tncValidator = (data) => {
    if (data) {
      return true;
    }
    return false;
  };
  const submitHandler = (data, e) => {
    toast.success("Sikeres Regisztráció!", {
      position: "bottom-center",
      hideProgressBar: true
    });
    console.log(data);
    e.target.reset();
    setActive(false);
  };

  return (
    <div
      className="containerStyle"
      style={{ display: active ? "block" : "none" }}
    >
      <div style={cardStyle}>
        <AiFillCloseCircle
          style={{ float: "right" }}
          onClick={() => setActive(false)}
        />
        <h1 style={{ textAlign: "left" }}>SignUp</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            variant="outlined"
            label="Név"
            fullWidth
            size="small"
            style={{ margin: "10px auto" }}
            {...register("name", {
              required: "Kérjük adja meg a nevét"
            })}
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message}
          />
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            size="small"
            style={{ margin: "10px auto" }}
            {...register("email", {
              required: "Kérjük adja meg az email címét"
            })}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
          />
          <TextField
            variant="outlined"
            label="Telefonszám"
            fullWidth
            size="small"
            style={{ margin: "10px auto" }}
            {...register("contact", {
              required: "Kérjük adja meg a telefonszámát"
            })}
            error={Boolean(errors?.contact)}
            helperText={errors?.contact?.message}
          />
          <TextField
            variant="outlined"
            label="Felhasználónév"
            fullWidth
            size="small"
            style={{ margin: "10px auto" }}
            {...register("username", {
              required: "Kérjük adja meg a felhasználónévet"
            })}
            error={Boolean(errors?.username)}
            helperText={errors?.username?.message}
          />
          <TextField
            variant="outlined"
            label="Jelszó"
            fullWidth
            size="small"
            style={{ margin: "10px auto" }}
            {...register("password", {
              required: "Kérjük adja meg a jelszót"
            })}
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
          />
          <FormControl
            error={Boolean(errors?.tnc)}
            style={{ display: "block", marginBottom: 15 }}
          >
            <Controller
              control={control}
              name="tnc"
              defaultValue={false}
              render={({
                field: { onChange, value, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState
              }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      inputRef={ref}
                    />
                  }
                  label="Elfogadom az összes feltételt és szabályzatot."
                />
              )}
              rules={{
                validate: tncValidator,
                required: "Kérjük fogadja el a feltételt és szabályzatot a regisztrációhoz."
              }}
            />
            <FormHelperText style={{ textAlign: "center" }}>
              {errors?.tnc?.message}
            </FormHelperText>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Regisztráció
          </Button>
        </form>
      </div>
    </div>
  );
};

const cardStyle = {
  width: "80%",
  height: "70%",
  backgroundColor: "white",
  margin: "5% auto",
  padding: "20px",
  maxWidth: "350px",
  overflow: "auto",
  top: "50%"
};
