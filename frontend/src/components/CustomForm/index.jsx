import React, { useState } from 'react'
import './index.scss'
import { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from 'react-bootstrap/Button'
import MenuItem from '@mui/material/MenuItem'
import { Grid } from '@mui/material'
import { addEditMovie, addEditReview } from '../../service'
import { useEffect, useContext } from 'react'
import AppContext from '../../context'

const CustomForm = ({ formDetails, formVariant, defaultValues = null }) => {
    const [date, setDate] = useState(null)
    const [formValues, setFormValues] = useState(defaultValues)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const {
        movieData,
        setMovieData,
        setInitialMovieData,
        reviewData,
        setReviewData,
    } = useContext(AppContext)

    const onSubmit = async (e) => {
        e.preventDefault()
        if (formVariant === 'movie' && !formValues['releaseDate']) {
            setError('Release date is empty. Please select it')
            return
        }
        try {
            if (formVariant === 'movie') {
                const response = await addEditMovie(formValues)
                const data = response?.data
                setInitialMovieData({
                    ...movieData,
                    data,
                })
            } else if (formVariant === 'review') {
                const response = await addEditReview(formValues)
                const reviews = response?.data?.result
                if (reviewData) {
                    let resultData = reviewData
                    resultData.movie = response?.data?.movie
                    resultData.reviews = { ...reviewData.reviews, reviews }
                    setReviewData(resultData)
                }
            } else {
                return
            }
            setSuccess('Saved Successfully')
        } catch (error) {
            console.log(error)
            setError('Internal server error! Please try again.')
        }
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
        if (success) {
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        }
    }, [error, success])
    const handleInputChange = (e, id) => {
        const { name, value } = e.target
        if (id) {
            setFormValues({
                ...formValues,
                movieId: id,
            })
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="form-container">
            {/* <input defaultValue="test" {...register('example')} />
            <input {...register('exampleRequired', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" /> */}
            {formDetails?.map((value, index) => {
                if (['text', 'number'].includes(value.type)) {
                    return (
                        <TextField
                            id="outlined-basic"
                            key={index}
                            label={value.label}
                            name={value.fieldName}
                            variant="outlined"
                            placeholder={value.placeholder}
                            required={value.required}
                            type={value.type}
                            multiline={value?.rows ? true : false}
                            rows={value?.rows ? value.rows : 1}
                            InputProps={
                                value.type === 'number'
                                    ? { inputProps: { min: 0, max: 10 } }
                                    : null
                            }
                            onChange={handleInputChange}
                        />
                    )
                } else if (value.type === 'date') {
                    return (
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            key={index}
                        >
                            <DatePicker
                                label={value.label}
                                value={date}
                                name={value.fieldName}
                                required={value.required}
                                onChange={(newValue) => {
                                    setDate(newValue)
                                    setFormValues({
                                        ...formValues,
                                        releaseDate: new Date(
                                            newValue,
                                        ).toISOString(),
                                    })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    )
                } else if (value.type === 'dropdown') {
                    return (
                        <FormControl key={index}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={value.fieldName}
                                required={value.required}
                                //initialValue={formValues?.rating ?? ''}
                                //inputRef={register}
                                //label="Age"
                                onChange={(e, child) =>
                                    handleInputChange(e, child.props.id)
                                }
                                displayEmpty
                            >
                                <MenuItem disabled>
                                    <em>{value?.placeholder}</em>
                                </MenuItem>
                                {movieData?.map((value, index) => (
                                    <MenuItem
                                        key={index}
                                        value={value.name}
                                        id={value._id}
                                    >
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                }
            })}
            {error ? <p className="alert alert-danger">{error}</p> : null}
            {success ? <p className="alert alert-success">{success}</p> : null}
            <Grid className="align-items">
                <Button className="button primary-button" type="submit">
                    {formVariant === 'movie' ? 'Create Movie' : 'Add Review'}
                </Button>
            </Grid>
        </form>
    )
}

export default CustomForm
