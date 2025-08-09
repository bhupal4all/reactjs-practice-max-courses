import Input from "../components/Input.tsx";
import Form, {FormHandle} from "../components/Form.tsx";
import Button from "../components/Button.tsx";
import {useRef} from "react";

function App() {

    const customFormRef = useRef<FormHandle>(null);

    function handleOnSave(data: unknown) {
        const savedData = data as { name: string; age: string };
        console.log("Saved data:", savedData);

        console.log('Clearing form...');
        customFormRef.current?.clear();
    }

    function handleGetData() {
        const data = customFormRef.current?.getData() as { name: string; age: string };
        if (data) {
            console.log("Reading Form Data Values:", data);
        } else {
            console.log("No form data available.");
        }
    }

    return (
        <main>
            <h2>Learning React JS with Typescript</h2>

            <Button onClick={handleGetData}>Get Data</Button>

            <Form onSave={handleOnSave} ref={customFormRef}>
                <Input id="name" label="Name" placeholder="Enter your name"/>
                <Input id="age" label="Age" type="number" placeholder="Enter your age"/>

                <p>
                    <Button>Save</Button>
                </p>
            </Form>
        </main>
    );
}

export default App;
