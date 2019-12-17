import React, { MouseEvent } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import Cross from '../../assets/Cross';
import { ITheme } from '../../interfaces';

interface IProps {
  optionList: Option[];
  selectedList: ITheme[];
  addTheme(option: Option): void;
  removeTheme(id: number, theme: string, event: MouseEvent): void;
  title: string;
  placeholder: string;
}

const ThemePickerComponent = ({
  title,
  optionList,
  addTheme,
  selectedList,
  removeTheme,
  placeholder,
}: IProps) => (
  <div className="dropdown-placeholder">
    <label className="formLabel">{title}</label>
    <Dropdown
      className="theme--dropdown"
      options={optionList}
      onChange={option => addTheme(option)}
      placeholder={placeholder}
    />
    <div className="theme--list">
      {selectedList.map(({ theme, id }, index) => (
        <div key={index} className="theme--list-element">
          <p>{theme}</p>
          <button
            className="theme--button-close"
            onClick={e => removeTheme(id, theme, e)}
          >
            <Cross color="#8b51c6" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ThemePickerComponent;
