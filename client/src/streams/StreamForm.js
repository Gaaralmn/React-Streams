import React from 'react';
import { reduxForm, Field } from 'redux-form';
import history from '../history';
import { Link } from 'react-router-dom';

class StreamForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        console.log("meta: " + JSON.stringify(meta));
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        console.log(this.props);
        return(
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field name='title' component={this.renderInput} label="Enter a Title" />
                <Field 
                    name='description' 
                    component={this.renderInput} 
                    label="Enter the Description" 
                />
                <button className="ui button primary">Submit</button>
                <Link to='/' className="ui button negative">Cancel</Link>
                {/* <button onClick={() => history.push('/')} className="ui button negative">Cancel</button> */}
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    console.log(errors);
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);