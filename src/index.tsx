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
  title?: string;
  body?: string;
  hasImage: boolean;
  abstract?: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      title: props.sdk.entry.fields.title.getValue(),
      body: props.sdk.entry.fields.body.getValue(),
      abstract: props.sdk.entry.fields.abstract.getValue(),
      hasImage: props.sdk.entry.fields.hasImage.getValue()
    };
  }

  onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.title.setValue(event.target.value);
  };

  onBodyChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.body.setValue(event.target.value);
  };

  onAbstractChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.abstract.setValue(event.target.value);
  };

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
          <SectionHeading>Title</SectionHeading>
          <TextInput onChange={this.onTitleChangeHandler} value={this.state.title} />
          <SectionHeading>Body</SectionHeading>
          <Textarea onChange={this.onBodyChangeHandler} value={this.state.body} />
          <SectionHeading>Has abstract?</SectionHeading>
          <FieldGroup row={false}>
            <RadioButtonField
              labelText="Yes"
              checked={this.state.hasImage}
              value="yes"
              onChange={this.onhasImageChangeHandler}
              name="abstractOption"
              id="yesCheckbox"
            />
            <RadioButtonField
              labelText="No"
              checked={!this.state.hasImage}
              value="no"
              onChange={this.onhasImageChangeHandler}
              name="abstractOption"
              id="noCheckbox"
            />
          </FieldGroup>
        </Typography>
        {this.state.hasImage && (
          <Typography>
            <SectionHeading>Abstract</SectionHeading>
            <Textarea onChange={this.onAbstractChangeHandler} value={this.state.abstract} />
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
