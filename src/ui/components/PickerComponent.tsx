import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
import Cross from '../../assets/Cross';
import '../../styles/PickerComponent.less';

interface IProps {
  optionList: Option[];
  addSelected(option: Option): void;
  removeSelected(option: Option | string): void;
  selectedList: string[];
  placeholder: string;
}

const PickerComponent = ({
  optionList,
  selectedList,
  addSelected,
  removeSelected,
  placeholder,
}: IProps) => (
  <div>
    <Dropdown
      className="subject--dropdown"
      options={optionList}
      onChange={option => addSelected(option)}
      placeholder={placeholder}
      placeholderClassName={'dropdown-placeholder'}
      menuClassName={'dropdown-placeholder'}
    />
    <div className="subject--list">
      {selectedList &&
        selectedList.map((selected, index) => (
          <div key={index} className="subject--list-element">
            <p>{selected}</p>
            <button
              className="leksehjelp--button-close chip-btn-x"
              onClick={() => removeSelected(selected)}
            >
              <Cross color="#8b51c6" />
            </button>
          </div>
        ))}
    </div>
  </div>
);

export default PickerComponent;
