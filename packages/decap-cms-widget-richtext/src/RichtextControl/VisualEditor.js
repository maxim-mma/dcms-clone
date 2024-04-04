import React from 'react';
import { createPlugins, Plate, PlateLeaf } from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createCodePlugin,
  MARK_CODE,
} from '@udecode/plate-basic-marks';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from '@udecode/plate-heading';
import { createSoftBreakPlugin, createExitBreakPlugin } from '@udecode/plate-break';
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from '@udecode/plate-list';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { ClassNames } from '@emotion/react';
import { fonts, lengths, zIndex } from 'decap-cms-ui-default';

import { editorStyleVars } from '../styles';
import withProps from './withProps';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import CodeLeaf from './components/Leaf/CodeLeaf';
import ParagraphElement from './components/Element/ParagraphElement';
import HeadingElement from './components/Element/HeadingElement';
import ListElement from './components/Element/ListElement';
import { markdownToSlate, slateToMarkdown } from '../serializers';
import LinkElement from './components/Element/LinkElement';
import BlockquoteElement from './components/Element/BlockquoteElement';
import createBlockquoteExtPlugin from './plugins/createBlockquoteExtPlugin';

function visualEditorStyles({ minimal }) {
  return `
  position: relative;
  overflow: auto;
  font-family: ${fonts.primary};
  min-height: ${minimal ? 'auto' : lengths.richTextEditorMinHeight};
  margin-top: -${editorStyleVars.stickyDistanceBottom};
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.zIndex100};
  white-space: pre-wrap;
`;
}

const emptyValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: '' }],
  },
];

export default function VisualEditor({ t, field, className, isDisabled, onChange, ...props }) {
  const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createHeadingPlugin(),
      createBoldPlugin(),
      createItalicPlugin(),
      createCodePlugin(),
      createListPlugin(),
      createLinkPlugin(),
      createBlockquotePlugin(),
      createBlockquoteExtPlugin(),
      createSoftBreakPlugin({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: [ELEMENT_BLOCKQUOTE],
              },
            },
          ],
        },
      }),
      createExitBreakPlugin({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              hotkey: 'mod+shift+enter',
              before: true,
            },
            {
              hotkey: 'enter',
              query: {
                start: true,
                end: true,
                allow: KEYS_HEADING,
              },
              relative: true,
              level: 1,
            },
          ],
        },
      }),
      createTrailingBlockPlugin({
        options: { type: ELEMENT_PARAGRAPH },
      }),
    ],
    {
      components: {
        [MARK_BOLD]: withProps(PlateLeaf, { as: 'b' }),
        [MARK_CODE]: CodeLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
        [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
        [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
        [ELEMENT_LI]: withProps(ListElement, { variant: 'li' }),
      },
    },
  );

  function handleBlockClick() {
    console.log('handleBlockClick');
  }

  function handleLinkClick() {
    console.log('handleLinkClick');
  }

  function handleToggleMode() {
    console.log('handleToggleMode');
  }

  function handleChange(value) {
    console.log('handleChange', value);
    const mdValue = slateToMarkdown(value, {});
    onChange(mdValue);
  }

  const initialValue = props.value ? markdownToSlate(props.value, {}) : emptyValue;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            className,
            css`
              ${visualEditorStyles({ minimal: field.get('minimal') })}
            `,
          )}
        >
          <Plate plugins={plugins} initialValue={initialValue} onChange={handleChange}>
            <Toolbar
              onBlockClick={handleBlockClick}
              onLinkClick={handleLinkClick}
              onToggleMode={handleToggleMode}
              plugins={null}
              buttons={[]}
              editorComponents={[]}
              onAddAsset={() => false}
              getAsset={() => false}
              hasInline={() => false}
              hasBlock={() => false}
              hasQuote={() => false}
              hasListItems={() => false}
              isShowModeToggle={() => false}
              onChange={() => false}
              t={t}
              disabled={isDisabled}
            />
            <Editor isDisabled={isDisabled} />
          </Plate>
        </div>
      )}
    </ClassNames>
  );
}
