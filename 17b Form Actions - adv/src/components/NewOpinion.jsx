import {useActionState, use} from 'react';
import {OpinionsContext} from './../store/opinions-context'
import { Submit } from './Submit';

function isMinLength(value, minLength=3) {
  if (value && value.length <= minLength) {
    return false;
  }

  return true;
}

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);

  const onSubmitAction = async function onSubmitAction (prevState, formData) {
    console.log(Object.fromEntries(formData));
  
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName')
  
    console.log({
      userName,
      title,
      body
    })
  
    const errors = [];
    if (!isMinLength(userName)) errors.push('invalid username');
    if(!isMinLength(title, 10)) errors.push('invalid title')
    if(!isMinLength(body, 10)) errors.push('input body');
  
    if (errors.length > 0) {
      console.log(errors);
      return {
        errors,
        entered: {
          userName, title, body
        }
      }
    }
  
    await addOpinion({userName, title, body});

    return {
      errors: null
    }
  }

  const [state, formAction, isPending] = useActionState(onSubmitAction, {errors: null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={state.entered?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={state.entered?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={state.entered?.body}></textarea>
        </p>

        {state.errors && (
          <ul>
            {state.errors.map(err=>(
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
