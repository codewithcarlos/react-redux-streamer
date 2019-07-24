import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Field is supposed to be a React component while reduxForm is a function similar to the connect function from the React-Redux library

// class objects allow for helper methods inside class

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="ui error message">{error}</div>;
    }
  }
  renderInput = ({ input, label, meta }) => {
    // any time you show an input element with react need to make sure we show input element, assign its value, and give it an onChange callback handler
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      // spread operator takes all properties of input object and adds them to the input element. Shorter way to write what we need
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    // To customize helper functions we can just add additional props to field element since Field function by default will pass it through helper function
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title || formValues.title.trim() === '') {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  // name the form to something that describes what the form will do
  form: 'streamForm',
  validate
})(StreamForm);
