import React, { useState, useContext } from "react";
import { ChatPageContext } from "../../Context/ChatPageContext";
import { UserContext } from "../../Context/UserContext";

function FileUpload({ sendLink }) {
  const [files, setFiles] = useState({});
  const { messages, updateMessages } = useContext(ChatPageContext);
  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);

  /**
   *
   * @param {*} event
   */
  const onChangeHandler = event => {
    setFiles({
      ...files,
      selectedFile: event.target.files
    });
  };

  /**
   *
   */
  const onClickHandler = e => {
    const data = new FormData();
    for (let x = 0; x < files.selectedFile.length; x++) {
      data.append("files", files.selectedFile[x]);
    }
    // data.append("file", files.selectedFile[0]);
    fetch("http://127.0.0.1:3000/api/v1/fileupload/fileupload", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(success => {
        const fileUrl = success.fileUrl; // tretirati kao array
        // message format: message: msg, name:sender
        // check if fileUrl has 1 or multiple files
        let msgTxt = "";
        if (typeof fileUrl[Symbol.iterator] === "function") {
          fileUrl.forEach(url => {
            msgTxt += ` ${url} \n`;
          });
        } else {
          msgTxt = fileUrl;
        }
        updateMessages({ message: msgTxt, name: loggedInUser.username });
        sendLink(e, msgTxt);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <input
        type="file"
        className="form-control"
        multiple
        onChange={onChangeHandler}
      />
      <button
        type="button"
        className="btn btn-success btn-block light-blue"
        onClick={onClickHandler}
      >
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
