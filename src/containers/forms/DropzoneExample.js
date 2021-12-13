// /* eslint-disable import/no-extraneous-dependencies */
// import React, { Component } from 'react';
// import DropzoneComponent from 'react-dropzone-component';
// import 'dropzone/dist/min/dropzone.min.css';
//
// const ReactDOMServer = require('react-dom/server');
//
// const dropzoneComponentConfig = {
//   postUrl: 'https://httpbin.org/post',
// };
// const dropzoneConfig = {
//   thumbnailHeight: 160,
//   maxFilesize: 2,
//   previewTemplate: ReactDOMServer.renderToStaticMarkup(
//     <div className="dz-preview dz-file-preview mb-3">
//       <div className="d-flex flex-row ">
//         <div className="p-0 w-30 position-relative">
//           <div className="dz-error-mark">
//             <span>
//               <i />{' '}
//             </span>
//           </div>
//           <div className="dz-success-mark">
//             <span>
//               <i />
//             </span>
//           </div>
//           <div className="preview-container">
//             {/*  eslint-disable-next-line jsx-a11y/alt-text */}
//             <img data-dz-thumbnail className="img-thumbnail border-0" />
//             <i className="simple-icon-doc preview-icon" />
//           </div>
//         </div>
//         <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
//           <div>
//             {' '}
//             <span data-dz-name />{' '}
//           </div>
//           <div className="text-primary text-extra-small" data-dz-size />
//           <div className="dz-progress">
//             <span className="dz-upload" data-dz-uploadprogress />
//           </div>
//           <div className="dz-error-message">
//             <span data-dz-errormessage />
//           </div>
//         </div>
//       </div>
//       <a href="#/" className="remove" data-dz-remove>
//         {' '}
//         <i className="glyph-icon simple-icon-trash" />{' '}
//       </a>
//     </div>
//   ),
//   headers: { 'My-Awesome-Header': 'header value' },
// };
//
// export default class DropzoneExample extends Component {
//   clear() {
//     this.myDropzone.removeAllFiles(true);
//   }
//
//   render() {
//     return (
//       <DropzoneComponent
//         config={dropzoneComponentConfig}
//         djsConfig={dropzoneConfig}
//         eventHandlers={{
//           init: (dropzone) => {
//             this.myDropzone = dropzone;
//           },
//         }}
//       />
//     );
//   }
// }


// // all about dropZone
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// // import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//
// // import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
// import DisplayCoverPhotos from '../../views/app/ui/forms/DisplayCoverImages';
// // import {app} from "./firebase";
//
// const S3_BUCKET ='andco-photos';
// const REGION ='us-east-2';
// const ACCESS_KEY ='AKIAVF6CGNH4EOHF5Z5H';
// const SECRET_ACCESS_KEY ='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';
//
// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }
//
// const UploadImageToS3WithReactS3 = () => {
//
//     const onDrop = useCallback((acceptedFiles) => {
//         // Do something with the files
//         // const storage = getStorage(app);
//         //
//         // // Create a reference to 'images/mountains.jpg'
//         // const mountainImagesRef = ref(storage, `images/${acceptedFiles[0].name}`);
//         // uploadBytes(mountainImagesRef, acceptedFiles[0]).then((snapshot) => {
//         //     getDownloadURL(ref(storage, `images/${acceptedFiles[0].name}`)).then(url => console.log(url, ' url'))
//         // });
//         // console.log(acceptedFiles[0].name);
//         handleUpload(acceptedFiles[0]);
//     }, []);
//
//     const [selectedFile, setSelectedFile] = useState(null);
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//
//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }
//
//     const handleUpload = async (file) => {
//         uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }
//
//     return(
//         <div {...getRootProps()}>
//             <input {...getInputProps()} />
//             {isDragActive ? (
//                 <p>Drop the files here ...</p>
//             ) : (
//                 <p>Drag 'n' drop some files here, or click to select files</p>
//             )}
//         </div>)
// }
//
// export default UploadImageToS3WithReactS3;




// all about dropZone
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { getDatabase, ref, push } from "firebase/database";
// import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
// import {app} from "./firebase";
import firebase from "firebase";

const S3_BUCKET ='andco-photos';
const REGION ='us-east-2';
const ACCESS_KEY ='AKIAVF6CGNH4EOHF5Z5H';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        // const storage = getStorage(app);
        //
        // // Create a reference to 'images/mountains.jpg'
        // const mountainImagesRef = ref(storage, `images/${acceptedFiles[0].name}`);
        // uploadBytes(mountainImagesRef, acceptedFiles[0]).then((snapshot) => {
        //     getDownloadURL(ref(storage, `images/${acceptedFiles[0].name}`)).then(url => console.log(url, ' url'))
        // });
        // console.log(acceptedFiles[0].name);
        handleSelect(acceptedFiles[0]);
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const [isSelected, setIsSelected] = useState(false);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleSelect = async (file) => {
        const img = {}
        await uploadFile(file, config)
          .then(data => {img.photoURL = data.location})
          .catch(err => console.error(err))
        // const database = getDatabase();
        const database = firebase.database();
        // push(ref(database, 'design/frontCoverImages'), img)
        setSelectedFile(img);
        setIsSelected(true);
        // eslint-disable-next-line react/button-has-type

    }

    const handleUpload = () => {
        const postListRef = firebase.database().ref('design/frontCoverImages');
        postListRef.push(selectedFile);
        setIsSelected(false);
    }

    return(

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}

      </div>

    {isSelected && <button onClick={handleUpload} className="btn-danger">Upload Img</button>}
          </div>

    )

}

export default UploadImageToS3WithReactS3;