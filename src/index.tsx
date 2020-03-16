import * as React from 'react';
import { render } from 'react-dom';
import {
  TextInput,
  Textarea,
  Card,
  DisplayText,
  Paragraph,
  SectionHeading,
  FieldGroup,
  RadioButtonField,
  Typography
} from '@contentful/forma-36-react-components';
import { init, EditorExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss';
import './index.css';

interface AppProps {
  sdk: EditorExtensionSDK;
}

interface AppState {
  hasImage: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      hasImage: true
    };
  }

  onhasImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasImage = event.target.value === 'yes';
    this.setState({ hasImage });
    this.props.sdk.entry.fields.hasImage.setValue(hasImage);
  };

  render() {
    return (
      <div className="f36-margin--l">
        <Typography>
          <DisplayText>Entry extension demo</DisplayText>
          <Paragraph>This demo uses a single UI Extension to render all UI for an entry.</Paragraph>

          <SectionHeading>Has abstract?</SectionHeading>
          <FieldGroup row={false}>
            <RadioButtonField
              labelText="Yes"
              checked={this.state.hasImage}
              value="yes"
              onChange={this.onhasImageChangeHandler}
              name="hasImage"
              id="yesCheckbox"
            />
            <RadioButtonField
              labelText="No"
              checked={!this.state.hasImage}
              value="no"
              onChange={this.onhasImageChangeHandler}
              name="hasImage"
              id="noCheckbox"
            />
          </FieldGroup>
        </Typography>
        {this.state.hasImage && (
          <Typography>
            <SectionHeading>Conditional Fields</SectionHeading>
          </Typography>
        )}
      </div>
    );
  }
}

init(sdk => {
  render(<App sdk={sdk as EditorExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
