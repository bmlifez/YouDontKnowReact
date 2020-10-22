import React from 'react';
import PropTypes from 'prop-types';

const ImgageUploader = props => {
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const imageUpload = (e) => {
        let imageGallery = localStorage.getItem('imageGallery');
        let imageCollection = [];
        if (imageGallery === undefined || imageGallery === null) {
            localStorage.setItem('imageGallery', JSON.stringify(imageCollection));
        } else {
            imageCollection = JSON.parse(imageGallery);
        }
        let id = "id" + Math.random().toString(16).slice(2);
        imageCollection.push(id);
        localStorage.setItem('imageGallery', JSON.stringify(imageCollection));
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            localStorage.setItem(id, base64);
        });
        props.saveClickCallback();
    };

    return (
        <div className={props.customWrapperClass}>
            <h2>{props.heading || 'Upload Image'}</h2>
            <input type="file" placeholder={props.placeholder} onChange={imageUpload} />
        </div>
    );
};

ImgageUploader.propTypes = {
    customWrapperClass: PropTypes.string,
    heading: PropTypes.string,
    placeholder: PropTypes.string,
};

export default React.memo(ImgageUploader);