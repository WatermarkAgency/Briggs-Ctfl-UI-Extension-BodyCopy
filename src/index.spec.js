import React from 'react';
import { App } from './index';
import { render, cleanup, fireEvent, configure } from '@testing-library/react';

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk) {
  return render(<App sdk={sdk} />);
}

const sdk = {
  entry: {
    fields: {
      title: { getValue: jest.fn(), setValue: jest.fn() },
      copy: { getValue: jest.fn(), setValue: jest.fn() },
      image: { getValue: jest.fn(), setValue: jest.fn() },
      imagePosition: { getValue: jest.fn(), setValue: jest.fn() },
      hasImage: { getValue: jest.fn(), setValue: jest.fn() }
    }
  }
};

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should read a values from entry.fields.*', () => {
    sdk.entry.fields.title.getValue.mockReturnValue('title-value');
    sdk.entry.fields.copy.getValue.mockReturnValue('copy-value');
    sdk.entry.fields.hasImage.getValue.mockReturnValue(true);
    sdk.entry.fields.image.getValue.mockReturnValue('image-value');
    sdk.entry.fields.imagePosition.getValue.mockReturnValue('imagePosition-value');
    const { getByTestId } = renderComponent(sdk);

    expect(getByTestId('field-title').value).toEqual('title-value');
    expect(getByTestId('field-copy').value).toEqual('copy-value');
    expect(getByTestId('field-image').value).toEqual('image-value');

    fireEvent.change(getByTestId('field-copy'), {
      target: { value: 'new-copy-value' }
    });

    expect(sdk.entry.fields.copy.setValue).toHaveBeenCalledWith('new-copy-value');
  });
});
