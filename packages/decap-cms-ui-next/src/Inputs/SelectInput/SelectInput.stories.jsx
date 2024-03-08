import React from 'react';
import styled from '@emotion/styled';
import { useArgs } from '@storybook/preview-api';

import SelectInput from '.';

const options = [
  { value: 'general', label: 'General' },
  { value: 'advice', label: 'Advice' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'technology', label: 'Technology' },
  { value: 'businessFinance', label: 'Business & Finance' },
  { value: 'foodCooking', label: 'Food & Cooking' },
  { value: 'worldPolitics', label: 'World & Politics' },
  { value: 'moviesEntretainment', label: 'Movies & Entertainment' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'homeGardening', label: 'Home & Gardening' },
];

const StyledSelectInput = styled(SelectInput)`
  width: 33vw;
`;

export default {
  title: 'Inputs/SelectInput',
  component: SelectInput,
  argTypes: {
    value: {
      control: 'select',
      options: options.reduce((acc, option) => ({ ...acc, [option.label]: option.value }), {}),
      if: {
        arg: 'multiple',
        truthy: false,
      },
    },
    values: {
      name: 'value',
      control: 'multi-select',
      options: options.reduce((acc, option) => ({ ...acc, [option.label]: option.value }), {}),
      if: {
        arg: 'multiple',
        truthy: true,
      },
    },
  },
  args: {
    name: 'category',
    label: 'Categories',
    labelSingular: 'Category',
    value: '',
    values: [],
    inline: false,
    multiple: false,
    error: false,
    options,
  },
};

export function _SelectInput(args) {
  const [{ value, values, multiple }, updateArgs] = useArgs();

  function handleChange(value) {
    multiple ? updateArgs({ values: value }) : updateArgs({ value });
  }

  return <StyledSelectInput {...args} value={multiple ? values : value} onChange={handleChange} />;
}
