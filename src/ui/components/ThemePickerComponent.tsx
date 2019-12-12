import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
import Cross from '../../assets/Cross';
import { ITheme } from '../../interfaces';

interface IProps {
  themes: ITheme[];
  selectedThemes: ITheme[];
  addTheme(option: ITheme): void;
  removeTheme(theme: ITheme): void;
  title: string;
  placeholder: string;
}

const ThemePickerComponent = ({
  title,
  themes,
  addTheme,
  selectedThemes,
  removeTheme,
  placeholder,
}: IProps) => {
  const getThemeOptions = (): Option[] => {
    return themes
      .filter(theme => !selectedThemes.find(x => x.id === theme.id))
      .map(theme => ({
        value: theme.id.toString(),
        label: theme.theme,
      }));
  };

  return (
    <div className="dropdown-placeholder">
      <label className={'formLabel'}>{title}</label>
      <Dropdown
        className="theme--dropdown"
        options={getThemeOptions()}
        onChange={option => {
          const theme = themes.find(x => '' + x.id === option.value);
          if (theme) {
            addTheme(theme);
          }
        }}
        placeholder={placeholder}
      />
      <div className="theme--list">
        {selectedThemes.map((theme, index) => (
          <div key={index} className="theme--list-element">
            <p>{theme.theme}</p>
            <button
              className="theme--button-close"
              onClick={e => removeTheme(theme)}
            >
              <Cross color="#8b51c6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePickerComponent;
