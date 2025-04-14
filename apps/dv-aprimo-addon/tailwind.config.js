const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
          'dv-primary-button': '#378284',
          'dv-primary-button-hover': '#2e6a6b',
          'dv-primary-button-border': '#265759',
          'dv-icon-color': '#0000008a',
          'dv-card-background': '#ffffff8f',
          'dv-text-color': '#000000e6',
          'dv-title-color': '#0000008F',
          'dv-select-background': '#00000005',
          'dv-div-bottom-border': '',
          'dv-secondary-button': '#fcfcfc',
          'dv-secondary-button-border': '#378284',
          'dv-secondary-button-hover': '#f1f1f1',
          'tiny-mce-editor-hover': '#0000000f',
          'dv-btn-grp-selected': '#C9E7E8',
          'dv-btn-grp-selected-hover': '#DBEFF0',
          'dv-btn-grp-hover': '#0000000a',
          'dv-icon-h1': '#6D3870',
          'dv-icon-h2': '#4B8BD7',
          'dv-icon-h3': '#0F7D12',
          'dv-icon-h4': '#E67E22',
          'dv-icon-h5': '#34495E',
          'dv-disabled-button': '#0000000a',
          'dv-disabled-button-text': '#0000004d',
          'dv-panel-footer': '#fafafa'
      },
  }
  },
  plugins: [require('flowbite/plugin') ],
};
