import {hasMinLength} from './../util/validation';
import { useActionState } from 'react'; 

function onFormSubmitAction(prevFormState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    console.log({email, password, confirmPassword});
    
    const errors = [];

    if (!hasMinLength(email, 6)){
      errors.push('Email must be at least 6 characters long.');
    }

    if (password !== confirmPassword){
      errors.push('passwords are not matching')
    }

    console.log('errors', errors);
    
    if (errors.length > 0) {
      return {
        errors: errors,
        data: {
          email,
          password,
          confirmPassword
        }
      }
    }

    return {errors: null};
  }

export default function Signup() {

  const [formState, formActionFromHook, pending] = useActionState(onFormSubmitAction, {errors: null});

  return (
    <form action={formActionFromHook} >
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.data?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultChecked={formState.data?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultChecked={formState.data?.confirmPassword} 
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && <ul className='errors'>
          {formState.errors.map(err=><li>{err}</li>)}
      </ul>}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
