import React from "react";
import {useForm} from "react-hook-form";


const LoginForm = ({onSubmit, loading}) => {
    const { register, handleSubmit, errors } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register({
                        required: "Email is required"
                    })}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"/>
                { errors.email && <div className="text-danger mt-2">{errors.email.message}</div> }
            </div>


            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register({
                        required: "Password is required"
                    })}
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"/>
                { errors.password && <div className="text-danger mt-2">{errors.password.message}</div> }
            </div>

            <button
                disabled={loading}
                type="submit"
                className="btn btn-main bg-blue py-2 ttu">Submit
            </button>
        </form>
    )
};

export default LoginForm;
