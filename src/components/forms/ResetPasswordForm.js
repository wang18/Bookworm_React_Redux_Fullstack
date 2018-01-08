import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends React.Component{
    state={
        data:{
            token:this.props.token,
            password:'',
            passwordConfirmation:''
        },
        loading: false,
        errors:{}
    };

    onChange = (e)=>
        this.setState({
            ...this.state,
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value
            }
        });

    validate = (data) => {
        const errors = {};
        const {password, passwordConfirmation} = data;
        if(!password) errors.password="Can't be blank";
        if(password!==passwordConfirmation) errors.passwordConfirmation="Passwords must match";
        return errors;
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length===0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch((err) =>
                    this.setState({
                        errors: err.response.data.errors,
                        loading:false
                }));
        }
    };

    render(){
        const {data,errors,loading} =this.state;
        return(<div>
            <Form loading={loading} onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                           name="password"
                           id="password"
                           placeholder="your new password"
                           value={data.password}
                           onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>

                <Form.Field error={!!errors.passwordConfirmation}>
                    <label htmlFor="passwordConfirmation">New Password</label>
                    <input type="password"
                           name="passwordConfirmation"
                           id="passwordConfirmation"
                           placeholder="Confirm your new password"
                           value={data.passwordConfirmation}
                           onChange={this.onChange}
                    />
                    {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation}/>}
                </Form.Field>

                <Button primary>Reset</Button>
            </Form>
        </div>);
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
