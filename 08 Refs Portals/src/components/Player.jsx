import React from "react";

export default function Player() {
  const [name, setName] = React.useState('no-name');
  const nameRef = React.useRef();

  function handleClick($event) {
    setName(nameRef.current.value);
    nameRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome '{name ? name : 'unknown entity'}'</h2>
      <p>
        <input type="text" ref={nameRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
