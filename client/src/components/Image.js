import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    uploadState: "",
    loading: false,
    authorized: ["image/jpeg", "image/png"],
    errors: [],
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createImage = (fileUrl = null) => {
    if (fileUrl !== null) {
      image["image"] = fileUrl;
    } 
    return image
  };

  

  uploadFile = (file, metadata) => {
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

 

  render() {
    
    const { errors, message, loading, uploadState} = this.state;

    return (
      <Segment className="message__form">
        
       
          <Button
            color="teal"
            disabled={uploadState === "uploading"}
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
    
      </Segment>
    );
  }
}

export default MessageForm;
