import React, { useEffect } from 'react';

function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

const DropZone = () => {
  useEffect(() => {
    this.fileSelector = buildFileSelector();
  }, []);

  const handleFileSelect = e => {
    e.preventDefault();
    this.fileSelector.click();
  };

  return (
    <a className="button" href="" onClick={() => handleFileSelect}>
      Select files
    </a>
  );
};

export default DropZone;
