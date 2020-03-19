import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  copy: Long text
 *  hasImage: Boolean
 *  image: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      title: props.sdk.entry.fields.title.getValue(),
      copy: props.sdk.entry.fields.copy.getValue(),
      image: props.sdk.entry.fields.image.getValue(),
      imagePosition: props.sdk.entry.fields.imagePosition.getValue(),
      hasImage: props.sdk.entry.fields.hasImage.getValue() || false
    };
  }

  onTitleChangeHandler = event => {
    const value = event.target.value;
    this.setState({ title: value });
    this.props.sdk.entry.fields.title.setValue(value);
  };

  onCopyChangeHandler = event => {
    const value = event.target.value;
    this.setState({ copy: value });
    this.props.sdk.entry.fields.copy.setValue(value);
  };

  onImageChangeHandler = event => {
    const value = event.target.value;
    this.setState({ image: value });
    this.props.sdk.entry.fields.image.setValue(value);
  };

  onImagePositionChangeHandler = event => {
    const value = event.target.value;
    this.setState({ imagePosition: value });
    this.props.sdk.entry.fields.imagePosition.setValue(value);
  };

  onhasImageChangeHandler = event => {
    const hasImage = event.target.value === 'yes';
    this.setState({ hasImage });
    this.props.sdk.entry.fields.hasImage.setValue(hasImage);
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <SectionHeading>Title</SectionHeading>
        <TextInput
          testId="field-title"
          onChange={this.onTitleChangeHandler}
          value={this.state.title}
        />
        <SectionHeading>Copy</SectionHeading>
        <Textarea testId="field-copy" onChange={this.onCopyChangeHandler} value={this.state.copy} />
        <SectionHeading>Has image?</SectionHeading>
        <FieldGroup row={false}>
          <RadioButtonField
            labelText="Yes"
            checked={this.state.hasImage === true}
            value="yes"
            onChange={this.onhasImageChangeHandler}
            name="imageOption"
            id="yesCheckbox"
          />
          <RadioButtonField
            labelText="No"
            checked={this.state.hasImage === false}
            value="no"
            onChange={this.onhasImageChangeHandler}
            name="imageOption"
            id="noCheckbox"
          />
        </FieldGroup>
        {this.state.hasImage && (
          <React.Fragment>
            <SectionHeading>image</SectionHeading>
            <Textarea
              testId="field-image"
              onChange={this.onImageChangeHandler}
              value={this.state.image}
            />
            <SectionHeading>image position</SectionHeading>
            <RadioButtonField
              labelText="Left"
              checked={this.state.imagePosition === "left"}
              value="left"
              onChange={this.onhasImageChangeHandler}
              name="imagePositionOption"
              id="leftCheckbox"
            />
            <RadioButtonField
              labelText="Right"
              checked={this.state.imagePosition === "right"}
              value="right"
              onChange={this.onhasImageChangeHandler}
              name="imagePositionOption"
              id="rightCheckbox"
            />
          </React.Fragment>
        )}
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
