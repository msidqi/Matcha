import React from "react";

const noop = () => {};

const FileInput = ({ value, onChangeProp = noop, ...rest }) => (
  <div>
    {Boolean(value.length) && (
      <div>Selected files: {value.map(f => f.name).join(", ")}</div>
    )}
    <label>
      Click to select some files...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={e => {
            onChangeProp([...e.target.files]);
        }}
        // onClick={ () => { setTimeout(() => { console.log(this) }, 9000) } }
        multiple
      />
    </label>
  </div>
);

export default FileInput;

{/* <FileInput
value=""
onChange={ (files) => { console.log(files) }}
/> */}