import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import withApollo from "../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import {useGetPortfolio} from "../../apollo/actions";
import withAuth from "../../hoc/withAuth";

const CreateNewPortfolioForm = ({ onSubmit, defaultValues, loading}) => {
    const [isStartDateValueSelect, setStartDateValueSelect] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const {register, errors, handleSubmit, setValue, reset} = useForm({
        defaultValues,
        mode: 'onChange'
    });

    const {dataFromPortfoliosPage} = useGetPortfolio();
    const portfolios = dataFromPortfoliosPage && dataFromPortfoliosPage.portfolios || [];

    useEffect(() => {
        register({
            name: 'startDate'
        });
        register({
            name: 'endDate'
        });
    }, [register]);


    if (defaultValues) {
        useEffect(() => {
            reset(defaultValues);
        }, [defaultValues]);

        useEffect(() => {
            const {startDate, endDate} = defaultValues;
            if (startDate) {
                setStartDate(new Date(parseInt(startDate, 10)))
            }

            if (endDate) {
                setEndDate(new Date(parseInt(endDate, 10)))
            }
        }, [defaultValues]);
    }


    const handleDateChange = (dateType, setDate) => date => {
        setStartDateValueSelect(false);
        setValue(dateType, (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date);
        setDate(date);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register({
                        required: "Title is required",
                        maxLength: {
                            value: 64,
                            message: "Title maximal length is 64 symbols"
                        },
                    })}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"/>
                {errors.title && <div className="text-danger mt-2">{errors.title.message}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="city">Company</label>
                <input
                    ref={register({
                        required: "Company name is required",
                        maxLength: {
                            value: 64,
                            message: "Company mane maximal length is 64 symbols"
                        }
                    })}
                    name="company"
                    type="text"
                    className="form-control"
                    id="company"/>
                {errors.company && <div className="text-danger mt-2">{errors.company.message}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="city">Company Website</label>
                <input
                    ref={register({
                        required: "Company website is required",
                        maxLength: {
                            value: 100,
                            message: "Company website maximal length is 64 symbols"
                        }
                    })}
                    name="companyWebsite"
                    type="text"
                    className="form-control"
                    id="companyWebsite"/>
                {errors.companyWebsite && <div className="text-danger mt-2">{errors.companyWebsite.message}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="street">Location</label>
                <input
                    ref={register({
                        required: "Company location is required",
                        maxLength: {
                            value: 64,
                            message: "Company location maximal length is 64 symbols"
                        }
                    })}
                    name="location"
                    type="text"
                    className="form-control"
                    id="location"/>
                {errors.location && <div className="text-danger mt-2">{errors.location.message}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                    ref={register({
                        required: "Job title is required"
                    })}
                    name="jobTitle"
                    type="text"
                    className="form-control"
                    id="jobTitle"/>
                {errors.jobTitle && <div className="text-danger mt-2">{errors.jobTitle.message}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register({
                        required: "Description is required"
                    })}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
                </textarea>
                { errors.description && <div className="text-danger mt-2">{errors.description.message}</div> }
            </div>

            <div className="form-group">
                <label htmlFor="street">Start Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        selected={startDate}
                        onBlur={() => {!startDate && setStartDateValueSelect(true)}}
                        onChange={handleDateChange('startDate', setStartDate)}
                    />
                </div>
                { (!startDate && isStartDateValueSelect) && <div className="text-danger mt-2">Start date is required</div> }
            </div>

            <div className="form-group">
                <label htmlFor="street">End Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        disabled={!endDate}
                        selected={endDate}
                        onChange={handleDateChange('endDate', setEndDate)}
                    />
                </div>
            </div>
            <div className="form-group">
                {endDate &&
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDateChange('endDate', setEndDate)(null)}>
                    No End Date
                </button>
                }
                {!endDate &&
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleDateChange('endDate', setEndDate)(new Date())}>
                    Set End Date
                </button>
                }
            </div>

            <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
                onClick={() => {!startDate && setStartDateValueSelect(true)}}
            >
                {defaultValues ? "Update" : "Create"}
            </button>
        </form>
    )
};

export default withApollo(withAuth(CreateNewPortfolioForm, ['admin', 'instructor']), {getDataFromTree});
