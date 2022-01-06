'use strict';
module.exports = validate24;
module.exports.default = validate24;
const schema40 = {
  $id: 'https://netlify-cms/object.json',
  type: 'object',
  properties: {
    backend: {
      type: 'object',
      properties: {
        name: { type: 'string', examples: ['test-repo'] },
        auth_scope: {
          type: 'string',
          examples: ['repo', 'public_repo'],
          enum: ['repo', 'public_repo'],
        },
        cms_label_prefix: { type: 'string', minLength: 1 },
        open_authoring: { type: 'boolean', examples: [true] },
      },
      required: ['name'],
    },
    local_backend: {
      oneOf: [
        { type: 'boolean' },
        {
          type: 'object',
          properties: {
            url: { type: 'string', examples: ['http://localhost:8081/api/v1'] },
            allowed_hosts: { type: 'array', items: { type: 'string' } },
          },
          additionalProperties: false,
        },
      ],
    },
    locale: { type: 'string', examples: ['en', 'fr', 'de'] },
    i18n: {
      type: 'object',
      properties: {
        structure: { type: 'string', enum: ['multiple_folders', 'multiple_files', 'single_file'] },
        locales: {
          type: 'array',
          minItems: 2,
          items: { type: 'string', minLength: 2, maxLength: 10, pattern: '^[a-zA-Z-_]+$' },
          uniqueItems: true,
        },
        default_locale: { type: 'string', minLength: 2, maxLength: 10, pattern: '^[a-zA-Z-_]+$' },
      },
      required: ['structure', 'locales'],
    },
    site_url: { type: 'string', examples: ['https://example.com'] },
    display_url: { type: 'string', examples: ['https://example.com'] },
    logo_url: { type: 'string', examples: ['https://example.com/images/logo.svg'] },
    show_preview_links: { type: 'boolean' },
    media_folder: { type: 'string', examples: ['assets/uploads'] },
    public_folder: { type: 'string', examples: ['/uploads'] },
    media_folder_relative: { type: 'boolean' },
    media_library: {
      type: 'object',
      properties: {
        name: { type: 'string', examples: ['uploadcare'] },
        config: { type: 'object' },
      },
      required: ['name'],
    },
    publish_mode: {
      type: 'string',
      enum: ['simple', 'editorial_workflow'],
      examples: ['editorial_workflow'],
    },
    slug: {
      type: 'object',
      properties: {
        encoding: { type: 'string', enum: ['unicode', 'ascii'] },
        clean_accents: { type: 'boolean' },
      },
    },
    collections: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          label_singular: { type: 'string' },
          description: { type: 'string' },
          folder: { type: 'string' },
          files: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                label: { type: 'string' },
                label_singular: { type: 'string' },
                description: { type: 'string' },
                file: { type: 'string' },
                preview_path: { type: 'string' },
                preview_path_date_field: { type: 'string' },
                fields: {
                  $id: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d',
                  type: 'array',
                  minItems: 1,
                  items: {
                    $id: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d',
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      label: { type: 'string' },
                      widget: { type: 'string' },
                      required: { type: 'boolean' },
                      i18n: {
                        oneOf: [
                          { type: 'boolean' },
                          { type: 'string', enum: ['translate', 'duplicate', 'none'] },
                        ],
                      },
                      hint: { type: 'string' },
                      pattern: {
                        type: 'array',
                        minItems: 2,
                        items: [
                          { oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] },
                          { type: 'string' },
                        ],
                      },
                      field: { $ref: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
                      fields: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
                      types: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
                    },
                    select: { $data: '0/widget' },
                    selectCases: {
                      unknown: {},
                      string: {},
                      number: {
                        properties: {
                          step: { type: 'number' },
                          value_type: { type: 'string' },
                          min: { type: 'number' },
                          max: { type: 'number' },
                        },
                      },
                      text: {},
                      image: { properties: { allow_multiple: { type: 'boolean' } } },
                      file: { properties: { allow_multiple: { type: 'boolean' } } },
                      select: {
                        properties: {
                          multiple: { type: 'boolean' },
                          min: { type: 'integer' },
                          max: { type: 'integer' },
                          options: {
                            type: 'array',
                            items: {
                              oneOf: [
                                { type: 'string' },
                                { type: 'number' },
                                {
                                  type: 'object',
                                  properties: {
                                    label: { type: 'string' },
                                    value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                                  },
                                  required: ['label', 'value'],
                                },
                              ],
                            },
                          },
                        },
                        required: ['options'],
                      },
                      markdown: {
                        properties: {
                          minimal: { type: 'boolean' },
                          buttons: {
                            type: 'array',
                            items: {
                              type: 'string',
                              enum: [
                                'bold',
                                'italic',
                                'code',
                                'link',
                                'heading-one',
                                'heading-two',
                                'heading-three',
                                'heading-four',
                                'heading-five',
                                'heading-six',
                                'quote',
                                'bulleted-list',
                                'numbered-list',
                              ],
                            },
                          },
                          editor_components: { type: 'array', items: { type: 'string' } },
                          modes: {
                            type: 'array',
                            items: { type: 'string', enum: ['raw', 'rich_text'] },
                            minItems: 1,
                          },
                        },
                      },
                      list: {
                        properties: {
                          allow_add: { type: 'boolean' },
                          collapsed: { type: 'boolean' },
                          summary: { type: 'string' },
                          minimize_collapsed: { type: 'boolean' },
                          label_singular: { type: 'string' },
                          i18n: { type: 'boolean' },
                          min: { type: 'number' },
                          max: { type: 'number' },
                        },
                      },
                      object: {
                        properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } },
                      },
                      relation: {
                        properties: {
                          collection: { type: 'string' },
                          value_field: { type: 'string' },
                          search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
                          file: { type: 'string' },
                          multiple: { type: 'boolean' },
                          min: { type: 'integer' },
                          max: { type: 'integer' },
                          display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
                          options_length: { type: 'integer' },
                        },
                        oneOf: [
                          { required: ['collection', 'value_field', 'search_fields'] },
                          { required: ['collection', 'valueField', 'searchFields'] },
                        ],
                      },
                      boolean: {},
                      map: {
                        properties: {
                          decimals: { type: 'integer' },
                          type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
                        },
                      },
                      date: {},
                      datetime: {
                        properties: {
                          format: { type: 'string' },
                          date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
                          time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
                          picker_utc: { type: 'boolean' },
                        },
                      },
                      code: {
                        properties: {
                          default_language: { type: 'string' },
                          allow_language_selection: { type: 'boolean' },
                          output_code_only: { type: 'boolean' },
                          keys: {
                            type: 'object',
                            properties: { code: { type: 'string' }, lang: { type: 'string' } },
                          },
                        },
                      },
                      color: {},
                    },
                    required: ['name'],
                  },
                  uniqueItemProperties: ['name'],
                },
              },
              required: ['name', 'label', 'file', 'fields'],
            },
            uniqueItemProperties: ['name'],
          },
          identifier_field: { type: 'string' },
          summary: { type: 'string' },
          slug: { type: 'string' },
          path: { type: 'string' },
          preview_path: { type: 'string' },
          preview_path_date_field: { type: 'string' },
          create: { type: 'boolean' },
          publish: { type: 'boolean' },
          hide: { type: 'boolean' },
          editor: { type: 'object', properties: { preview: { type: 'boolean' } } },
          format: {
            type: 'string',
            enum: [
              'yml',
              'yaml',
              'toml',
              'json',
              'frontmatter',
              'json-frontmatter',
              'toml-frontmatter',
              'yaml-frontmatter',
            ],
          },
          extension: { type: 'string' },
          frontmatter_delimiter: {
            type: ['string', 'array'],
            minItems: 2,
            maxItems: 2,
            items: { type: 'string' },
          },
          fields: {
            $id: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e',
            type: 'array',
            minItems: 1,
            items: {
              $id: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e',
              type: 'object',
              properties: {
                name: { type: 'string' },
                label: { type: 'string' },
                widget: { type: 'string' },
                required: { type: 'boolean' },
                i18n: {
                  oneOf: [
                    { type: 'boolean' },
                    { type: 'string', enum: ['translate', 'duplicate', 'none'] },
                  ],
                },
                hint: { type: 'string' },
                pattern: {
                  type: 'array',
                  minItems: 2,
                  items: [
                    { oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] },
                    { type: 'string' },
                  ],
                },
                field: { $ref: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
                fields: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
                types: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
              },
              select: { $data: '0/widget' },
              selectCases: {
                unknown: {},
                string: {},
                number: {
                  properties: {
                    step: { type: 'number' },
                    value_type: { type: 'string' },
                    min: { type: 'number' },
                    max: { type: 'number' },
                  },
                },
                text: {},
                image: { properties: { allow_multiple: { type: 'boolean' } } },
                file: { properties: { allow_multiple: { type: 'boolean' } } },
                select: {
                  properties: {
                    multiple: { type: 'boolean' },
                    min: { type: 'integer' },
                    max: { type: 'integer' },
                    options: {
                      type: 'array',
                      items: {
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                          {
                            type: 'object',
                            properties: {
                              label: { type: 'string' },
                              value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                            },
                            required: ['label', 'value'],
                          },
                        ],
                      },
                    },
                  },
                  required: ['options'],
                },
                markdown: {
                  properties: {
                    minimal: { type: 'boolean' },
                    buttons: {
                      type: 'array',
                      items: {
                        type: 'string',
                        enum: [
                          'bold',
                          'italic',
                          'code',
                          'link',
                          'heading-one',
                          'heading-two',
                          'heading-three',
                          'heading-four',
                          'heading-five',
                          'heading-six',
                          'quote',
                          'bulleted-list',
                          'numbered-list',
                        ],
                      },
                    },
                    editor_components: { type: 'array', items: { type: 'string' } },
                    modes: {
                      type: 'array',
                      items: { type: 'string', enum: ['raw', 'rich_text'] },
                      minItems: 1,
                    },
                  },
                },
                list: {
                  properties: {
                    allow_add: { type: 'boolean' },
                    collapsed: { type: 'boolean' },
                    summary: { type: 'string' },
                    minimize_collapsed: { type: 'boolean' },
                    label_singular: { type: 'string' },
                    i18n: { type: 'boolean' },
                    min: { type: 'number' },
                    max: { type: 'number' },
                  },
                },
                object: {
                  properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } },
                },
                relation: {
                  properties: {
                    collection: { type: 'string' },
                    value_field: { type: 'string' },
                    search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
                    file: { type: 'string' },
                    multiple: { type: 'boolean' },
                    min: { type: 'integer' },
                    max: { type: 'integer' },
                    display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
                    options_length: { type: 'integer' },
                  },
                  oneOf: [
                    { required: ['collection', 'value_field', 'search_fields'] },
                    { required: ['collection', 'valueField', 'searchFields'] },
                  ],
                },
                boolean: {},
                map: {
                  properties: {
                    decimals: { type: 'integer' },
                    type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
                  },
                },
                date: {},
                datetime: {
                  properties: {
                    format: { type: 'string' },
                    date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
                    time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
                    picker_utc: { type: 'boolean' },
                  },
                },
                code: {
                  properties: {
                    default_language: { type: 'string' },
                    allow_language_selection: { type: 'boolean' },
                    output_code_only: { type: 'boolean' },
                    keys: {
                      type: 'object',
                      properties: { code: { type: 'string' }, lang: { type: 'string' } },
                    },
                  },
                },
                color: {},
              },
              required: ['name'],
            },
            uniqueItemProperties: ['name'],
          },
          sortable_fields: { type: 'array', items: { type: 'string' } },
          sortableFields: { type: 'array', items: { type: 'string' } },
          view_filters: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                field: { type: 'string' },
                pattern: { oneOf: [{ type: 'boolean' }, { type: 'string' }] },
              },
              additionalProperties: false,
              required: ['label', 'field', 'pattern'],
            },
          },
          view_groups: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                field: { type: 'string' },
                pattern: { type: 'string' },
              },
              additionalProperties: false,
              required: ['label', 'field'],
            },
          },
          nested: {
            type: 'object',
            properties: {
              depth: { type: 'number', minimum: 1, maximum: 1000 },
              summary: { type: 'string' },
            },
            required: ['depth'],
          },
          meta: {
            type: 'object',
            properties: {
              path: {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  widget: { type: 'string' },
                  index_file: { type: 'string' },
                },
                required: ['label', 'widget', 'index_file'],
              },
            },
            additionalProperties: false,
            minProperties: 1,
          },
          i18n: {
            oneOf: [
              { type: 'boolean' },
              {
                type: 'object',
                properties: {
                  structure: {
                    type: 'string',
                    enum: ['multiple_folders', 'multiple_files', 'single_file'],
                  },
                  locales: {
                    type: 'array',
                    minItems: 2,
                    items: {
                      type: 'string',
                      minLength: 2,
                      maxLength: 10,
                      pattern: '^[a-zA-Z-_]+$',
                    },
                    uniqueItems: true,
                  },
                  default_locale: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 10,
                    pattern: '^[a-zA-Z-_]+$',
                  },
                },
              },
            ],
          },
        },
        required: ['name', 'label'],
        oneOf: [{ required: ['files'] }, { required: ['folder', 'fields'] }],
        not: { required: ['sortable_fields', 'sortableFields'] },
        if: { required: ['extension'] },
        then: {
          if: {
            properties: {
              extension: { enum: ['yml', 'yaml', 'toml', 'json', 'md', 'markdown', 'html'] },
            },
          },
          else: { required: ['format'] },
        },
        dependencies: {
          frontmatter_delimiter: {
            properties: {
              format: { enum: ['yaml-frontmatter', 'toml-frontmatter', 'json-frontmatter'] },
            },
            required: ['format'],
          },
        },
      },
      uniqueItemProperties: ['name'],
    },
    editor: { type: 'object', properties: { preview: { type: 'boolean' } } },
  },
  required: ['backend', 'collections'],
  anyOf: [{ required: ['media_folder'] }, { required: ['media_library'] }],
};
const func0 = require('ajv/dist/runtime/equal').default;
const func9 = require('ajv/dist/runtime/ucs2length').default;
const pattern0 = new RegExp('^[a-zA-Z-_]+$', 'u');
const schema41 = {
  $id: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d',
  type: 'object',
  properties: {
    name: { type: 'string' },
    label: { type: 'string' },
    widget: { type: 'string' },
    required: { type: 'boolean' },
    i18n: {
      oneOf: [{ type: 'boolean' }, { type: 'string', enum: ['translate', 'duplicate', 'none'] }],
    },
    hint: { type: 'string' },
    pattern: {
      type: 'array',
      minItems: 2,
      items: [{ oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] }, { type: 'string' }],
    },
    field: { $ref: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
    fields: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
    types: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
  },
  select: { $data: '0/widget' },
  selectCases: {
    unknown: {},
    string: {},
    number: {
      properties: {
        step: { type: 'number' },
        value_type: { type: 'string' },
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    text: {},
    image: { properties: { allow_multiple: { type: 'boolean' } } },
    file: { properties: { allow_multiple: { type: 'boolean' } } },
    select: {
      properties: {
        multiple: { type: 'boolean' },
        min: { type: 'integer' },
        max: { type: 'integer' },
        options: {
          type: 'array',
          items: {
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                },
                required: ['label', 'value'],
              },
            ],
          },
        },
      },
      required: ['options'],
    },
    markdown: {
      properties: {
        minimal: { type: 'boolean' },
        buttons: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'bold',
              'italic',
              'code',
              'link',
              'heading-one',
              'heading-two',
              'heading-three',
              'heading-four',
              'heading-five',
              'heading-six',
              'quote',
              'bulleted-list',
              'numbered-list',
            ],
          },
        },
        editor_components: { type: 'array', items: { type: 'string' } },
        modes: {
          type: 'array',
          items: { type: 'string', enum: ['raw', 'rich_text'] },
          minItems: 1,
        },
      },
    },
    list: {
      properties: {
        allow_add: { type: 'boolean' },
        collapsed: { type: 'boolean' },
        summary: { type: 'string' },
        minimize_collapsed: { type: 'boolean' },
        label_singular: { type: 'string' },
        i18n: { type: 'boolean' },
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    object: { properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } } },
    relation: {
      properties: {
        collection: { type: 'string' },
        value_field: { type: 'string' },
        search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
        file: { type: 'string' },
        multiple: { type: 'boolean' },
        min: { type: 'integer' },
        max: { type: 'integer' },
        display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
        options_length: { type: 'integer' },
      },
      oneOf: [
        { required: ['collection', 'value_field', 'search_fields'] },
        { required: ['collection', 'valueField', 'searchFields'] },
      ],
    },
    boolean: {},
    map: {
      properties: {
        decimals: { type: 'integer' },
        type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
      },
    },
    date: {},
    datetime: {
      properties: {
        format: { type: 'string' },
        date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
        time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
        picker_utc: { type: 'boolean' },
      },
    },
    code: {
      properties: {
        default_language: { type: 'string' },
        allow_language_selection: { type: 'boolean' },
        output_code_only: { type: 'boolean' },
        keys: {
          type: 'object',
          properties: { code: { type: 'string' }, lang: { type: 'string' } },
        },
      },
    },
    color: {},
  },
  required: ['name'],
};
const wrapper0 = { validate: validate25 };
const schema42 = {
  $id: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d',
  type: 'array',
  minItems: 1,
  items: {
    $id: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d',
    type: 'object',
    properties: {
      name: { type: 'string' },
      label: { type: 'string' },
      widget: { type: 'string' },
      required: { type: 'boolean' },
      i18n: {
        oneOf: [{ type: 'boolean' }, { type: 'string', enum: ['translate', 'duplicate', 'none'] }],
      },
      hint: { type: 'string' },
      pattern: {
        type: 'array',
        minItems: 2,
        items: [{ oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] }, { type: 'string' }],
      },
      field: { $ref: 'field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
      fields: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
      types: { $ref: 'fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d' },
    },
    select: { $data: '0/widget' },
    selectCases: {
      unknown: {},
      string: {},
      number: {
        properties: {
          step: { type: 'number' },
          value_type: { type: 'string' },
          min: { type: 'number' },
          max: { type: 'number' },
        },
      },
      text: {},
      image: { properties: { allow_multiple: { type: 'boolean' } } },
      file: { properties: { allow_multiple: { type: 'boolean' } } },
      select: {
        properties: {
          multiple: { type: 'boolean' },
          min: { type: 'integer' },
          max: { type: 'integer' },
          options: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                  },
                  required: ['label', 'value'],
                },
              ],
            },
          },
        },
        required: ['options'],
      },
      markdown: {
        properties: {
          minimal: { type: 'boolean' },
          buttons: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'bold',
                'italic',
                'code',
                'link',
                'heading-one',
                'heading-two',
                'heading-three',
                'heading-four',
                'heading-five',
                'heading-six',
                'quote',
                'bulleted-list',
                'numbered-list',
              ],
            },
          },
          editor_components: { type: 'array', items: { type: 'string' } },
          modes: {
            type: 'array',
            items: { type: 'string', enum: ['raw', 'rich_text'] },
            minItems: 1,
          },
        },
      },
      list: {
        properties: {
          allow_add: { type: 'boolean' },
          collapsed: { type: 'boolean' },
          summary: { type: 'string' },
          minimize_collapsed: { type: 'boolean' },
          label_singular: { type: 'string' },
          i18n: { type: 'boolean' },
          min: { type: 'number' },
          max: { type: 'number' },
        },
      },
      object: { properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } } },
      relation: {
        properties: {
          collection: { type: 'string' },
          value_field: { type: 'string' },
          search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
          file: { type: 'string' },
          multiple: { type: 'boolean' },
          min: { type: 'integer' },
          max: { type: 'integer' },
          display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
          options_length: { type: 'integer' },
        },
        oneOf: [
          { required: ['collection', 'value_field', 'search_fields'] },
          { required: ['collection', 'valueField', 'searchFields'] },
        ],
      },
      boolean: {},
      map: {
        properties: {
          decimals: { type: 'integer' },
          type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
        },
      },
      date: {},
      datetime: {
        properties: {
          format: { type: 'string' },
          date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
          time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
          picker_utc: { type: 'boolean' },
        },
      },
      code: {
        properties: {
          default_language: { type: 'string' },
          allow_language_selection: { type: 'boolean' },
          output_code_only: { type: 'boolean' },
          keys: {
            type: 'object',
            properties: { code: { type: 'string' }, lang: { type: 'string' } },
          },
        },
      },
      color: {},
    },
    required: ['name'],
  },
  uniqueItemProperties: ['name'],
};
const wrapper2 = { validate: validate26 };
function validate26(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="fields_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d" */ let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length < 1) {
      const err0 = {
        instancePath,
        schemaPath: '#/minItems',
        keyword: 'minItems',
        params: { limit: 1 },
        message: 'must NOT have fewer than 1 items',
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      let data0 = data[i0];
      const vSchema0 = data0 && data0.widget;
      if (!(vSchema0 === undefined)) {
        if (
          typeof vSchema0 !== 'string' &&
          !(typeof vSchema0 == 'number') &&
          typeof vSchema0 !== 'boolean' &&
          vSchema0 !== null
        ) {
          const err1 = {
            instancePath: instancePath + '/' + i0,
            schemaPath: '#/items/select',
            keyword: 'select',
            params: {},
            message: '"select" keyword must be string,number,boolean,null ($data)',
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        } else {
          let valid2 = true;
          const value0 = vSchema0 === null ? 'null' : vSchema0;
          if ('' + value0 == 'unknown') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'string') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'number') {
            const _errs3 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.step !== undefined) {
                if (!(typeof data0.step == 'number')) {
                  const err2 = {
                    instancePath: instancePath + '/' + i0 + '/step',
                    schemaPath: '#/items/selectCases/number/properties/step/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err2];
                  } else {
                    vErrors.push(err2);
                  }
                  errors++;
                }
              }
              if (data0.value_type !== undefined) {
                if (typeof data0.value_type !== 'string') {
                  const err3 = {
                    instancePath: instancePath + '/' + i0 + '/value_type',
                    schemaPath: '#/items/selectCases/number/properties/value_type/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err3];
                  } else {
                    vErrors.push(err3);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                if (!(typeof data0.min == 'number')) {
                  const err4 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/number/properties/min/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err4];
                  } else {
                    vErrors.push(err4);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                if (!(typeof data0.max == 'number')) {
                  const err5 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/number/properties/max/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err5];
                  } else {
                    vErrors.push(err5);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs3 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'text') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'image') {
            const _errs12 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_multiple !== undefined) {
                if (typeof data0.allow_multiple !== 'boolean') {
                  const err6 = {
                    instancePath: instancePath + '/' + i0 + '/allow_multiple',
                    schemaPath: '#/items/selectCases/image/properties/allow_multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err6];
                  } else {
                    vErrors.push(err6);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs12 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'file') {
            const _errs15 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_multiple !== undefined) {
                if (typeof data0.allow_multiple !== 'boolean') {
                  const err7 = {
                    instancePath: instancePath + '/' + i0 + '/allow_multiple',
                    schemaPath: '#/items/selectCases/file/properties/allow_multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err7];
                  } else {
                    vErrors.push(err7);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs15 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'select') {
            const _errs18 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.options === undefined) {
                const err8 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/select/required',
                  keyword: 'required',
                  params: { missingProperty: 'options' },
                  message: "must have required property '" + 'options' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
              if (data0.multiple !== undefined) {
                if (typeof data0.multiple !== 'boolean') {
                  const err9 = {
                    instancePath: instancePath + '/' + i0 + '/multiple',
                    schemaPath: '#/items/selectCases/select/properties/multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err9];
                  } else {
                    vErrors.push(err9);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                let data8 = data0.min;
                if (!(typeof data8 == 'number' && !(data8 % 1) && !isNaN(data8))) {
                  const err10 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/select/properties/min/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                let data9 = data0.max;
                if (!(typeof data9 == 'number' && !(data9 % 1) && !isNaN(data9))) {
                  const err11 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/select/properties/max/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
              }
              if (data0.options !== undefined) {
                let data10 = data0.options;
                if (Array.isArray(data10)) {
                  const len1 = data10.length;
                  for (let i1 = 0; i1 < len1; i1++) {
                    let data11 = data10[i1];
                    const _errs28 = errors;
                    let valid9 = false;
                    let passing0 = null;
                    const _errs29 = errors;
                    if (typeof data11 !== 'string') {
                      const err12 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath:
                          '#/items/selectCases/select/properties/options/items/oneOf/0/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err12];
                      } else {
                        vErrors.push(err12);
                      }
                      errors++;
                    }
                    var _valid1 = _errs29 === errors;
                    if (_valid1) {
                      valid9 = true;
                      passing0 = 0;
                    }
                    const _errs31 = errors;
                    if (!(typeof data11 == 'number')) {
                      const err13 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath:
                          '#/items/selectCases/select/properties/options/items/oneOf/1/type',
                        keyword: 'type',
                        params: { type: 'number' },
                        message: 'must be number',
                      };
                      if (vErrors === null) {
                        vErrors = [err13];
                      } else {
                        vErrors.push(err13);
                      }
                      errors++;
                    }
                    var _valid1 = _errs31 === errors;
                    if (_valid1 && valid9) {
                      valid9 = false;
                      passing0 = [passing0, 1];
                    } else {
                      if (_valid1) {
                        valid9 = true;
                        passing0 = 1;
                      }
                      const _errs33 = errors;
                      if (data11 && typeof data11 == 'object' && !Array.isArray(data11)) {
                        if (data11.label === undefined) {
                          const err14 = {
                            instancePath: instancePath + '/' + i0 + '/options/' + i1,
                            schemaPath:
                              '#/items/selectCases/select/properties/options/items/oneOf/2/required',
                            keyword: 'required',
                            params: { missingProperty: 'label' },
                            message: "must have required property '" + 'label' + "'",
                          };
                          if (vErrors === null) {
                            vErrors = [err14];
                          } else {
                            vErrors.push(err14);
                          }
                          errors++;
                        }
                        if (data11.value === undefined) {
                          const err15 = {
                            instancePath: instancePath + '/' + i0 + '/options/' + i1,
                            schemaPath:
                              '#/items/selectCases/select/properties/options/items/oneOf/2/required',
                            keyword: 'required',
                            params: { missingProperty: 'value' },
                            message: "must have required property '" + 'value' + "'",
                          };
                          if (vErrors === null) {
                            vErrors = [err15];
                          } else {
                            vErrors.push(err15);
                          }
                          errors++;
                        }
                        if (data11.label !== undefined) {
                          if (typeof data11.label !== 'string') {
                            const err16 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/label',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err16];
                            } else {
                              vErrors.push(err16);
                            }
                            errors++;
                          }
                        }
                        if (data11.value !== undefined) {
                          let data13 = data11.value;
                          const _errs38 = errors;
                          let valid11 = false;
                          let passing1 = null;
                          const _errs39 = errors;
                          if (typeof data13 !== 'string') {
                            const err17 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err17];
                            } else {
                              vErrors.push(err17);
                            }
                            errors++;
                          }
                          var _valid2 = _errs39 === errors;
                          if (_valid2) {
                            valid11 = true;
                            passing1 = 0;
                          }
                          const _errs41 = errors;
                          if (!(typeof data13 == 'number')) {
                            const err18 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                              keyword: 'type',
                              params: { type: 'number' },
                              message: 'must be number',
                            };
                            if (vErrors === null) {
                              vErrors = [err18];
                            } else {
                              vErrors.push(err18);
                            }
                            errors++;
                          }
                          var _valid2 = _errs41 === errors;
                          if (_valid2 && valid11) {
                            valid11 = false;
                            passing1 = [passing1, 1];
                          } else {
                            if (_valid2) {
                              valid11 = true;
                              passing1 = 1;
                            }
                          }
                          if (!valid11) {
                            const err19 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                              keyword: 'oneOf',
                              params: { passingSchemas: passing1 },
                              message: 'must match exactly one schema in oneOf',
                            };
                            if (vErrors === null) {
                              vErrors = [err19];
                            } else {
                              vErrors.push(err19);
                            }
                            errors++;
                          } else {
                            errors = _errs38;
                            if (vErrors !== null) {
                              if (_errs38) {
                                vErrors.length = _errs38;
                              } else {
                                vErrors = null;
                              }
                            }
                          }
                        }
                      } else {
                        const err20 = {
                          instancePath: instancePath + '/' + i0 + '/options/' + i1,
                          schemaPath:
                            '#/items/selectCases/select/properties/options/items/oneOf/2/type',
                          keyword: 'type',
                          params: { type: 'object' },
                          message: 'must be object',
                        };
                        if (vErrors === null) {
                          vErrors = [err20];
                        } else {
                          vErrors.push(err20);
                        }
                        errors++;
                      }
                      var _valid1 = _errs33 === errors;
                      if (_valid1 && valid9) {
                        valid9 = false;
                        passing0 = [passing0, 2];
                      } else {
                        if (_valid1) {
                          valid9 = true;
                          passing0 = 2;
                        }
                      }
                    }
                    if (!valid9) {
                      const err21 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath: '#/items/selectCases/select/properties/options/items/oneOf',
                        keyword: 'oneOf',
                        params: { passingSchemas: passing0 },
                        message: 'must match exactly one schema in oneOf',
                      };
                      if (vErrors === null) {
                        vErrors = [err21];
                      } else {
                        vErrors.push(err21);
                      }
                      errors++;
                    } else {
                      errors = _errs28;
                      if (vErrors !== null) {
                        if (_errs28) {
                          vErrors.length = _errs28;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                  }
                } else {
                  const err22 = {
                    instancePath: instancePath + '/' + i0 + '/options',
                    schemaPath: '#/items/selectCases/select/properties/options/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs18 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'markdown') {
            const _errs43 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.minimal !== undefined) {
                if (typeof data0.minimal !== 'boolean') {
                  const err23 = {
                    instancePath: instancePath + '/' + i0 + '/minimal',
                    schemaPath: '#/items/selectCases/markdown/properties/minimal/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
              }
              if (data0.buttons !== undefined) {
                let data15 = data0.buttons;
                if (Array.isArray(data15)) {
                  const len2 = data15.length;
                  for (let i2 = 0; i2 < len2; i2++) {
                    let data16 = data15[i2];
                    if (typeof data16 !== 'string') {
                      const err24 = {
                        instancePath: instancePath + '/' + i0 + '/buttons/' + i2,
                        schemaPath: '#/items/selectCases/markdown/properties/buttons/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err24];
                      } else {
                        vErrors.push(err24);
                      }
                      errors++;
                    }
                    if (
                      !(
                        data16 === 'bold' ||
                        data16 === 'italic' ||
                        data16 === 'code' ||
                        data16 === 'link' ||
                        data16 === 'heading-one' ||
                        data16 === 'heading-two' ||
                        data16 === 'heading-three' ||
                        data16 === 'heading-four' ||
                        data16 === 'heading-five' ||
                        data16 === 'heading-six' ||
                        data16 === 'quote' ||
                        data16 === 'bulleted-list' ||
                        data16 === 'numbered-list'
                      )
                    ) {
                      const err25 = {
                        instancePath: instancePath + '/' + i0 + '/buttons/' + i2,
                        schemaPath: '#/items/selectCases/markdown/properties/buttons/items/enum',
                        keyword: 'enum',
                        params: {
                          allowedValues:
                            schema42.items.selectCases.markdown.properties.buttons.items.enum,
                        },
                        message: 'must be equal to one of the allowed values',
                      };
                      if (vErrors === null) {
                        vErrors = [err25];
                      } else {
                        vErrors.push(err25);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err26 = {
                    instancePath: instancePath + '/' + i0 + '/buttons',
                    schemaPath: '#/items/selectCases/markdown/properties/buttons/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              }
              if (data0.editor_components !== undefined) {
                let data17 = data0.editor_components;
                if (Array.isArray(data17)) {
                  const len3 = data17.length;
                  for (let i3 = 0; i3 < len3; i3++) {
                    if (typeof data17[i3] !== 'string') {
                      const err27 = {
                        instancePath: instancePath + '/' + i0 + '/editor_components/' + i3,
                        schemaPath:
                          '#/items/selectCases/markdown/properties/editor_components/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err27];
                      } else {
                        vErrors.push(err27);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err28 = {
                    instancePath: instancePath + '/' + i0 + '/editor_components',
                    schemaPath: '#/items/selectCases/markdown/properties/editor_components/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
              }
              if (data0.modes !== undefined) {
                let data19 = data0.modes;
                if (Array.isArray(data19)) {
                  if (data19.length < 1) {
                    const err29 = {
                      instancePath: instancePath + '/' + i0 + '/modes',
                      schemaPath: '#/items/selectCases/markdown/properties/modes/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err29];
                    } else {
                      vErrors.push(err29);
                    }
                    errors++;
                  }
                  const len4 = data19.length;
                  for (let i4 = 0; i4 < len4; i4++) {
                    let data20 = data19[i4];
                    if (typeof data20 !== 'string') {
                      const err30 = {
                        instancePath: instancePath + '/' + i0 + '/modes/' + i4,
                        schemaPath: '#/items/selectCases/markdown/properties/modes/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err30];
                      } else {
                        vErrors.push(err30);
                      }
                      errors++;
                    }
                    if (!(data20 === 'raw' || data20 === 'rich_text')) {
                      const err31 = {
                        instancePath: instancePath + '/' + i0 + '/modes/' + i4,
                        schemaPath: '#/items/selectCases/markdown/properties/modes/items/enum',
                        keyword: 'enum',
                        params: {
                          allowedValues:
                            schema42.items.selectCases.markdown.properties.modes.items.enum,
                        },
                        message: 'must be equal to one of the allowed values',
                      };
                      if (vErrors === null) {
                        vErrors = [err31];
                      } else {
                        vErrors.push(err31);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err32 = {
                    instancePath: instancePath + '/' + i0 + '/modes',
                    schemaPath: '#/items/selectCases/markdown/properties/modes/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err32];
                  } else {
                    vErrors.push(err32);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs43 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'list') {
            const _errs58 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_add !== undefined) {
                if (typeof data0.allow_add !== 'boolean') {
                  const err33 = {
                    instancePath: instancePath + '/' + i0 + '/allow_add',
                    schemaPath: '#/items/selectCases/list/properties/allow_add/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err33];
                  } else {
                    vErrors.push(err33);
                  }
                  errors++;
                }
              }
              if (data0.collapsed !== undefined) {
                if (typeof data0.collapsed !== 'boolean') {
                  const err34 = {
                    instancePath: instancePath + '/' + i0 + '/collapsed',
                    schemaPath: '#/items/selectCases/list/properties/collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err34];
                  } else {
                    vErrors.push(err34);
                  }
                  errors++;
                }
              }
              if (data0.summary !== undefined) {
                if (typeof data0.summary !== 'string') {
                  const err35 = {
                    instancePath: instancePath + '/' + i0 + '/summary',
                    schemaPath: '#/items/selectCases/list/properties/summary/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              }
              if (data0.minimize_collapsed !== undefined) {
                if (typeof data0.minimize_collapsed !== 'boolean') {
                  const err36 = {
                    instancePath: instancePath + '/' + i0 + '/minimize_collapsed',
                    schemaPath: '#/items/selectCases/list/properties/minimize_collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err36];
                  } else {
                    vErrors.push(err36);
                  }
                  errors++;
                }
              }
              if (data0.label_singular !== undefined) {
                if (typeof data0.label_singular !== 'string') {
                  const err37 = {
                    instancePath: instancePath + '/' + i0 + '/label_singular',
                    schemaPath: '#/items/selectCases/list/properties/label_singular/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err37];
                  } else {
                    vErrors.push(err37);
                  }
                  errors++;
                }
              }
              if (data0.i18n !== undefined) {
                if (typeof data0.i18n !== 'boolean') {
                  const err38 = {
                    instancePath: instancePath + '/' + i0 + '/i18n',
                    schemaPath: '#/items/selectCases/list/properties/i18n/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err38];
                  } else {
                    vErrors.push(err38);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                if (!(typeof data0.min == 'number')) {
                  const err39 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/list/properties/min/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err39];
                  } else {
                    vErrors.push(err39);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                if (!(typeof data0.max == 'number')) {
                  const err40 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/list/properties/max/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err40];
                  } else {
                    vErrors.push(err40);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs58 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'object') {
            const _errs75 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collapsed !== undefined) {
                if (typeof data0.collapsed !== 'boolean') {
                  const err41 = {
                    instancePath: instancePath + '/' + i0 + '/collapsed',
                    schemaPath: '#/items/selectCases/object/properties/collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err41];
                  } else {
                    vErrors.push(err41);
                  }
                  errors++;
                }
              }
              if (data0.i18n !== undefined) {
                if (typeof data0.i18n !== 'boolean') {
                  const err42 = {
                    instancePath: instancePath + '/' + i0 + '/i18n',
                    schemaPath: '#/items/selectCases/object/properties/i18n/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err42];
                  } else {
                    vErrors.push(err42);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs75 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'relation') {
            const _errs80 = errors;
            const _errs81 = errors;
            let valid21 = false;
            let passing2 = null;
            const _errs82 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection === undefined) {
                const err43 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'collection' },
                  message: "must have required property '" + 'collection' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
              if (data0.value_field === undefined) {
                const err44 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'value_field' },
                  message: "must have required property '" + 'value_field' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err44];
                } else {
                  vErrors.push(err44);
                }
                errors++;
              }
              if (data0.search_fields === undefined) {
                const err45 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'search_fields' },
                  message: "must have required property '" + 'search_fields' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
            }
            var _valid3 = _errs82 === errors;
            if (_valid3) {
              valid21 = true;
              passing2 = 0;
            }
            const _errs83 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection === undefined) {
                const err46 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'collection' },
                  message: "must have required property '" + 'collection' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
              if (data0.valueField === undefined) {
                const err47 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'valueField' },
                  message: "must have required property '" + 'valueField' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
              if (data0.searchFields === undefined) {
                const err48 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'searchFields' },
                  message: "must have required property '" + 'searchFields' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err48];
                } else {
                  vErrors.push(err48);
                }
                errors++;
              }
            }
            var _valid3 = _errs83 === errors;
            if (_valid3 && valid21) {
              valid21 = false;
              passing2 = [passing2, 1];
            } else {
              if (_valid3) {
                valid21 = true;
                passing2 = 1;
              }
            }
            if (!valid21) {
              const err49 = {
                instancePath: instancePath + '/' + i0,
                schemaPath: '#/items/selectCases/relation/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing2 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            } else {
              errors = _errs81;
              if (vErrors !== null) {
                if (_errs81) {
                  vErrors.length = _errs81;
                } else {
                  vErrors = null;
                }
              }
            }
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection !== undefined) {
                if (typeof data0.collection !== 'string') {
                  const err50 = {
                    instancePath: instancePath + '/' + i0 + '/collection',
                    schemaPath: '#/items/selectCases/relation/properties/collection/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err50];
                  } else {
                    vErrors.push(err50);
                  }
                  errors++;
                }
              }
              if (data0.value_field !== undefined) {
                if (typeof data0.value_field !== 'string') {
                  const err51 = {
                    instancePath: instancePath + '/' + i0 + '/value_field',
                    schemaPath: '#/items/selectCases/relation/properties/value_field/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err51];
                  } else {
                    vErrors.push(err51);
                  }
                  errors++;
                }
              }
              if (data0.search_fields !== undefined) {
                let data33 = data0.search_fields;
                if (Array.isArray(data33)) {
                  if (data33.length < 1) {
                    const err52 = {
                      instancePath: instancePath + '/' + i0 + '/search_fields',
                      schemaPath: '#/items/selectCases/relation/properties/search_fields/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err52];
                    } else {
                      vErrors.push(err52);
                    }
                    errors++;
                  }
                  const len5 = data33.length;
                  for (let i5 = 0; i5 < len5; i5++) {
                    if (typeof data33[i5] !== 'string') {
                      const err53 = {
                        instancePath: instancePath + '/' + i0 + '/search_fields/' + i5,
                        schemaPath:
                          '#/items/selectCases/relation/properties/search_fields/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err53];
                      } else {
                        vErrors.push(err53);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err54 = {
                    instancePath: instancePath + '/' + i0 + '/search_fields',
                    schemaPath: '#/items/selectCases/relation/properties/search_fields/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err54];
                  } else {
                    vErrors.push(err54);
                  }
                  errors++;
                }
              }
              if (data0.file !== undefined) {
                if (typeof data0.file !== 'string') {
                  const err55 = {
                    instancePath: instancePath + '/' + i0 + '/file',
                    schemaPath: '#/items/selectCases/relation/properties/file/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err55];
                  } else {
                    vErrors.push(err55);
                  }
                  errors++;
                }
              }
              if (data0.multiple !== undefined) {
                if (typeof data0.multiple !== 'boolean') {
                  const err56 = {
                    instancePath: instancePath + '/' + i0 + '/multiple',
                    schemaPath: '#/items/selectCases/relation/properties/multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err56];
                  } else {
                    vErrors.push(err56);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                let data37 = data0.min;
                if (!(typeof data37 == 'number' && !(data37 % 1) && !isNaN(data37))) {
                  const err57 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/relation/properties/min/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err57];
                  } else {
                    vErrors.push(err57);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                let data38 = data0.max;
                if (!(typeof data38 == 'number' && !(data38 % 1) && !isNaN(data38))) {
                  const err58 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/relation/properties/max/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err58];
                  } else {
                    vErrors.push(err58);
                  }
                  errors++;
                }
              }
              if (data0.display_fields !== undefined) {
                let data39 = data0.display_fields;
                if (Array.isArray(data39)) {
                  if (data39.length < 1) {
                    const err59 = {
                      instancePath: instancePath + '/' + i0 + '/display_fields',
                      schemaPath: '#/items/selectCases/relation/properties/display_fields/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err59];
                    } else {
                      vErrors.push(err59);
                    }
                    errors++;
                  }
                  const len6 = data39.length;
                  for (let i6 = 0; i6 < len6; i6++) {
                    if (typeof data39[i6] !== 'string') {
                      const err60 = {
                        instancePath: instancePath + '/' + i0 + '/display_fields/' + i6,
                        schemaPath:
                          '#/items/selectCases/relation/properties/display_fields/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err60];
                      } else {
                        vErrors.push(err60);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err61 = {
                    instancePath: instancePath + '/' + i0 + '/display_fields',
                    schemaPath: '#/items/selectCases/relation/properties/display_fields/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err61];
                  } else {
                    vErrors.push(err61);
                  }
                  errors++;
                }
              }
              if (data0.options_length !== undefined) {
                let data41 = data0.options_length;
                if (!(typeof data41 == 'number' && !(data41 % 1) && !isNaN(data41))) {
                  const err62 = {
                    instancePath: instancePath + '/' + i0 + '/options_length',
                    schemaPath: '#/items/selectCases/relation/properties/options_length/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err62];
                  } else {
                    vErrors.push(err62);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs80 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'boolean') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'map') {
            const _errs106 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.decimals !== undefined) {
                let data42 = data0.decimals;
                if (!(typeof data42 == 'number' && !(data42 % 1) && !isNaN(data42))) {
                  const err63 = {
                    instancePath: instancePath + '/' + i0 + '/decimals',
                    schemaPath: '#/items/selectCases/map/properties/decimals/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err63];
                  } else {
                    vErrors.push(err63);
                  }
                  errors++;
                }
              }
              if (data0.type !== undefined) {
                let data43 = data0.type;
                if (typeof data43 !== 'string') {
                  const err64 = {
                    instancePath: instancePath + '/' + i0 + '/type',
                    schemaPath: '#/items/selectCases/map/properties/type/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err64];
                  } else {
                    vErrors.push(err64);
                  }
                  errors++;
                }
                if (!(data43 === 'Point' || data43 === 'LineString' || data43 === 'Polygon')) {
                  const err65 = {
                    instancePath: instancePath + '/' + i0 + '/type',
                    schemaPath: '#/items/selectCases/map/properties/type/enum',
                    keyword: 'enum',
                    params: { allowedValues: schema42.items.selectCases.map.properties.type.enum },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err65];
                  } else {
                    vErrors.push(err65);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs106 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'date') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'datetime') {
            const _errs111 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.format !== undefined) {
                if (typeof data0.format !== 'string') {
                  const err66 = {
                    instancePath: instancePath + '/' + i0 + '/format',
                    schemaPath: '#/items/selectCases/datetime/properties/format/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err66];
                  } else {
                    vErrors.push(err66);
                  }
                  errors++;
                }
              }
              if (data0.date_format !== undefined) {
                let data45 = data0.date_format;
                const _errs115 = errors;
                let valid29 = false;
                let passing3 = null;
                const _errs116 = errors;
                if (typeof data45 !== 'string') {
                  const err67 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err67];
                  } else {
                    vErrors.push(err67);
                  }
                  errors++;
                }
                var _valid4 = _errs116 === errors;
                if (_valid4) {
                  valid29 = true;
                  passing3 = 0;
                }
                const _errs118 = errors;
                if (typeof data45 !== 'boolean') {
                  const err68 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err68];
                  } else {
                    vErrors.push(err68);
                  }
                  errors++;
                }
                var _valid4 = _errs118 === errors;
                if (_valid4 && valid29) {
                  valid29 = false;
                  passing3 = [passing3, 1];
                } else {
                  if (_valid4) {
                    valid29 = true;
                    passing3 = 1;
                  }
                }
                if (!valid29) {
                  const err69 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing3 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err69];
                  } else {
                    vErrors.push(err69);
                  }
                  errors++;
                } else {
                  errors = _errs115;
                  if (vErrors !== null) {
                    if (_errs115) {
                      vErrors.length = _errs115;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (data0.time_format !== undefined) {
                let data46 = data0.time_format;
                const _errs121 = errors;
                let valid30 = false;
                let passing4 = null;
                const _errs122 = errors;
                if (typeof data46 !== 'string') {
                  const err70 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err70];
                  } else {
                    vErrors.push(err70);
                  }
                  errors++;
                }
                var _valid5 = _errs122 === errors;
                if (_valid5) {
                  valid30 = true;
                  passing4 = 0;
                }
                const _errs124 = errors;
                if (typeof data46 !== 'boolean') {
                  const err71 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err71];
                  } else {
                    vErrors.push(err71);
                  }
                  errors++;
                }
                var _valid5 = _errs124 === errors;
                if (_valid5 && valid30) {
                  valid30 = false;
                  passing4 = [passing4, 1];
                } else {
                  if (_valid5) {
                    valid30 = true;
                    passing4 = 1;
                  }
                }
                if (!valid30) {
                  const err72 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing4 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err72];
                  } else {
                    vErrors.push(err72);
                  }
                  errors++;
                } else {
                  errors = _errs121;
                  if (vErrors !== null) {
                    if (_errs121) {
                      vErrors.length = _errs121;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (data0.picker_utc !== undefined) {
                if (typeof data0.picker_utc !== 'boolean') {
                  const err73 = {
                    instancePath: instancePath + '/' + i0 + '/picker_utc',
                    schemaPath: '#/items/selectCases/datetime/properties/picker_utc/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err73];
                  } else {
                    vErrors.push(err73);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs111 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'code') {
            const _errs128 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.default_language !== undefined) {
                if (typeof data0.default_language !== 'string') {
                  const err74 = {
                    instancePath: instancePath + '/' + i0 + '/default_language',
                    schemaPath: '#/items/selectCases/code/properties/default_language/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err74];
                  } else {
                    vErrors.push(err74);
                  }
                  errors++;
                }
              }
              if (data0.allow_language_selection !== undefined) {
                if (typeof data0.allow_language_selection !== 'boolean') {
                  const err75 = {
                    instancePath: instancePath + '/' + i0 + '/allow_language_selection',
                    schemaPath: '#/items/selectCases/code/properties/allow_language_selection/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err75];
                  } else {
                    vErrors.push(err75);
                  }
                  errors++;
                }
              }
              if (data0.output_code_only !== undefined) {
                if (typeof data0.output_code_only !== 'boolean') {
                  const err76 = {
                    instancePath: instancePath + '/' + i0 + '/output_code_only',
                    schemaPath: '#/items/selectCases/code/properties/output_code_only/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err76];
                  } else {
                    vErrors.push(err76);
                  }
                  errors++;
                }
              }
              if (data0.keys !== undefined) {
                let data51 = data0.keys;
                if (data51 && typeof data51 == 'object' && !Array.isArray(data51)) {
                  if (data51.code !== undefined) {
                    if (typeof data51.code !== 'string') {
                      const err77 = {
                        instancePath: instancePath + '/' + i0 + '/keys/code',
                        schemaPath: '#/items/selectCases/code/properties/keys/properties/code/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err77];
                      } else {
                        vErrors.push(err77);
                      }
                      errors++;
                    }
                  }
                  if (data51.lang !== undefined) {
                    if (typeof data51.lang !== 'string') {
                      const err78 = {
                        instancePath: instancePath + '/' + i0 + '/keys/lang',
                        schemaPath: '#/items/selectCases/code/properties/keys/properties/lang/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err78];
                      } else {
                        vErrors.push(err78);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err79 = {
                    instancePath: instancePath + '/' + i0 + '/keys',
                    schemaPath: '#/items/selectCases/code/properties/keys/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                  };
                  if (vErrors === null) {
                    vErrors = [err79];
                  } else {
                    vErrors.push(err79);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs128 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'color') {
            var _valid0 = true;
            valid2 = _valid0;
          }
          if (!valid2) {
            const err80 = {
              instancePath: instancePath + '/' + i0,
              schemaPath: '#/items/select',
              keyword: 'select',
              params: { failingCase: 'color' },
              message: 'should match case "color" schema',
            };
            if (vErrors === null) {
              vErrors = [err80];
            } else {
              vErrors.push(err80);
            }
            errors++;
          }
        }
      }
      if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
        if (data0.name === undefined) {
          const err81 = {
            instancePath: instancePath + '/' + i0,
            schemaPath: '#/items/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err81];
          } else {
            vErrors.push(err81);
          }
          errors++;
        }
        if (data0.name !== undefined) {
          if (typeof data0.name !== 'string') {
            const err82 = {
              instancePath: instancePath + '/' + i0 + '/name',
              schemaPath: '#/items/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err82];
            } else {
              vErrors.push(err82);
            }
            errors++;
          }
        }
        if (data0.label !== undefined) {
          if (typeof data0.label !== 'string') {
            const err83 = {
              instancePath: instancePath + '/' + i0 + '/label',
              schemaPath: '#/items/properties/label/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err83];
            } else {
              vErrors.push(err83);
            }
            errors++;
          }
        }
        if (data0.widget !== undefined) {
          if (typeof data0.widget !== 'string') {
            const err84 = {
              instancePath: instancePath + '/' + i0 + '/widget',
              schemaPath: '#/items/properties/widget/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err84];
            } else {
              vErrors.push(err84);
            }
            errors++;
          }
        }
        if (data0.required !== undefined) {
          if (typeof data0.required !== 'boolean') {
            const err85 = {
              instancePath: instancePath + '/' + i0 + '/required',
              schemaPath: '#/items/properties/required/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err85];
            } else {
              vErrors.push(err85);
            }
            errors++;
          }
        }
        if (data0.i18n !== undefined) {
          let data58 = data0.i18n;
          const _errs151 = errors;
          let valid34 = false;
          let passing5 = null;
          const _errs152 = errors;
          if (typeof data58 !== 'boolean') {
            const err86 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/0/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err86];
            } else {
              vErrors.push(err86);
            }
            errors++;
          }
          var _valid6 = _errs152 === errors;
          if (_valid6) {
            valid34 = true;
            passing5 = 0;
          }
          const _errs154 = errors;
          if (typeof data58 !== 'string') {
            const err87 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/1/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err87];
            } else {
              vErrors.push(err87);
            }
            errors++;
          }
          if (!(data58 === 'translate' || data58 === 'duplicate' || data58 === 'none')) {
            const err88 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/1/enum',
              keyword: 'enum',
              params: { allowedValues: schema42.items.properties.i18n.oneOf[1].enum },
              message: 'must be equal to one of the allowed values',
            };
            if (vErrors === null) {
              vErrors = [err88];
            } else {
              vErrors.push(err88);
            }
            errors++;
          }
          var _valid6 = _errs154 === errors;
          if (_valid6 && valid34) {
            valid34 = false;
            passing5 = [passing5, 1];
          } else {
            if (_valid6) {
              valid34 = true;
              passing5 = 1;
            }
          }
          if (!valid34) {
            const err89 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf',
              keyword: 'oneOf',
              params: { passingSchemas: passing5 },
              message: 'must match exactly one schema in oneOf',
            };
            if (vErrors === null) {
              vErrors = [err89];
            } else {
              vErrors.push(err89);
            }
            errors++;
          } else {
            errors = _errs151;
            if (vErrors !== null) {
              if (_errs151) {
                vErrors.length = _errs151;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data0.hint !== undefined) {
          if (typeof data0.hint !== 'string') {
            const err90 = {
              instancePath: instancePath + '/' + i0 + '/hint',
              schemaPath: '#/items/properties/hint/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err90];
            } else {
              vErrors.push(err90);
            }
            errors++;
          }
        }
        if (data0.pattern !== undefined) {
          let data60 = data0.pattern;
          if (Array.isArray(data60)) {
            if (data60.length < 2) {
              const err91 = {
                instancePath: instancePath + '/' + i0 + '/pattern',
                schemaPath: '#/items/properties/pattern/minItems',
                keyword: 'minItems',
                params: { limit: 2 },
                message: 'must NOT have fewer than 2 items',
              };
              if (vErrors === null) {
                vErrors = [err91];
              } else {
                vErrors.push(err91);
              }
              errors++;
            }
            const len7 = data60.length;
            if (len7 > 0) {
              let data61 = data60[0];
              const _errs161 = errors;
              let valid36 = false;
              let passing6 = null;
              const _errs162 = errors;
              if (typeof data61 !== 'string') {
                const err92 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/0',
                  schemaPath: '#/items/properties/pattern/items/0/oneOf/0/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err92];
                } else {
                  vErrors.push(err92);
                }
                errors++;
              }
              var _valid7 = _errs162 === errors;
              if (_valid7) {
                valid36 = true;
                passing6 = 0;
              }
              const _errs164 = errors;
              if (typeof data61 == 'number') {
                if (!(data61 instanceof RegExp)) {
                  const err93 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err93];
                  } else {
                    vErrors.push(err93);
                  }
                  errors++;
                }
              }
              if (typeof data61 === 'string') {
                if (!(data61 instanceof RegExp)) {
                  const err94 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err94];
                  } else {
                    vErrors.push(err94);
                  }
                  errors++;
                }
              }
              if (Array.isArray(data61)) {
                if (!(data61 instanceof RegExp)) {
                  const err95 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err95];
                  } else {
                    vErrors.push(err95);
                  }
                  errors++;
                }
              }
              if (data61 && typeof data61 == 'object' && !Array.isArray(data61)) {
                if (!(data61 instanceof RegExp)) {
                  const err96 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err96];
                  } else {
                    vErrors.push(err96);
                  }
                  errors++;
                }
              }
              var _valid7 = _errs164 === errors;
              if (_valid7 && valid36) {
                valid36 = false;
                passing6 = [passing6, 1];
              } else {
                if (_valid7) {
                  valid36 = true;
                  passing6 = 1;
                }
              }
              if (!valid36) {
                const err97 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/0',
                  schemaPath: '#/items/properties/pattern/items/0/oneOf',
                  keyword: 'oneOf',
                  params: { passingSchemas: passing6 },
                  message: 'must match exactly one schema in oneOf',
                };
                if (vErrors === null) {
                  vErrors = [err97];
                } else {
                  vErrors.push(err97);
                }
                errors++;
              } else {
                errors = _errs161;
                if (vErrors !== null) {
                  if (_errs161) {
                    vErrors.length = _errs161;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (len7 > 1) {
              if (typeof data60[1] !== 'string') {
                const err98 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/1',
                  schemaPath: '#/items/properties/pattern/items/1/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err98];
                } else {
                  vErrors.push(err98);
                }
                errors++;
              }
            }
          } else {
            const err99 = {
              instancePath: instancePath + '/' + i0 + '/pattern',
              schemaPath: '#/items/properties/pattern/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err99];
            } else {
              vErrors.push(err99);
            }
            errors++;
          }
        }
        if (data0.field !== undefined) {
          if (
            !wrapper0.validate(data0.field, {
              instancePath: instancePath + '/' + i0 + '/field',
              parentData: data0,
              parentDataProperty: 'field',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper0.validate.errors
                : vErrors.concat(wrapper0.validate.errors);
            errors = vErrors.length;
          }
        }
        if (data0.fields !== undefined) {
          if (
            !wrapper2.validate(data0.fields, {
              instancePath: instancePath + '/' + i0 + '/fields',
              parentData: data0,
              parentDataProperty: 'fields',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper2.validate.errors
                : vErrors.concat(wrapper2.validate.errors);
            errors = vErrors.length;
          }
        }
        if (data0.types !== undefined) {
          if (
            !wrapper2.validate(data0.types, {
              instancePath: instancePath + '/' + i0 + '/types',
              parentData: data0,
              parentDataProperty: 'types',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper2.validate.errors
                : vErrors.concat(wrapper2.validate.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err100 = {
          instancePath: instancePath + '/' + i0,
          schemaPath: '#/items/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err100];
        } else {
          vErrors.push(err100);
        }
        errors++;
      }
    }
    if (
      schema42.uniqueItemProperties
        .map(property =>
          data
            .map(item => item && item[property])
            .some((value, index, array) => array.indexOf(value) !== index),
        )
        .some(value => value)
    ) {
      const err101 = {
        instancePath,
        schemaPath: '#/uniqueItemProperties',
        keyword: 'uniqueItemProperties',
        params: {},
        message: 'must pass "uniqueItemProperties" keyword validation',
      };
      if (vErrors === null) {
        vErrors = [err101];
      } else {
        vErrors.push(err101);
      }
      errors++;
    }
  } else {
    const err102 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'array' },
      message: 'must be array',
    };
    if (vErrors === null) {
      vErrors = [err102];
    } else {
      vErrors.push(err102);
    }
    errors++;
  }
  validate26.errors = vErrors;
  return errors === 0;
}
function validate25(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="field_4be0cf9d-cc93-4d38-9c75-3fd30b602e1d" */ let vErrors = null;
  let errors = 0;
  const vSchema0 = data && data.widget;
  if (!(vSchema0 === undefined)) {
    if (
      typeof vSchema0 !== 'string' &&
      !(typeof vSchema0 == 'number') &&
      typeof vSchema0 !== 'boolean' &&
      vSchema0 !== null
    ) {
      const err0 = {
        instancePath,
        schemaPath: '#/select',
        keyword: 'select',
        params: {},
        message: '"select" keyword must be string,number,boolean,null ($data)',
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      let valid0 = true;
      const value0 = vSchema0 === null ? 'null' : vSchema0;
      if ('' + value0 == 'unknown') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'string') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'number') {
        const _errs1 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.step !== undefined) {
            if (!(typeof data.step == 'number')) {
              const err1 = {
                instancePath: instancePath + '/step',
                schemaPath: '#/selectCases/number/properties/step/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err1];
              } else {
                vErrors.push(err1);
              }
              errors++;
            }
          }
          if (data.value_type !== undefined) {
            if (typeof data.value_type !== 'string') {
              const err2 = {
                instancePath: instancePath + '/value_type',
                schemaPath: '#/selectCases/number/properties/value_type/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err2];
              } else {
                vErrors.push(err2);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            if (!(typeof data.min == 'number')) {
              const err3 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/number/properties/min/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            if (!(typeof data.max == 'number')) {
              const err4 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/number/properties/max/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs1 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'text') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'image') {
        const _errs10 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_multiple !== undefined) {
            if (typeof data.allow_multiple !== 'boolean') {
              const err5 = {
                instancePath: instancePath + '/allow_multiple',
                schemaPath: '#/selectCases/image/properties/allow_multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs10 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'file') {
        const _errs13 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_multiple !== undefined) {
            if (typeof data.allow_multiple !== 'boolean') {
              const err6 = {
                instancePath: instancePath + '/allow_multiple',
                schemaPath: '#/selectCases/file/properties/allow_multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs13 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'select') {
        const _errs16 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.options === undefined) {
            const err7 = {
              instancePath,
              schemaPath: '#/selectCases/select/required',
              keyword: 'required',
              params: { missingProperty: 'options' },
              message: "must have required property '" + 'options' + "'",
            };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if (data.multiple !== undefined) {
            if (typeof data.multiple !== 'boolean') {
              const err8 = {
                instancePath: instancePath + '/multiple',
                schemaPath: '#/selectCases/select/properties/multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            let data7 = data.min;
            if (!(typeof data7 == 'number' && !(data7 % 1) && !isNaN(data7))) {
              const err9 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/select/properties/min/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            let data8 = data.max;
            if (!(typeof data8 == 'number' && !(data8 % 1) && !isNaN(data8))) {
              const err10 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/select/properties/max/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          }
          if (data.options !== undefined) {
            let data9 = data.options;
            if (Array.isArray(data9)) {
              const len0 = data9.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data10 = data9[i0];
                const _errs26 = errors;
                let valid7 = false;
                let passing0 = null;
                const _errs27 = errors;
                if (typeof data10 !== 'string') {
                  const err11 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                var _valid1 = _errs27 === errors;
                if (_valid1) {
                  valid7 = true;
                  passing0 = 0;
                }
                const _errs29 = errors;
                if (!(typeof data10 == 'number')) {
                  const err12 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                var _valid1 = _errs29 === errors;
                if (_valid1 && valid7) {
                  valid7 = false;
                  passing0 = [passing0, 1];
                } else {
                  if (_valid1) {
                    valid7 = true;
                    passing0 = 1;
                  }
                  const _errs31 = errors;
                  if (data10 && typeof data10 == 'object' && !Array.isArray(data10)) {
                    if (data10.label === undefined) {
                      const err13 = {
                        instancePath: instancePath + '/options/' + i0,
                        schemaPath:
                          '#/selectCases/select/properties/options/items/oneOf/2/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err13];
                      } else {
                        vErrors.push(err13);
                      }
                      errors++;
                    }
                    if (data10.value === undefined) {
                      const err14 = {
                        instancePath: instancePath + '/options/' + i0,
                        schemaPath:
                          '#/selectCases/select/properties/options/items/oneOf/2/required',
                        keyword: 'required',
                        params: { missingProperty: 'value' },
                        message: "must have required property '" + 'value' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err14];
                      } else {
                        vErrors.push(err14);
                      }
                      errors++;
                    }
                    if (data10.label !== undefined) {
                      if (typeof data10.label !== 'string') {
                        const err15 = {
                          instancePath: instancePath + '/options/' + i0 + '/label',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err15];
                        } else {
                          vErrors.push(err15);
                        }
                        errors++;
                      }
                    }
                    if (data10.value !== undefined) {
                      let data12 = data10.value;
                      const _errs36 = errors;
                      let valid9 = false;
                      let passing1 = null;
                      const _errs37 = errors;
                      if (typeof data12 !== 'string') {
                        const err16 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err16];
                        } else {
                          vErrors.push(err16);
                        }
                        errors++;
                      }
                      var _valid2 = _errs37 === errors;
                      if (_valid2) {
                        valid9 = true;
                        passing1 = 0;
                      }
                      const _errs39 = errors;
                      if (!(typeof data12 == 'number')) {
                        const err17 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                          keyword: 'type',
                          params: { type: 'number' },
                          message: 'must be number',
                        };
                        if (vErrors === null) {
                          vErrors = [err17];
                        } else {
                          vErrors.push(err17);
                        }
                        errors++;
                      }
                      var _valid2 = _errs39 === errors;
                      if (_valid2 && valid9) {
                        valid9 = false;
                        passing1 = [passing1, 1];
                      } else {
                        if (_valid2) {
                          valid9 = true;
                          passing1 = 1;
                        }
                      }
                      if (!valid9) {
                        const err18 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                          keyword: 'oneOf',
                          params: { passingSchemas: passing1 },
                          message: 'must match exactly one schema in oneOf',
                        };
                        if (vErrors === null) {
                          vErrors = [err18];
                        } else {
                          vErrors.push(err18);
                        }
                        errors++;
                      } else {
                        errors = _errs36;
                        if (vErrors !== null) {
                          if (_errs36) {
                            vErrors.length = _errs36;
                          } else {
                            vErrors = null;
                          }
                        }
                      }
                    }
                  } else {
                    const err19 = {
                      instancePath: instancePath + '/options/' + i0,
                      schemaPath: '#/selectCases/select/properties/options/items/oneOf/2/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                  var _valid1 = _errs31 === errors;
                  if (_valid1 && valid7) {
                    valid7 = false;
                    passing0 = [passing0, 2];
                  } else {
                    if (_valid1) {
                      valid7 = true;
                      passing0 = 2;
                    }
                  }
                }
                if (!valid7) {
                  const err20 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing0 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err20];
                  } else {
                    vErrors.push(err20);
                  }
                  errors++;
                } else {
                  errors = _errs26;
                  if (vErrors !== null) {
                    if (_errs26) {
                      vErrors.length = _errs26;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
            } else {
              const err21 = {
                instancePath: instancePath + '/options',
                schemaPath: '#/selectCases/select/properties/options/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs16 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'markdown') {
        const _errs41 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.minimal !== undefined) {
            if (typeof data.minimal !== 'boolean') {
              const err22 = {
                instancePath: instancePath + '/minimal',
                schemaPath: '#/selectCases/markdown/properties/minimal/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          }
          if (data.buttons !== undefined) {
            let data14 = data.buttons;
            if (Array.isArray(data14)) {
              const len1 = data14.length;
              for (let i1 = 0; i1 < len1; i1++) {
                let data15 = data14[i1];
                if (typeof data15 !== 'string') {
                  const err23 = {
                    instancePath: instancePath + '/buttons/' + i1,
                    schemaPath: '#/selectCases/markdown/properties/buttons/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
                if (
                  !(
                    data15 === 'bold' ||
                    data15 === 'italic' ||
                    data15 === 'code' ||
                    data15 === 'link' ||
                    data15 === 'heading-one' ||
                    data15 === 'heading-two' ||
                    data15 === 'heading-three' ||
                    data15 === 'heading-four' ||
                    data15 === 'heading-five' ||
                    data15 === 'heading-six' ||
                    data15 === 'quote' ||
                    data15 === 'bulleted-list' ||
                    data15 === 'numbered-list'
                  )
                ) {
                  const err24 = {
                    instancePath: instancePath + '/buttons/' + i1,
                    schemaPath: '#/selectCases/markdown/properties/buttons/items/enum',
                    keyword: 'enum',
                    params: {
                      allowedValues: schema41.selectCases.markdown.properties.buttons.items.enum,
                    },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err24];
                  } else {
                    vErrors.push(err24);
                  }
                  errors++;
                }
              }
            } else {
              const err25 = {
                instancePath: instancePath + '/buttons',
                schemaPath: '#/selectCases/markdown/properties/buttons/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
          }
          if (data.editor_components !== undefined) {
            let data16 = data.editor_components;
            if (Array.isArray(data16)) {
              const len2 = data16.length;
              for (let i2 = 0; i2 < len2; i2++) {
                if (typeof data16[i2] !== 'string') {
                  const err26 = {
                    instancePath: instancePath + '/editor_components/' + i2,
                    schemaPath: '#/selectCases/markdown/properties/editor_components/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              }
            } else {
              const err27 = {
                instancePath: instancePath + '/editor_components',
                schemaPath: '#/selectCases/markdown/properties/editor_components/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err27];
              } else {
                vErrors.push(err27);
              }
              errors++;
            }
          }
          if (data.modes !== undefined) {
            let data18 = data.modes;
            if (Array.isArray(data18)) {
              if (data18.length < 1) {
                const err28 = {
                  instancePath: instancePath + '/modes',
                  schemaPath: '#/selectCases/markdown/properties/modes/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
              const len3 = data18.length;
              for (let i3 = 0; i3 < len3; i3++) {
                let data19 = data18[i3];
                if (typeof data19 !== 'string') {
                  const err29 = {
                    instancePath: instancePath + '/modes/' + i3,
                    schemaPath: '#/selectCases/markdown/properties/modes/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                }
                if (!(data19 === 'raw' || data19 === 'rich_text')) {
                  const err30 = {
                    instancePath: instancePath + '/modes/' + i3,
                    schemaPath: '#/selectCases/markdown/properties/modes/items/enum',
                    keyword: 'enum',
                    params: {
                      allowedValues: schema41.selectCases.markdown.properties.modes.items.enum,
                    },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err30];
                  } else {
                    vErrors.push(err30);
                  }
                  errors++;
                }
              }
            } else {
              const err31 = {
                instancePath: instancePath + '/modes',
                schemaPath: '#/selectCases/markdown/properties/modes/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs41 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'list') {
        const _errs56 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_add !== undefined) {
            if (typeof data.allow_add !== 'boolean') {
              const err32 = {
                instancePath: instancePath + '/allow_add',
                schemaPath: '#/selectCases/list/properties/allow_add/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
          }
          if (data.collapsed !== undefined) {
            if (typeof data.collapsed !== 'boolean') {
              const err33 = {
                instancePath: instancePath + '/collapsed',
                schemaPath: '#/selectCases/list/properties/collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
          }
          if (data.summary !== undefined) {
            if (typeof data.summary !== 'string') {
              const err34 = {
                instancePath: instancePath + '/summary',
                schemaPath: '#/selectCases/list/properties/summary/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
          }
          if (data.minimize_collapsed !== undefined) {
            if (typeof data.minimize_collapsed !== 'boolean') {
              const err35 = {
                instancePath: instancePath + '/minimize_collapsed',
                schemaPath: '#/selectCases/list/properties/minimize_collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          }
          if (data.label_singular !== undefined) {
            if (typeof data.label_singular !== 'string') {
              const err36 = {
                instancePath: instancePath + '/label_singular',
                schemaPath: '#/selectCases/list/properties/label_singular/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err36];
              } else {
                vErrors.push(err36);
              }
              errors++;
            }
          }
          if (data.i18n !== undefined) {
            if (typeof data.i18n !== 'boolean') {
              const err37 = {
                instancePath: instancePath + '/i18n',
                schemaPath: '#/selectCases/list/properties/i18n/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            if (!(typeof data.min == 'number')) {
              const err38 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/list/properties/min/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            if (!(typeof data.max == 'number')) {
              const err39 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/list/properties/max/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err39];
              } else {
                vErrors.push(err39);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs56 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'object') {
        const _errs73 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collapsed !== undefined) {
            if (typeof data.collapsed !== 'boolean') {
              const err40 = {
                instancePath: instancePath + '/collapsed',
                schemaPath: '#/selectCases/object/properties/collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err40];
              } else {
                vErrors.push(err40);
              }
              errors++;
            }
          }
          if (data.i18n !== undefined) {
            if (typeof data.i18n !== 'boolean') {
              const err41 = {
                instancePath: instancePath + '/i18n',
                schemaPath: '#/selectCases/object/properties/i18n/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs73 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'relation') {
        const _errs78 = errors;
        const _errs79 = errors;
        let valid19 = false;
        let passing2 = null;
        const _errs80 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection === undefined) {
            const err42 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'collection' },
              message: "must have required property '" + 'collection' + "'",
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
          if (data.value_field === undefined) {
            const err43 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'value_field' },
              message: "must have required property '" + 'value_field' + "'",
            };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
          if (data.search_fields === undefined) {
            const err44 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'search_fields' },
              message: "must have required property '" + 'search_fields' + "'",
            };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        var _valid3 = _errs80 === errors;
        if (_valid3) {
          valid19 = true;
          passing2 = 0;
        }
        const _errs81 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection === undefined) {
            const err45 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'collection' },
              message: "must have required property '" + 'collection' + "'",
            };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
          if (data.valueField === undefined) {
            const err46 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'valueField' },
              message: "must have required property '" + 'valueField' + "'",
            };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
          if (data.searchFields === undefined) {
            const err47 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'searchFields' },
              message: "must have required property '" + 'searchFields' + "'",
            };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
        var _valid3 = _errs81 === errors;
        if (_valid3 && valid19) {
          valid19 = false;
          passing2 = [passing2, 1];
        } else {
          if (_valid3) {
            valid19 = true;
            passing2 = 1;
          }
        }
        if (!valid19) {
          const err48 = {
            instancePath,
            schemaPath: '#/selectCases/relation/oneOf',
            keyword: 'oneOf',
            params: { passingSchemas: passing2 },
            message: 'must match exactly one schema in oneOf',
          };
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        } else {
          errors = _errs79;
          if (vErrors !== null) {
            if (_errs79) {
              vErrors.length = _errs79;
            } else {
              vErrors = null;
            }
          }
        }
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection !== undefined) {
            if (typeof data.collection !== 'string') {
              const err49 = {
                instancePath: instancePath + '/collection',
                schemaPath: '#/selectCases/relation/properties/collection/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            }
          }
          if (data.value_field !== undefined) {
            if (typeof data.value_field !== 'string') {
              const err50 = {
                instancePath: instancePath + '/value_field',
                schemaPath: '#/selectCases/relation/properties/value_field/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
          }
          if (data.search_fields !== undefined) {
            let data32 = data.search_fields;
            if (Array.isArray(data32)) {
              if (data32.length < 1) {
                const err51 = {
                  instancePath: instancePath + '/search_fields',
                  schemaPath: '#/selectCases/relation/properties/search_fields/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err51];
                } else {
                  vErrors.push(err51);
                }
                errors++;
              }
              const len4 = data32.length;
              for (let i4 = 0; i4 < len4; i4++) {
                if (typeof data32[i4] !== 'string') {
                  const err52 = {
                    instancePath: instancePath + '/search_fields/' + i4,
                    schemaPath: '#/selectCases/relation/properties/search_fields/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err52];
                  } else {
                    vErrors.push(err52);
                  }
                  errors++;
                }
              }
            } else {
              const err53 = {
                instancePath: instancePath + '/search_fields',
                schemaPath: '#/selectCases/relation/properties/search_fields/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err53];
              } else {
                vErrors.push(err53);
              }
              errors++;
            }
          }
          if (data.file !== undefined) {
            if (typeof data.file !== 'string') {
              const err54 = {
                instancePath: instancePath + '/file',
                schemaPath: '#/selectCases/relation/properties/file/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err54];
              } else {
                vErrors.push(err54);
              }
              errors++;
            }
          }
          if (data.multiple !== undefined) {
            if (typeof data.multiple !== 'boolean') {
              const err55 = {
                instancePath: instancePath + '/multiple',
                schemaPath: '#/selectCases/relation/properties/multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err55];
              } else {
                vErrors.push(err55);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            let data36 = data.min;
            if (!(typeof data36 == 'number' && !(data36 % 1) && !isNaN(data36))) {
              const err56 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/relation/properties/min/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err56];
              } else {
                vErrors.push(err56);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            let data37 = data.max;
            if (!(typeof data37 == 'number' && !(data37 % 1) && !isNaN(data37))) {
              const err57 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/relation/properties/max/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err57];
              } else {
                vErrors.push(err57);
              }
              errors++;
            }
          }
          if (data.display_fields !== undefined) {
            let data38 = data.display_fields;
            if (Array.isArray(data38)) {
              if (data38.length < 1) {
                const err58 = {
                  instancePath: instancePath + '/display_fields',
                  schemaPath: '#/selectCases/relation/properties/display_fields/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              }
              const len5 = data38.length;
              for (let i5 = 0; i5 < len5; i5++) {
                if (typeof data38[i5] !== 'string') {
                  const err59 = {
                    instancePath: instancePath + '/display_fields/' + i5,
                    schemaPath: '#/selectCases/relation/properties/display_fields/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err59];
                  } else {
                    vErrors.push(err59);
                  }
                  errors++;
                }
              }
            } else {
              const err60 = {
                instancePath: instancePath + '/display_fields',
                schemaPath: '#/selectCases/relation/properties/display_fields/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err60];
              } else {
                vErrors.push(err60);
              }
              errors++;
            }
          }
          if (data.options_length !== undefined) {
            let data40 = data.options_length;
            if (!(typeof data40 == 'number' && !(data40 % 1) && !isNaN(data40))) {
              const err61 = {
                instancePath: instancePath + '/options_length',
                schemaPath: '#/selectCases/relation/properties/options_length/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err61];
              } else {
                vErrors.push(err61);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs78 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'boolean') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'map') {
        const _errs104 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.decimals !== undefined) {
            let data41 = data.decimals;
            if (!(typeof data41 == 'number' && !(data41 % 1) && !isNaN(data41))) {
              const err62 = {
                instancePath: instancePath + '/decimals',
                schemaPath: '#/selectCases/map/properties/decimals/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err62];
              } else {
                vErrors.push(err62);
              }
              errors++;
            }
          }
          if (data.type !== undefined) {
            let data42 = data.type;
            if (typeof data42 !== 'string') {
              const err63 = {
                instancePath: instancePath + '/type',
                schemaPath: '#/selectCases/map/properties/type/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
            if (!(data42 === 'Point' || data42 === 'LineString' || data42 === 'Polygon')) {
              const err64 = {
                instancePath: instancePath + '/type',
                schemaPath: '#/selectCases/map/properties/type/enum',
                keyword: 'enum',
                params: { allowedValues: schema41.selectCases.map.properties.type.enum },
                message: 'must be equal to one of the allowed values',
              };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs104 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'date') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'datetime') {
        const _errs109 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.format !== undefined) {
            if (typeof data.format !== 'string') {
              const err65 = {
                instancePath: instancePath + '/format',
                schemaPath: '#/selectCases/datetime/properties/format/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err65];
              } else {
                vErrors.push(err65);
              }
              errors++;
            }
          }
          if (data.date_format !== undefined) {
            let data44 = data.date_format;
            const _errs113 = errors;
            let valid27 = false;
            let passing3 = null;
            const _errs114 = errors;
            if (typeof data44 !== 'string') {
              const err66 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf/0/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
            var _valid4 = _errs114 === errors;
            if (_valid4) {
              valid27 = true;
              passing3 = 0;
            }
            const _errs116 = errors;
            if (typeof data44 !== 'boolean') {
              const err67 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf/1/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err67];
              } else {
                vErrors.push(err67);
              }
              errors++;
            }
            var _valid4 = _errs116 === errors;
            if (_valid4 && valid27) {
              valid27 = false;
              passing3 = [passing3, 1];
            } else {
              if (_valid4) {
                valid27 = true;
                passing3 = 1;
              }
            }
            if (!valid27) {
              const err68 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing3 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err68];
              } else {
                vErrors.push(err68);
              }
              errors++;
            } else {
              errors = _errs113;
              if (vErrors !== null) {
                if (_errs113) {
                  vErrors.length = _errs113;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (data.time_format !== undefined) {
            let data45 = data.time_format;
            const _errs119 = errors;
            let valid28 = false;
            let passing4 = null;
            const _errs120 = errors;
            if (typeof data45 !== 'string') {
              const err69 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf/0/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err69];
              } else {
                vErrors.push(err69);
              }
              errors++;
            }
            var _valid5 = _errs120 === errors;
            if (_valid5) {
              valid28 = true;
              passing4 = 0;
            }
            const _errs122 = errors;
            if (typeof data45 !== 'boolean') {
              const err70 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf/1/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err70];
              } else {
                vErrors.push(err70);
              }
              errors++;
            }
            var _valid5 = _errs122 === errors;
            if (_valid5 && valid28) {
              valid28 = false;
              passing4 = [passing4, 1];
            } else {
              if (_valid5) {
                valid28 = true;
                passing4 = 1;
              }
            }
            if (!valid28) {
              const err71 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing4 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err71];
              } else {
                vErrors.push(err71);
              }
              errors++;
            } else {
              errors = _errs119;
              if (vErrors !== null) {
                if (_errs119) {
                  vErrors.length = _errs119;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (data.picker_utc !== undefined) {
            if (typeof data.picker_utc !== 'boolean') {
              const err72 = {
                instancePath: instancePath + '/picker_utc',
                schemaPath: '#/selectCases/datetime/properties/picker_utc/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err72];
              } else {
                vErrors.push(err72);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs109 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'code') {
        const _errs126 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.default_language !== undefined) {
            if (typeof data.default_language !== 'string') {
              const err73 = {
                instancePath: instancePath + '/default_language',
                schemaPath: '#/selectCases/code/properties/default_language/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err73];
              } else {
                vErrors.push(err73);
              }
              errors++;
            }
          }
          if (data.allow_language_selection !== undefined) {
            if (typeof data.allow_language_selection !== 'boolean') {
              const err74 = {
                instancePath: instancePath + '/allow_language_selection',
                schemaPath: '#/selectCases/code/properties/allow_language_selection/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err74];
              } else {
                vErrors.push(err74);
              }
              errors++;
            }
          }
          if (data.output_code_only !== undefined) {
            if (typeof data.output_code_only !== 'boolean') {
              const err75 = {
                instancePath: instancePath + '/output_code_only',
                schemaPath: '#/selectCases/code/properties/output_code_only/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err75];
              } else {
                vErrors.push(err75);
              }
              errors++;
            }
          }
          if (data.keys !== undefined) {
            let data50 = data.keys;
            if (data50 && typeof data50 == 'object' && !Array.isArray(data50)) {
              if (data50.code !== undefined) {
                if (typeof data50.code !== 'string') {
                  const err76 = {
                    instancePath: instancePath + '/keys/code',
                    schemaPath: '#/selectCases/code/properties/keys/properties/code/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err76];
                  } else {
                    vErrors.push(err76);
                  }
                  errors++;
                }
              }
              if (data50.lang !== undefined) {
                if (typeof data50.lang !== 'string') {
                  const err77 = {
                    instancePath: instancePath + '/keys/lang',
                    schemaPath: '#/selectCases/code/properties/keys/properties/lang/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err77];
                  } else {
                    vErrors.push(err77);
                  }
                  errors++;
                }
              }
            } else {
              const err78 = {
                instancePath: instancePath + '/keys',
                schemaPath: '#/selectCases/code/properties/keys/type',
                keyword: 'type',
                params: { type: 'object' },
                message: 'must be object',
              };
              if (vErrors === null) {
                vErrors = [err78];
              } else {
                vErrors.push(err78);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs126 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'color') {
        var _valid0 = true;
        valid0 = _valid0;
      }
      if (!valid0) {
        const err79 = {
          instancePath,
          schemaPath: '#/select',
          keyword: 'select',
          params: { failingCase: 'color' },
          message: 'should match case "color" schema',
        };
        if (vErrors === null) {
          vErrors = [err79];
        } else {
          vErrors.push(err79);
        }
        errors++;
      }
    }
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err80 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'name' },
        message: "must have required property '" + 'name' + "'",
      };
      if (vErrors === null) {
        vErrors = [err80];
      } else {
        vErrors.push(err80);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err81 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err81];
        } else {
          vErrors.push(err81);
        }
        errors++;
      }
    }
    if (data.label !== undefined) {
      if (typeof data.label !== 'string') {
        const err82 = {
          instancePath: instancePath + '/label',
          schemaPath: '#/properties/label/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
    }
    if (data.widget !== undefined) {
      if (typeof data.widget !== 'string') {
        const err83 = {
          instancePath: instancePath + '/widget',
          schemaPath: '#/properties/widget/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      }
    }
    if (data.required !== undefined) {
      if (typeof data.required !== 'boolean') {
        const err84 = {
          instancePath: instancePath + '/required',
          schemaPath: '#/properties/required/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err84];
        } else {
          vErrors.push(err84);
        }
        errors++;
      }
    }
    if (data.i18n !== undefined) {
      let data57 = data.i18n;
      const _errs149 = errors;
      let valid32 = false;
      let passing5 = null;
      const _errs150 = errors;
      if (typeof data57 !== 'boolean') {
        const err85 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/0/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err85];
        } else {
          vErrors.push(err85);
        }
        errors++;
      }
      var _valid6 = _errs150 === errors;
      if (_valid6) {
        valid32 = true;
        passing5 = 0;
      }
      const _errs152 = errors;
      if (typeof data57 !== 'string') {
        const err86 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/1/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err86];
        } else {
          vErrors.push(err86);
        }
        errors++;
      }
      if (!(data57 === 'translate' || data57 === 'duplicate' || data57 === 'none')) {
        const err87 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/1/enum',
          keyword: 'enum',
          params: { allowedValues: schema41.properties.i18n.oneOf[1].enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err87];
        } else {
          vErrors.push(err87);
        }
        errors++;
      }
      var _valid6 = _errs152 === errors;
      if (_valid6 && valid32) {
        valid32 = false;
        passing5 = [passing5, 1];
      } else {
        if (_valid6) {
          valid32 = true;
          passing5 = 1;
        }
      }
      if (!valid32) {
        const err88 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: passing5 },
          message: 'must match exactly one schema in oneOf',
        };
        if (vErrors === null) {
          vErrors = [err88];
        } else {
          vErrors.push(err88);
        }
        errors++;
      } else {
        errors = _errs149;
        if (vErrors !== null) {
          if (_errs149) {
            vErrors.length = _errs149;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.hint !== undefined) {
      if (typeof data.hint !== 'string') {
        const err89 = {
          instancePath: instancePath + '/hint',
          schemaPath: '#/properties/hint/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err89];
        } else {
          vErrors.push(err89);
        }
        errors++;
      }
    }
    if (data.pattern !== undefined) {
      let data59 = data.pattern;
      if (Array.isArray(data59)) {
        if (data59.length < 2) {
          const err90 = {
            instancePath: instancePath + '/pattern',
            schemaPath: '#/properties/pattern/minItems',
            keyword: 'minItems',
            params: { limit: 2 },
            message: 'must NOT have fewer than 2 items',
          };
          if (vErrors === null) {
            vErrors = [err90];
          } else {
            vErrors.push(err90);
          }
          errors++;
        }
        const len6 = data59.length;
        if (len6 > 0) {
          let data60 = data59[0];
          const _errs159 = errors;
          let valid34 = false;
          let passing6 = null;
          const _errs160 = errors;
          if (typeof data60 !== 'string') {
            const err91 = {
              instancePath: instancePath + '/pattern/0',
              schemaPath: '#/properties/pattern/items/0/oneOf/0/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err91];
            } else {
              vErrors.push(err91);
            }
            errors++;
          }
          var _valid7 = _errs160 === errors;
          if (_valid7) {
            valid34 = true;
            passing6 = 0;
          }
          const _errs162 = errors;
          if (typeof data60 == 'number') {
            if (!(data60 instanceof RegExp)) {
              const err92 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err92];
              } else {
                vErrors.push(err92);
              }
              errors++;
            }
          }
          if (typeof data60 === 'string') {
            if (!(data60 instanceof RegExp)) {
              const err93 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err93];
              } else {
                vErrors.push(err93);
              }
              errors++;
            }
          }
          if (Array.isArray(data60)) {
            if (!(data60 instanceof RegExp)) {
              const err94 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err94];
              } else {
                vErrors.push(err94);
              }
              errors++;
            }
          }
          if (data60 && typeof data60 == 'object' && !Array.isArray(data60)) {
            if (!(data60 instanceof RegExp)) {
              const err95 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err95];
              } else {
                vErrors.push(err95);
              }
              errors++;
            }
          }
          var _valid7 = _errs162 === errors;
          if (_valid7 && valid34) {
            valid34 = false;
            passing6 = [passing6, 1];
          } else {
            if (_valid7) {
              valid34 = true;
              passing6 = 1;
            }
          }
          if (!valid34) {
            const err96 = {
              instancePath: instancePath + '/pattern/0',
              schemaPath: '#/properties/pattern/items/0/oneOf',
              keyword: 'oneOf',
              params: { passingSchemas: passing6 },
              message: 'must match exactly one schema in oneOf',
            };
            if (vErrors === null) {
              vErrors = [err96];
            } else {
              vErrors.push(err96);
            }
            errors++;
          } else {
            errors = _errs159;
            if (vErrors !== null) {
              if (_errs159) {
                vErrors.length = _errs159;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (len6 > 1) {
          if (typeof data59[1] !== 'string') {
            const err97 = {
              instancePath: instancePath + '/pattern/1',
              schemaPath: '#/properties/pattern/items/1/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err97];
            } else {
              vErrors.push(err97);
            }
            errors++;
          }
        }
      } else {
        const err98 = {
          instancePath: instancePath + '/pattern',
          schemaPath: '#/properties/pattern/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err98];
        } else {
          vErrors.push(err98);
        }
        errors++;
      }
    }
    if (data.field !== undefined) {
      if (
        !wrapper0.validate(data.field, {
          instancePath: instancePath + '/field',
          parentData: data,
          parentDataProperty: 'field',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
        errors = vErrors.length;
      }
    }
    if (data.fields !== undefined) {
      if (
        !validate26(data.fields, {
          instancePath: instancePath + '/fields',
          parentData: data,
          parentDataProperty: 'fields',
          rootData,
        })
      ) {
        vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.types !== undefined) {
      if (
        !validate26(data.types, {
          instancePath: instancePath + '/types',
          parentData: data,
          parentDataProperty: 'types',
          rootData,
        })
      ) {
        vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err99 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err99];
    } else {
      vErrors.push(err99);
    }
    errors++;
  }
  validate25.errors = vErrors;
  return errors === 0;
}
const schema43 = {
  $id: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e',
  type: 'object',
  properties: {
    name: { type: 'string' },
    label: { type: 'string' },
    widget: { type: 'string' },
    required: { type: 'boolean' },
    i18n: {
      oneOf: [{ type: 'boolean' }, { type: 'string', enum: ['translate', 'duplicate', 'none'] }],
    },
    hint: { type: 'string' },
    pattern: {
      type: 'array',
      minItems: 2,
      items: [{ oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] }, { type: 'string' }],
    },
    field: { $ref: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
    fields: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
    types: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
  },
  select: { $data: '0/widget' },
  selectCases: {
    unknown: {},
    string: {},
    number: {
      properties: {
        step: { type: 'number' },
        value_type: { type: 'string' },
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    text: {},
    image: { properties: { allow_multiple: { type: 'boolean' } } },
    file: { properties: { allow_multiple: { type: 'boolean' } } },
    select: {
      properties: {
        multiple: { type: 'boolean' },
        min: { type: 'integer' },
        max: { type: 'integer' },
        options: {
          type: 'array',
          items: {
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                },
                required: ['label', 'value'],
              },
            ],
          },
        },
      },
      required: ['options'],
    },
    markdown: {
      properties: {
        minimal: { type: 'boolean' },
        buttons: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'bold',
              'italic',
              'code',
              'link',
              'heading-one',
              'heading-two',
              'heading-three',
              'heading-four',
              'heading-five',
              'heading-six',
              'quote',
              'bulleted-list',
              'numbered-list',
            ],
          },
        },
        editor_components: { type: 'array', items: { type: 'string' } },
        modes: {
          type: 'array',
          items: { type: 'string', enum: ['raw', 'rich_text'] },
          minItems: 1,
        },
      },
    },
    list: {
      properties: {
        allow_add: { type: 'boolean' },
        collapsed: { type: 'boolean' },
        summary: { type: 'string' },
        minimize_collapsed: { type: 'boolean' },
        label_singular: { type: 'string' },
        i18n: { type: 'boolean' },
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    object: { properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } } },
    relation: {
      properties: {
        collection: { type: 'string' },
        value_field: { type: 'string' },
        search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
        file: { type: 'string' },
        multiple: { type: 'boolean' },
        min: { type: 'integer' },
        max: { type: 'integer' },
        display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
        options_length: { type: 'integer' },
      },
      oneOf: [
        { required: ['collection', 'value_field', 'search_fields'] },
        { required: ['collection', 'valueField', 'searchFields'] },
      ],
    },
    boolean: {},
    map: {
      properties: {
        decimals: { type: 'integer' },
        type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
      },
    },
    date: {},
    datetime: {
      properties: {
        format: { type: 'string' },
        date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
        time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
        picker_utc: { type: 'boolean' },
      },
    },
    code: {
      properties: {
        default_language: { type: 'string' },
        allow_language_selection: { type: 'boolean' },
        output_code_only: { type: 'boolean' },
        keys: {
          type: 'object',
          properties: { code: { type: 'string' }, lang: { type: 'string' } },
        },
      },
    },
    color: {},
  },
  required: ['name'],
};
const wrapper4 = { validate: validate32 };
const schema44 = {
  $id: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e',
  type: 'array',
  minItems: 1,
  items: {
    $id: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e',
    type: 'object',
    properties: {
      name: { type: 'string' },
      label: { type: 'string' },
      widget: { type: 'string' },
      required: { type: 'boolean' },
      i18n: {
        oneOf: [{ type: 'boolean' }, { type: 'string', enum: ['translate', 'duplicate', 'none'] }],
      },
      hint: { type: 'string' },
      pattern: {
        type: 'array',
        minItems: 2,
        items: [{ oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] }, { type: 'string' }],
      },
      field: { $ref: 'field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
      fields: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
      types: { $ref: 'fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e' },
    },
    select: { $data: '0/widget' },
    selectCases: {
      unknown: {},
      string: {},
      number: {
        properties: {
          step: { type: 'number' },
          value_type: { type: 'string' },
          min: { type: 'number' },
          max: { type: 'number' },
        },
      },
      text: {},
      image: { properties: { allow_multiple: { type: 'boolean' } } },
      file: { properties: { allow_multiple: { type: 'boolean' } } },
      select: {
        properties: {
          multiple: { type: 'boolean' },
          min: { type: 'integer' },
          max: { type: 'integer' },
          options: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                  },
                  required: ['label', 'value'],
                },
              ],
            },
          },
        },
        required: ['options'],
      },
      markdown: {
        properties: {
          minimal: { type: 'boolean' },
          buttons: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'bold',
                'italic',
                'code',
                'link',
                'heading-one',
                'heading-two',
                'heading-three',
                'heading-four',
                'heading-five',
                'heading-six',
                'quote',
                'bulleted-list',
                'numbered-list',
              ],
            },
          },
          editor_components: { type: 'array', items: { type: 'string' } },
          modes: {
            type: 'array',
            items: { type: 'string', enum: ['raw', 'rich_text'] },
            minItems: 1,
          },
        },
      },
      list: {
        properties: {
          allow_add: { type: 'boolean' },
          collapsed: { type: 'boolean' },
          summary: { type: 'string' },
          minimize_collapsed: { type: 'boolean' },
          label_singular: { type: 'string' },
          i18n: { type: 'boolean' },
          min: { type: 'number' },
          max: { type: 'number' },
        },
      },
      object: { properties: { collapsed: { type: 'boolean' }, i18n: { type: 'boolean' } } },
      relation: {
        properties: {
          collection: { type: 'string' },
          value_field: { type: 'string' },
          search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
          file: { type: 'string' },
          multiple: { type: 'boolean' },
          min: { type: 'integer' },
          max: { type: 'integer' },
          display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
          options_length: { type: 'integer' },
        },
        oneOf: [
          { required: ['collection', 'value_field', 'search_fields'] },
          { required: ['collection', 'valueField', 'searchFields'] },
        ],
      },
      boolean: {},
      map: {
        properties: {
          decimals: { type: 'integer' },
          type: { type: 'string', enum: ['Point', 'LineString', 'Polygon'] },
        },
      },
      date: {},
      datetime: {
        properties: {
          format: { type: 'string' },
          date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
          time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
          picker_utc: { type: 'boolean' },
        },
      },
      code: {
        properties: {
          default_language: { type: 'string' },
          allow_language_selection: { type: 'boolean' },
          output_code_only: { type: 'boolean' },
          keys: {
            type: 'object',
            properties: { code: { type: 'string' }, lang: { type: 'string' } },
          },
        },
      },
      color: {},
    },
    required: ['name'],
  },
  uniqueItemProperties: ['name'],
};
const wrapper6 = { validate: validate33 };
function validate33(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="fields_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e" */ let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length < 1) {
      const err0 = {
        instancePath,
        schemaPath: '#/minItems',
        keyword: 'minItems',
        params: { limit: 1 },
        message: 'must NOT have fewer than 1 items',
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      let data0 = data[i0];
      const vSchema0 = data0 && data0.widget;
      if (!(vSchema0 === undefined)) {
        if (
          typeof vSchema0 !== 'string' &&
          !(typeof vSchema0 == 'number') &&
          typeof vSchema0 !== 'boolean' &&
          vSchema0 !== null
        ) {
          const err1 = {
            instancePath: instancePath + '/' + i0,
            schemaPath: '#/items/select',
            keyword: 'select',
            params: {},
            message: '"select" keyword must be string,number,boolean,null ($data)',
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        } else {
          let valid2 = true;
          const value0 = vSchema0 === null ? 'null' : vSchema0;
          if ('' + value0 == 'unknown') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'string') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'number') {
            const _errs3 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.step !== undefined) {
                if (!(typeof data0.step == 'number')) {
                  const err2 = {
                    instancePath: instancePath + '/' + i0 + '/step',
                    schemaPath: '#/items/selectCases/number/properties/step/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err2];
                  } else {
                    vErrors.push(err2);
                  }
                  errors++;
                }
              }
              if (data0.value_type !== undefined) {
                if (typeof data0.value_type !== 'string') {
                  const err3 = {
                    instancePath: instancePath + '/' + i0 + '/value_type',
                    schemaPath: '#/items/selectCases/number/properties/value_type/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err3];
                  } else {
                    vErrors.push(err3);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                if (!(typeof data0.min == 'number')) {
                  const err4 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/number/properties/min/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err4];
                  } else {
                    vErrors.push(err4);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                if (!(typeof data0.max == 'number')) {
                  const err5 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/number/properties/max/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err5];
                  } else {
                    vErrors.push(err5);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs3 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'text') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'image') {
            const _errs12 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_multiple !== undefined) {
                if (typeof data0.allow_multiple !== 'boolean') {
                  const err6 = {
                    instancePath: instancePath + '/' + i0 + '/allow_multiple',
                    schemaPath: '#/items/selectCases/image/properties/allow_multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err6];
                  } else {
                    vErrors.push(err6);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs12 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'file') {
            const _errs15 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_multiple !== undefined) {
                if (typeof data0.allow_multiple !== 'boolean') {
                  const err7 = {
                    instancePath: instancePath + '/' + i0 + '/allow_multiple',
                    schemaPath: '#/items/selectCases/file/properties/allow_multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err7];
                  } else {
                    vErrors.push(err7);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs15 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'select') {
            const _errs18 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.options === undefined) {
                const err8 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/select/required',
                  keyword: 'required',
                  params: { missingProperty: 'options' },
                  message: "must have required property '" + 'options' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
              if (data0.multiple !== undefined) {
                if (typeof data0.multiple !== 'boolean') {
                  const err9 = {
                    instancePath: instancePath + '/' + i0 + '/multiple',
                    schemaPath: '#/items/selectCases/select/properties/multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err9];
                  } else {
                    vErrors.push(err9);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                let data8 = data0.min;
                if (!(typeof data8 == 'number' && !(data8 % 1) && !isNaN(data8))) {
                  const err10 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/select/properties/min/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                let data9 = data0.max;
                if (!(typeof data9 == 'number' && !(data9 % 1) && !isNaN(data9))) {
                  const err11 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/select/properties/max/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
              }
              if (data0.options !== undefined) {
                let data10 = data0.options;
                if (Array.isArray(data10)) {
                  const len1 = data10.length;
                  for (let i1 = 0; i1 < len1; i1++) {
                    let data11 = data10[i1];
                    const _errs28 = errors;
                    let valid9 = false;
                    let passing0 = null;
                    const _errs29 = errors;
                    if (typeof data11 !== 'string') {
                      const err12 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath:
                          '#/items/selectCases/select/properties/options/items/oneOf/0/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err12];
                      } else {
                        vErrors.push(err12);
                      }
                      errors++;
                    }
                    var _valid1 = _errs29 === errors;
                    if (_valid1) {
                      valid9 = true;
                      passing0 = 0;
                    }
                    const _errs31 = errors;
                    if (!(typeof data11 == 'number')) {
                      const err13 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath:
                          '#/items/selectCases/select/properties/options/items/oneOf/1/type',
                        keyword: 'type',
                        params: { type: 'number' },
                        message: 'must be number',
                      };
                      if (vErrors === null) {
                        vErrors = [err13];
                      } else {
                        vErrors.push(err13);
                      }
                      errors++;
                    }
                    var _valid1 = _errs31 === errors;
                    if (_valid1 && valid9) {
                      valid9 = false;
                      passing0 = [passing0, 1];
                    } else {
                      if (_valid1) {
                        valid9 = true;
                        passing0 = 1;
                      }
                      const _errs33 = errors;
                      if (data11 && typeof data11 == 'object' && !Array.isArray(data11)) {
                        if (data11.label === undefined) {
                          const err14 = {
                            instancePath: instancePath + '/' + i0 + '/options/' + i1,
                            schemaPath:
                              '#/items/selectCases/select/properties/options/items/oneOf/2/required',
                            keyword: 'required',
                            params: { missingProperty: 'label' },
                            message: "must have required property '" + 'label' + "'",
                          };
                          if (vErrors === null) {
                            vErrors = [err14];
                          } else {
                            vErrors.push(err14);
                          }
                          errors++;
                        }
                        if (data11.value === undefined) {
                          const err15 = {
                            instancePath: instancePath + '/' + i0 + '/options/' + i1,
                            schemaPath:
                              '#/items/selectCases/select/properties/options/items/oneOf/2/required',
                            keyword: 'required',
                            params: { missingProperty: 'value' },
                            message: "must have required property '" + 'value' + "'",
                          };
                          if (vErrors === null) {
                            vErrors = [err15];
                          } else {
                            vErrors.push(err15);
                          }
                          errors++;
                        }
                        if (data11.label !== undefined) {
                          if (typeof data11.label !== 'string') {
                            const err16 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/label',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err16];
                            } else {
                              vErrors.push(err16);
                            }
                            errors++;
                          }
                        }
                        if (data11.value !== undefined) {
                          let data13 = data11.value;
                          const _errs38 = errors;
                          let valid11 = false;
                          let passing1 = null;
                          const _errs39 = errors;
                          if (typeof data13 !== 'string') {
                            const err17 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err17];
                            } else {
                              vErrors.push(err17);
                            }
                            errors++;
                          }
                          var _valid2 = _errs39 === errors;
                          if (_valid2) {
                            valid11 = true;
                            passing1 = 0;
                          }
                          const _errs41 = errors;
                          if (!(typeof data13 == 'number')) {
                            const err18 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                              keyword: 'type',
                              params: { type: 'number' },
                              message: 'must be number',
                            };
                            if (vErrors === null) {
                              vErrors = [err18];
                            } else {
                              vErrors.push(err18);
                            }
                            errors++;
                          }
                          var _valid2 = _errs41 === errors;
                          if (_valid2 && valid11) {
                            valid11 = false;
                            passing1 = [passing1, 1];
                          } else {
                            if (_valid2) {
                              valid11 = true;
                              passing1 = 1;
                            }
                          }
                          if (!valid11) {
                            const err19 = {
                              instancePath: instancePath + '/' + i0 + '/options/' + i1 + '/value',
                              schemaPath:
                                '#/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                              keyword: 'oneOf',
                              params: { passingSchemas: passing1 },
                              message: 'must match exactly one schema in oneOf',
                            };
                            if (vErrors === null) {
                              vErrors = [err19];
                            } else {
                              vErrors.push(err19);
                            }
                            errors++;
                          } else {
                            errors = _errs38;
                            if (vErrors !== null) {
                              if (_errs38) {
                                vErrors.length = _errs38;
                              } else {
                                vErrors = null;
                              }
                            }
                          }
                        }
                      } else {
                        const err20 = {
                          instancePath: instancePath + '/' + i0 + '/options/' + i1,
                          schemaPath:
                            '#/items/selectCases/select/properties/options/items/oneOf/2/type',
                          keyword: 'type',
                          params: { type: 'object' },
                          message: 'must be object',
                        };
                        if (vErrors === null) {
                          vErrors = [err20];
                        } else {
                          vErrors.push(err20);
                        }
                        errors++;
                      }
                      var _valid1 = _errs33 === errors;
                      if (_valid1 && valid9) {
                        valid9 = false;
                        passing0 = [passing0, 2];
                      } else {
                        if (_valid1) {
                          valid9 = true;
                          passing0 = 2;
                        }
                      }
                    }
                    if (!valid9) {
                      const err21 = {
                        instancePath: instancePath + '/' + i0 + '/options/' + i1,
                        schemaPath: '#/items/selectCases/select/properties/options/items/oneOf',
                        keyword: 'oneOf',
                        params: { passingSchemas: passing0 },
                        message: 'must match exactly one schema in oneOf',
                      };
                      if (vErrors === null) {
                        vErrors = [err21];
                      } else {
                        vErrors.push(err21);
                      }
                      errors++;
                    } else {
                      errors = _errs28;
                      if (vErrors !== null) {
                        if (_errs28) {
                          vErrors.length = _errs28;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                  }
                } else {
                  const err22 = {
                    instancePath: instancePath + '/' + i0 + '/options',
                    schemaPath: '#/items/selectCases/select/properties/options/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs18 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'markdown') {
            const _errs43 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.minimal !== undefined) {
                if (typeof data0.minimal !== 'boolean') {
                  const err23 = {
                    instancePath: instancePath + '/' + i0 + '/minimal',
                    schemaPath: '#/items/selectCases/markdown/properties/minimal/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
              }
              if (data0.buttons !== undefined) {
                let data15 = data0.buttons;
                if (Array.isArray(data15)) {
                  const len2 = data15.length;
                  for (let i2 = 0; i2 < len2; i2++) {
                    let data16 = data15[i2];
                    if (typeof data16 !== 'string') {
                      const err24 = {
                        instancePath: instancePath + '/' + i0 + '/buttons/' + i2,
                        schemaPath: '#/items/selectCases/markdown/properties/buttons/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err24];
                      } else {
                        vErrors.push(err24);
                      }
                      errors++;
                    }
                    if (
                      !(
                        data16 === 'bold' ||
                        data16 === 'italic' ||
                        data16 === 'code' ||
                        data16 === 'link' ||
                        data16 === 'heading-one' ||
                        data16 === 'heading-two' ||
                        data16 === 'heading-three' ||
                        data16 === 'heading-four' ||
                        data16 === 'heading-five' ||
                        data16 === 'heading-six' ||
                        data16 === 'quote' ||
                        data16 === 'bulleted-list' ||
                        data16 === 'numbered-list'
                      )
                    ) {
                      const err25 = {
                        instancePath: instancePath + '/' + i0 + '/buttons/' + i2,
                        schemaPath: '#/items/selectCases/markdown/properties/buttons/items/enum',
                        keyword: 'enum',
                        params: {
                          allowedValues:
                            schema44.items.selectCases.markdown.properties.buttons.items.enum,
                        },
                        message: 'must be equal to one of the allowed values',
                      };
                      if (vErrors === null) {
                        vErrors = [err25];
                      } else {
                        vErrors.push(err25);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err26 = {
                    instancePath: instancePath + '/' + i0 + '/buttons',
                    schemaPath: '#/items/selectCases/markdown/properties/buttons/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              }
              if (data0.editor_components !== undefined) {
                let data17 = data0.editor_components;
                if (Array.isArray(data17)) {
                  const len3 = data17.length;
                  for (let i3 = 0; i3 < len3; i3++) {
                    if (typeof data17[i3] !== 'string') {
                      const err27 = {
                        instancePath: instancePath + '/' + i0 + '/editor_components/' + i3,
                        schemaPath:
                          '#/items/selectCases/markdown/properties/editor_components/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err27];
                      } else {
                        vErrors.push(err27);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err28 = {
                    instancePath: instancePath + '/' + i0 + '/editor_components',
                    schemaPath: '#/items/selectCases/markdown/properties/editor_components/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
              }
              if (data0.modes !== undefined) {
                let data19 = data0.modes;
                if (Array.isArray(data19)) {
                  if (data19.length < 1) {
                    const err29 = {
                      instancePath: instancePath + '/' + i0 + '/modes',
                      schemaPath: '#/items/selectCases/markdown/properties/modes/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err29];
                    } else {
                      vErrors.push(err29);
                    }
                    errors++;
                  }
                  const len4 = data19.length;
                  for (let i4 = 0; i4 < len4; i4++) {
                    let data20 = data19[i4];
                    if (typeof data20 !== 'string') {
                      const err30 = {
                        instancePath: instancePath + '/' + i0 + '/modes/' + i4,
                        schemaPath: '#/items/selectCases/markdown/properties/modes/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err30];
                      } else {
                        vErrors.push(err30);
                      }
                      errors++;
                    }
                    if (!(data20 === 'raw' || data20 === 'rich_text')) {
                      const err31 = {
                        instancePath: instancePath + '/' + i0 + '/modes/' + i4,
                        schemaPath: '#/items/selectCases/markdown/properties/modes/items/enum',
                        keyword: 'enum',
                        params: {
                          allowedValues:
                            schema44.items.selectCases.markdown.properties.modes.items.enum,
                        },
                        message: 'must be equal to one of the allowed values',
                      };
                      if (vErrors === null) {
                        vErrors = [err31];
                      } else {
                        vErrors.push(err31);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err32 = {
                    instancePath: instancePath + '/' + i0 + '/modes',
                    schemaPath: '#/items/selectCases/markdown/properties/modes/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err32];
                  } else {
                    vErrors.push(err32);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs43 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'list') {
            const _errs58 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.allow_add !== undefined) {
                if (typeof data0.allow_add !== 'boolean') {
                  const err33 = {
                    instancePath: instancePath + '/' + i0 + '/allow_add',
                    schemaPath: '#/items/selectCases/list/properties/allow_add/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err33];
                  } else {
                    vErrors.push(err33);
                  }
                  errors++;
                }
              }
              if (data0.collapsed !== undefined) {
                if (typeof data0.collapsed !== 'boolean') {
                  const err34 = {
                    instancePath: instancePath + '/' + i0 + '/collapsed',
                    schemaPath: '#/items/selectCases/list/properties/collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err34];
                  } else {
                    vErrors.push(err34);
                  }
                  errors++;
                }
              }
              if (data0.summary !== undefined) {
                if (typeof data0.summary !== 'string') {
                  const err35 = {
                    instancePath: instancePath + '/' + i0 + '/summary',
                    schemaPath: '#/items/selectCases/list/properties/summary/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              }
              if (data0.minimize_collapsed !== undefined) {
                if (typeof data0.minimize_collapsed !== 'boolean') {
                  const err36 = {
                    instancePath: instancePath + '/' + i0 + '/minimize_collapsed',
                    schemaPath: '#/items/selectCases/list/properties/minimize_collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err36];
                  } else {
                    vErrors.push(err36);
                  }
                  errors++;
                }
              }
              if (data0.label_singular !== undefined) {
                if (typeof data0.label_singular !== 'string') {
                  const err37 = {
                    instancePath: instancePath + '/' + i0 + '/label_singular',
                    schemaPath: '#/items/selectCases/list/properties/label_singular/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err37];
                  } else {
                    vErrors.push(err37);
                  }
                  errors++;
                }
              }
              if (data0.i18n !== undefined) {
                if (typeof data0.i18n !== 'boolean') {
                  const err38 = {
                    instancePath: instancePath + '/' + i0 + '/i18n',
                    schemaPath: '#/items/selectCases/list/properties/i18n/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err38];
                  } else {
                    vErrors.push(err38);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                if (!(typeof data0.min == 'number')) {
                  const err39 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/list/properties/min/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err39];
                  } else {
                    vErrors.push(err39);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                if (!(typeof data0.max == 'number')) {
                  const err40 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/list/properties/max/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err40];
                  } else {
                    vErrors.push(err40);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs58 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'object') {
            const _errs75 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collapsed !== undefined) {
                if (typeof data0.collapsed !== 'boolean') {
                  const err41 = {
                    instancePath: instancePath + '/' + i0 + '/collapsed',
                    schemaPath: '#/items/selectCases/object/properties/collapsed/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err41];
                  } else {
                    vErrors.push(err41);
                  }
                  errors++;
                }
              }
              if (data0.i18n !== undefined) {
                if (typeof data0.i18n !== 'boolean') {
                  const err42 = {
                    instancePath: instancePath + '/' + i0 + '/i18n',
                    schemaPath: '#/items/selectCases/object/properties/i18n/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err42];
                  } else {
                    vErrors.push(err42);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs75 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'relation') {
            const _errs80 = errors;
            const _errs81 = errors;
            let valid21 = false;
            let passing2 = null;
            const _errs82 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection === undefined) {
                const err43 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'collection' },
                  message: "must have required property '" + 'collection' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
              if (data0.value_field === undefined) {
                const err44 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'value_field' },
                  message: "must have required property '" + 'value_field' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err44];
                } else {
                  vErrors.push(err44);
                }
                errors++;
              }
              if (data0.search_fields === undefined) {
                const err45 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/0/required',
                  keyword: 'required',
                  params: { missingProperty: 'search_fields' },
                  message: "must have required property '" + 'search_fields' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
            }
            var _valid3 = _errs82 === errors;
            if (_valid3) {
              valid21 = true;
              passing2 = 0;
            }
            const _errs83 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection === undefined) {
                const err46 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'collection' },
                  message: "must have required property '" + 'collection' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
              if (data0.valueField === undefined) {
                const err47 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'valueField' },
                  message: "must have required property '" + 'valueField' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
              if (data0.searchFields === undefined) {
                const err48 = {
                  instancePath: instancePath + '/' + i0,
                  schemaPath: '#/items/selectCases/relation/oneOf/1/required',
                  keyword: 'required',
                  params: { missingProperty: 'searchFields' },
                  message: "must have required property '" + 'searchFields' + "'",
                };
                if (vErrors === null) {
                  vErrors = [err48];
                } else {
                  vErrors.push(err48);
                }
                errors++;
              }
            }
            var _valid3 = _errs83 === errors;
            if (_valid3 && valid21) {
              valid21 = false;
              passing2 = [passing2, 1];
            } else {
              if (_valid3) {
                valid21 = true;
                passing2 = 1;
              }
            }
            if (!valid21) {
              const err49 = {
                instancePath: instancePath + '/' + i0,
                schemaPath: '#/items/selectCases/relation/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing2 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            } else {
              errors = _errs81;
              if (vErrors !== null) {
                if (_errs81) {
                  vErrors.length = _errs81;
                } else {
                  vErrors = null;
                }
              }
            }
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.collection !== undefined) {
                if (typeof data0.collection !== 'string') {
                  const err50 = {
                    instancePath: instancePath + '/' + i0 + '/collection',
                    schemaPath: '#/items/selectCases/relation/properties/collection/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err50];
                  } else {
                    vErrors.push(err50);
                  }
                  errors++;
                }
              }
              if (data0.value_field !== undefined) {
                if (typeof data0.value_field !== 'string') {
                  const err51 = {
                    instancePath: instancePath + '/' + i0 + '/value_field',
                    schemaPath: '#/items/selectCases/relation/properties/value_field/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err51];
                  } else {
                    vErrors.push(err51);
                  }
                  errors++;
                }
              }
              if (data0.search_fields !== undefined) {
                let data33 = data0.search_fields;
                if (Array.isArray(data33)) {
                  if (data33.length < 1) {
                    const err52 = {
                      instancePath: instancePath + '/' + i0 + '/search_fields',
                      schemaPath: '#/items/selectCases/relation/properties/search_fields/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err52];
                    } else {
                      vErrors.push(err52);
                    }
                    errors++;
                  }
                  const len5 = data33.length;
                  for (let i5 = 0; i5 < len5; i5++) {
                    if (typeof data33[i5] !== 'string') {
                      const err53 = {
                        instancePath: instancePath + '/' + i0 + '/search_fields/' + i5,
                        schemaPath:
                          '#/items/selectCases/relation/properties/search_fields/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err53];
                      } else {
                        vErrors.push(err53);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err54 = {
                    instancePath: instancePath + '/' + i0 + '/search_fields',
                    schemaPath: '#/items/selectCases/relation/properties/search_fields/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err54];
                  } else {
                    vErrors.push(err54);
                  }
                  errors++;
                }
              }
              if (data0.file !== undefined) {
                if (typeof data0.file !== 'string') {
                  const err55 = {
                    instancePath: instancePath + '/' + i0 + '/file',
                    schemaPath: '#/items/selectCases/relation/properties/file/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err55];
                  } else {
                    vErrors.push(err55);
                  }
                  errors++;
                }
              }
              if (data0.multiple !== undefined) {
                if (typeof data0.multiple !== 'boolean') {
                  const err56 = {
                    instancePath: instancePath + '/' + i0 + '/multiple',
                    schemaPath: '#/items/selectCases/relation/properties/multiple/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err56];
                  } else {
                    vErrors.push(err56);
                  }
                  errors++;
                }
              }
              if (data0.min !== undefined) {
                let data37 = data0.min;
                if (!(typeof data37 == 'number' && !(data37 % 1) && !isNaN(data37))) {
                  const err57 = {
                    instancePath: instancePath + '/' + i0 + '/min',
                    schemaPath: '#/items/selectCases/relation/properties/min/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err57];
                  } else {
                    vErrors.push(err57);
                  }
                  errors++;
                }
              }
              if (data0.max !== undefined) {
                let data38 = data0.max;
                if (!(typeof data38 == 'number' && !(data38 % 1) && !isNaN(data38))) {
                  const err58 = {
                    instancePath: instancePath + '/' + i0 + '/max',
                    schemaPath: '#/items/selectCases/relation/properties/max/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err58];
                  } else {
                    vErrors.push(err58);
                  }
                  errors++;
                }
              }
              if (data0.display_fields !== undefined) {
                let data39 = data0.display_fields;
                if (Array.isArray(data39)) {
                  if (data39.length < 1) {
                    const err59 = {
                      instancePath: instancePath + '/' + i0 + '/display_fields',
                      schemaPath: '#/items/selectCases/relation/properties/display_fields/minItems',
                      keyword: 'minItems',
                      params: { limit: 1 },
                      message: 'must NOT have fewer than 1 items',
                    };
                    if (vErrors === null) {
                      vErrors = [err59];
                    } else {
                      vErrors.push(err59);
                    }
                    errors++;
                  }
                  const len6 = data39.length;
                  for (let i6 = 0; i6 < len6; i6++) {
                    if (typeof data39[i6] !== 'string') {
                      const err60 = {
                        instancePath: instancePath + '/' + i0 + '/display_fields/' + i6,
                        schemaPath:
                          '#/items/selectCases/relation/properties/display_fields/items/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err60];
                      } else {
                        vErrors.push(err60);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err61 = {
                    instancePath: instancePath + '/' + i0 + '/display_fields',
                    schemaPath: '#/items/selectCases/relation/properties/display_fields/type',
                    keyword: 'type',
                    params: { type: 'array' },
                    message: 'must be array',
                  };
                  if (vErrors === null) {
                    vErrors = [err61];
                  } else {
                    vErrors.push(err61);
                  }
                  errors++;
                }
              }
              if (data0.options_length !== undefined) {
                let data41 = data0.options_length;
                if (!(typeof data41 == 'number' && !(data41 % 1) && !isNaN(data41))) {
                  const err62 = {
                    instancePath: instancePath + '/' + i0 + '/options_length',
                    schemaPath: '#/items/selectCases/relation/properties/options_length/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err62];
                  } else {
                    vErrors.push(err62);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs80 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'boolean') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'map') {
            const _errs106 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.decimals !== undefined) {
                let data42 = data0.decimals;
                if (!(typeof data42 == 'number' && !(data42 % 1) && !isNaN(data42))) {
                  const err63 = {
                    instancePath: instancePath + '/' + i0 + '/decimals',
                    schemaPath: '#/items/selectCases/map/properties/decimals/type',
                    keyword: 'type',
                    params: { type: 'integer' },
                    message: 'must be integer',
                  };
                  if (vErrors === null) {
                    vErrors = [err63];
                  } else {
                    vErrors.push(err63);
                  }
                  errors++;
                }
              }
              if (data0.type !== undefined) {
                let data43 = data0.type;
                if (typeof data43 !== 'string') {
                  const err64 = {
                    instancePath: instancePath + '/' + i0 + '/type',
                    schemaPath: '#/items/selectCases/map/properties/type/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err64];
                  } else {
                    vErrors.push(err64);
                  }
                  errors++;
                }
                if (!(data43 === 'Point' || data43 === 'LineString' || data43 === 'Polygon')) {
                  const err65 = {
                    instancePath: instancePath + '/' + i0 + '/type',
                    schemaPath: '#/items/selectCases/map/properties/type/enum',
                    keyword: 'enum',
                    params: { allowedValues: schema44.items.selectCases.map.properties.type.enum },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err65];
                  } else {
                    vErrors.push(err65);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs106 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'date') {
            var _valid0 = true;
            valid2 = _valid0;
          } else if ('' + value0 == 'datetime') {
            const _errs111 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.format !== undefined) {
                if (typeof data0.format !== 'string') {
                  const err66 = {
                    instancePath: instancePath + '/' + i0 + '/format',
                    schemaPath: '#/items/selectCases/datetime/properties/format/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err66];
                  } else {
                    vErrors.push(err66);
                  }
                  errors++;
                }
              }
              if (data0.date_format !== undefined) {
                let data45 = data0.date_format;
                const _errs115 = errors;
                let valid29 = false;
                let passing3 = null;
                const _errs116 = errors;
                if (typeof data45 !== 'string') {
                  const err67 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err67];
                  } else {
                    vErrors.push(err67);
                  }
                  errors++;
                }
                var _valid4 = _errs116 === errors;
                if (_valid4) {
                  valid29 = true;
                  passing3 = 0;
                }
                const _errs118 = errors;
                if (typeof data45 !== 'boolean') {
                  const err68 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err68];
                  } else {
                    vErrors.push(err68);
                  }
                  errors++;
                }
                var _valid4 = _errs118 === errors;
                if (_valid4 && valid29) {
                  valid29 = false;
                  passing3 = [passing3, 1];
                } else {
                  if (_valid4) {
                    valid29 = true;
                    passing3 = 1;
                  }
                }
                if (!valid29) {
                  const err69 = {
                    instancePath: instancePath + '/' + i0 + '/date_format',
                    schemaPath: '#/items/selectCases/datetime/properties/date_format/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing3 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err69];
                  } else {
                    vErrors.push(err69);
                  }
                  errors++;
                } else {
                  errors = _errs115;
                  if (vErrors !== null) {
                    if (_errs115) {
                      vErrors.length = _errs115;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (data0.time_format !== undefined) {
                let data46 = data0.time_format;
                const _errs121 = errors;
                let valid30 = false;
                let passing4 = null;
                const _errs122 = errors;
                if (typeof data46 !== 'string') {
                  const err70 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err70];
                  } else {
                    vErrors.push(err70);
                  }
                  errors++;
                }
                var _valid5 = _errs122 === errors;
                if (_valid5) {
                  valid30 = true;
                  passing4 = 0;
                }
                const _errs124 = errors;
                if (typeof data46 !== 'boolean') {
                  const err71 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err71];
                  } else {
                    vErrors.push(err71);
                  }
                  errors++;
                }
                var _valid5 = _errs124 === errors;
                if (_valid5 && valid30) {
                  valid30 = false;
                  passing4 = [passing4, 1];
                } else {
                  if (_valid5) {
                    valid30 = true;
                    passing4 = 1;
                  }
                }
                if (!valid30) {
                  const err72 = {
                    instancePath: instancePath + '/' + i0 + '/time_format',
                    schemaPath: '#/items/selectCases/datetime/properties/time_format/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing4 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err72];
                  } else {
                    vErrors.push(err72);
                  }
                  errors++;
                } else {
                  errors = _errs121;
                  if (vErrors !== null) {
                    if (_errs121) {
                      vErrors.length = _errs121;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (data0.picker_utc !== undefined) {
                if (typeof data0.picker_utc !== 'boolean') {
                  const err73 = {
                    instancePath: instancePath + '/' + i0 + '/picker_utc',
                    schemaPath: '#/items/selectCases/datetime/properties/picker_utc/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err73];
                  } else {
                    vErrors.push(err73);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs111 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'code') {
            const _errs128 = errors;
            if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
              if (data0.default_language !== undefined) {
                if (typeof data0.default_language !== 'string') {
                  const err74 = {
                    instancePath: instancePath + '/' + i0 + '/default_language',
                    schemaPath: '#/items/selectCases/code/properties/default_language/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err74];
                  } else {
                    vErrors.push(err74);
                  }
                  errors++;
                }
              }
              if (data0.allow_language_selection !== undefined) {
                if (typeof data0.allow_language_selection !== 'boolean') {
                  const err75 = {
                    instancePath: instancePath + '/' + i0 + '/allow_language_selection',
                    schemaPath: '#/items/selectCases/code/properties/allow_language_selection/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err75];
                  } else {
                    vErrors.push(err75);
                  }
                  errors++;
                }
              }
              if (data0.output_code_only !== undefined) {
                if (typeof data0.output_code_only !== 'boolean') {
                  const err76 = {
                    instancePath: instancePath + '/' + i0 + '/output_code_only',
                    schemaPath: '#/items/selectCases/code/properties/output_code_only/type',
                    keyword: 'type',
                    params: { type: 'boolean' },
                    message: 'must be boolean',
                  };
                  if (vErrors === null) {
                    vErrors = [err76];
                  } else {
                    vErrors.push(err76);
                  }
                  errors++;
                }
              }
              if (data0.keys !== undefined) {
                let data51 = data0.keys;
                if (data51 && typeof data51 == 'object' && !Array.isArray(data51)) {
                  if (data51.code !== undefined) {
                    if (typeof data51.code !== 'string') {
                      const err77 = {
                        instancePath: instancePath + '/' + i0 + '/keys/code',
                        schemaPath: '#/items/selectCases/code/properties/keys/properties/code/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err77];
                      } else {
                        vErrors.push(err77);
                      }
                      errors++;
                    }
                  }
                  if (data51.lang !== undefined) {
                    if (typeof data51.lang !== 'string') {
                      const err78 = {
                        instancePath: instancePath + '/' + i0 + '/keys/lang',
                        schemaPath: '#/items/selectCases/code/properties/keys/properties/lang/type',
                        keyword: 'type',
                        params: { type: 'string' },
                        message: 'must be string',
                      };
                      if (vErrors === null) {
                        vErrors = [err78];
                      } else {
                        vErrors.push(err78);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err79 = {
                    instancePath: instancePath + '/' + i0 + '/keys',
                    schemaPath: '#/items/selectCases/code/properties/keys/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                  };
                  if (vErrors === null) {
                    vErrors = [err79];
                  } else {
                    vErrors.push(err79);
                  }
                  errors++;
                }
              }
            }
            var _valid0 = _errs128 === errors;
            valid2 = _valid0;
          } else if ('' + value0 == 'color') {
            var _valid0 = true;
            valid2 = _valid0;
          }
          if (!valid2) {
            const err80 = {
              instancePath: instancePath + '/' + i0,
              schemaPath: '#/items/select',
              keyword: 'select',
              params: { failingCase: 'color' },
              message: 'should match case "color" schema',
            };
            if (vErrors === null) {
              vErrors = [err80];
            } else {
              vErrors.push(err80);
            }
            errors++;
          }
        }
      }
      if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
        if (data0.name === undefined) {
          const err81 = {
            instancePath: instancePath + '/' + i0,
            schemaPath: '#/items/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err81];
          } else {
            vErrors.push(err81);
          }
          errors++;
        }
        if (data0.name !== undefined) {
          if (typeof data0.name !== 'string') {
            const err82 = {
              instancePath: instancePath + '/' + i0 + '/name',
              schemaPath: '#/items/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err82];
            } else {
              vErrors.push(err82);
            }
            errors++;
          }
        }
        if (data0.label !== undefined) {
          if (typeof data0.label !== 'string') {
            const err83 = {
              instancePath: instancePath + '/' + i0 + '/label',
              schemaPath: '#/items/properties/label/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err83];
            } else {
              vErrors.push(err83);
            }
            errors++;
          }
        }
        if (data0.widget !== undefined) {
          if (typeof data0.widget !== 'string') {
            const err84 = {
              instancePath: instancePath + '/' + i0 + '/widget',
              schemaPath: '#/items/properties/widget/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err84];
            } else {
              vErrors.push(err84);
            }
            errors++;
          }
        }
        if (data0.required !== undefined) {
          if (typeof data0.required !== 'boolean') {
            const err85 = {
              instancePath: instancePath + '/' + i0 + '/required',
              schemaPath: '#/items/properties/required/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err85];
            } else {
              vErrors.push(err85);
            }
            errors++;
          }
        }
        if (data0.i18n !== undefined) {
          let data58 = data0.i18n;
          const _errs151 = errors;
          let valid34 = false;
          let passing5 = null;
          const _errs152 = errors;
          if (typeof data58 !== 'boolean') {
            const err86 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/0/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err86];
            } else {
              vErrors.push(err86);
            }
            errors++;
          }
          var _valid6 = _errs152 === errors;
          if (_valid6) {
            valid34 = true;
            passing5 = 0;
          }
          const _errs154 = errors;
          if (typeof data58 !== 'string') {
            const err87 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/1/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err87];
            } else {
              vErrors.push(err87);
            }
            errors++;
          }
          if (!(data58 === 'translate' || data58 === 'duplicate' || data58 === 'none')) {
            const err88 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf/1/enum',
              keyword: 'enum',
              params: { allowedValues: schema44.items.properties.i18n.oneOf[1].enum },
              message: 'must be equal to one of the allowed values',
            };
            if (vErrors === null) {
              vErrors = [err88];
            } else {
              vErrors.push(err88);
            }
            errors++;
          }
          var _valid6 = _errs154 === errors;
          if (_valid6 && valid34) {
            valid34 = false;
            passing5 = [passing5, 1];
          } else {
            if (_valid6) {
              valid34 = true;
              passing5 = 1;
            }
          }
          if (!valid34) {
            const err89 = {
              instancePath: instancePath + '/' + i0 + '/i18n',
              schemaPath: '#/items/properties/i18n/oneOf',
              keyword: 'oneOf',
              params: { passingSchemas: passing5 },
              message: 'must match exactly one schema in oneOf',
            };
            if (vErrors === null) {
              vErrors = [err89];
            } else {
              vErrors.push(err89);
            }
            errors++;
          } else {
            errors = _errs151;
            if (vErrors !== null) {
              if (_errs151) {
                vErrors.length = _errs151;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data0.hint !== undefined) {
          if (typeof data0.hint !== 'string') {
            const err90 = {
              instancePath: instancePath + '/' + i0 + '/hint',
              schemaPath: '#/items/properties/hint/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err90];
            } else {
              vErrors.push(err90);
            }
            errors++;
          }
        }
        if (data0.pattern !== undefined) {
          let data60 = data0.pattern;
          if (Array.isArray(data60)) {
            if (data60.length < 2) {
              const err91 = {
                instancePath: instancePath + '/' + i0 + '/pattern',
                schemaPath: '#/items/properties/pattern/minItems',
                keyword: 'minItems',
                params: { limit: 2 },
                message: 'must NOT have fewer than 2 items',
              };
              if (vErrors === null) {
                vErrors = [err91];
              } else {
                vErrors.push(err91);
              }
              errors++;
            }
            const len7 = data60.length;
            if (len7 > 0) {
              let data61 = data60[0];
              const _errs161 = errors;
              let valid36 = false;
              let passing6 = null;
              const _errs162 = errors;
              if (typeof data61 !== 'string') {
                const err92 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/0',
                  schemaPath: '#/items/properties/pattern/items/0/oneOf/0/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err92];
                } else {
                  vErrors.push(err92);
                }
                errors++;
              }
              var _valid7 = _errs162 === errors;
              if (_valid7) {
                valid36 = true;
                passing6 = 0;
              }
              const _errs164 = errors;
              if (typeof data61 == 'number') {
                if (!(data61 instanceof RegExp)) {
                  const err93 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err93];
                  } else {
                    vErrors.push(err93);
                  }
                  errors++;
                }
              }
              if (typeof data61 === 'string') {
                if (!(data61 instanceof RegExp)) {
                  const err94 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err94];
                  } else {
                    vErrors.push(err94);
                  }
                  errors++;
                }
              }
              if (Array.isArray(data61)) {
                if (!(data61 instanceof RegExp)) {
                  const err95 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err95];
                  } else {
                    vErrors.push(err95);
                  }
                  errors++;
                }
              }
              if (data61 && typeof data61 == 'object' && !Array.isArray(data61)) {
                if (!(data61 instanceof RegExp)) {
                  const err96 = {
                    instancePath: instancePath + '/' + i0 + '/pattern/0',
                    schemaPath: '#/items/properties/pattern/items/0/oneOf/1/instanceof',
                    keyword: 'instanceof',
                    params: {},
                    message: 'must pass "instanceof" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err96];
                  } else {
                    vErrors.push(err96);
                  }
                  errors++;
                }
              }
              var _valid7 = _errs164 === errors;
              if (_valid7 && valid36) {
                valid36 = false;
                passing6 = [passing6, 1];
              } else {
                if (_valid7) {
                  valid36 = true;
                  passing6 = 1;
                }
              }
              if (!valid36) {
                const err97 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/0',
                  schemaPath: '#/items/properties/pattern/items/0/oneOf',
                  keyword: 'oneOf',
                  params: { passingSchemas: passing6 },
                  message: 'must match exactly one schema in oneOf',
                };
                if (vErrors === null) {
                  vErrors = [err97];
                } else {
                  vErrors.push(err97);
                }
                errors++;
              } else {
                errors = _errs161;
                if (vErrors !== null) {
                  if (_errs161) {
                    vErrors.length = _errs161;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (len7 > 1) {
              if (typeof data60[1] !== 'string') {
                const err98 = {
                  instancePath: instancePath + '/' + i0 + '/pattern/1',
                  schemaPath: '#/items/properties/pattern/items/1/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err98];
                } else {
                  vErrors.push(err98);
                }
                errors++;
              }
            }
          } else {
            const err99 = {
              instancePath: instancePath + '/' + i0 + '/pattern',
              schemaPath: '#/items/properties/pattern/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err99];
            } else {
              vErrors.push(err99);
            }
            errors++;
          }
        }
        if (data0.field !== undefined) {
          if (
            !wrapper4.validate(data0.field, {
              instancePath: instancePath + '/' + i0 + '/field',
              parentData: data0,
              parentDataProperty: 'field',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper4.validate.errors
                : vErrors.concat(wrapper4.validate.errors);
            errors = vErrors.length;
          }
        }
        if (data0.fields !== undefined) {
          if (
            !wrapper6.validate(data0.fields, {
              instancePath: instancePath + '/' + i0 + '/fields',
              parentData: data0,
              parentDataProperty: 'fields',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper6.validate.errors
                : vErrors.concat(wrapper6.validate.errors);
            errors = vErrors.length;
          }
        }
        if (data0.types !== undefined) {
          if (
            !wrapper6.validate(data0.types, {
              instancePath: instancePath + '/' + i0 + '/types',
              parentData: data0,
              parentDataProperty: 'types',
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? wrapper6.validate.errors
                : vErrors.concat(wrapper6.validate.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err100 = {
          instancePath: instancePath + '/' + i0,
          schemaPath: '#/items/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err100];
        } else {
          vErrors.push(err100);
        }
        errors++;
      }
    }
    if (
      schema44.uniqueItemProperties
        .map(property =>
          data
            .map(item => item && item[property])
            .some((value, index, array) => array.indexOf(value) !== index),
        )
        .some(value => value)
    ) {
      const err101 = {
        instancePath,
        schemaPath: '#/uniqueItemProperties',
        keyword: 'uniqueItemProperties',
        params: {},
        message: 'must pass "uniqueItemProperties" keyword validation',
      };
      if (vErrors === null) {
        vErrors = [err101];
      } else {
        vErrors.push(err101);
      }
      errors++;
    }
  } else {
    const err102 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'array' },
      message: 'must be array',
    };
    if (vErrors === null) {
      vErrors = [err102];
    } else {
      vErrors.push(err102);
    }
    errors++;
  }
  validate33.errors = vErrors;
  return errors === 0;
}
function validate32(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="field_2adbd682-fad2-4d92-a8a2-d5235f5f6a9e" */ let vErrors = null;
  let errors = 0;
  const vSchema0 = data && data.widget;
  if (!(vSchema0 === undefined)) {
    if (
      typeof vSchema0 !== 'string' &&
      !(typeof vSchema0 == 'number') &&
      typeof vSchema0 !== 'boolean' &&
      vSchema0 !== null
    ) {
      const err0 = {
        instancePath,
        schemaPath: '#/select',
        keyword: 'select',
        params: {},
        message: '"select" keyword must be string,number,boolean,null ($data)',
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      let valid0 = true;
      const value0 = vSchema0 === null ? 'null' : vSchema0;
      if ('' + value0 == 'unknown') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'string') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'number') {
        const _errs1 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.step !== undefined) {
            if (!(typeof data.step == 'number')) {
              const err1 = {
                instancePath: instancePath + '/step',
                schemaPath: '#/selectCases/number/properties/step/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err1];
              } else {
                vErrors.push(err1);
              }
              errors++;
            }
          }
          if (data.value_type !== undefined) {
            if (typeof data.value_type !== 'string') {
              const err2 = {
                instancePath: instancePath + '/value_type',
                schemaPath: '#/selectCases/number/properties/value_type/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err2];
              } else {
                vErrors.push(err2);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            if (!(typeof data.min == 'number')) {
              const err3 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/number/properties/min/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            if (!(typeof data.max == 'number')) {
              const err4 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/number/properties/max/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs1 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'text') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'image') {
        const _errs10 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_multiple !== undefined) {
            if (typeof data.allow_multiple !== 'boolean') {
              const err5 = {
                instancePath: instancePath + '/allow_multiple',
                schemaPath: '#/selectCases/image/properties/allow_multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs10 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'file') {
        const _errs13 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_multiple !== undefined) {
            if (typeof data.allow_multiple !== 'boolean') {
              const err6 = {
                instancePath: instancePath + '/allow_multiple',
                schemaPath: '#/selectCases/file/properties/allow_multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs13 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'select') {
        const _errs16 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.options === undefined) {
            const err7 = {
              instancePath,
              schemaPath: '#/selectCases/select/required',
              keyword: 'required',
              params: { missingProperty: 'options' },
              message: "must have required property '" + 'options' + "'",
            };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if (data.multiple !== undefined) {
            if (typeof data.multiple !== 'boolean') {
              const err8 = {
                instancePath: instancePath + '/multiple',
                schemaPath: '#/selectCases/select/properties/multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            let data7 = data.min;
            if (!(typeof data7 == 'number' && !(data7 % 1) && !isNaN(data7))) {
              const err9 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/select/properties/min/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            let data8 = data.max;
            if (!(typeof data8 == 'number' && !(data8 % 1) && !isNaN(data8))) {
              const err10 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/select/properties/max/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          }
          if (data.options !== undefined) {
            let data9 = data.options;
            if (Array.isArray(data9)) {
              const len0 = data9.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data10 = data9[i0];
                const _errs26 = errors;
                let valid7 = false;
                let passing0 = null;
                const _errs27 = errors;
                if (typeof data10 !== 'string') {
                  const err11 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf/0/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                var _valid1 = _errs27 === errors;
                if (_valid1) {
                  valid7 = true;
                  passing0 = 0;
                }
                const _errs29 = errors;
                if (!(typeof data10 == 'number')) {
                  const err12 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf/1/type',
                    keyword: 'type',
                    params: { type: 'number' },
                    message: 'must be number',
                  };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                var _valid1 = _errs29 === errors;
                if (_valid1 && valid7) {
                  valid7 = false;
                  passing0 = [passing0, 1];
                } else {
                  if (_valid1) {
                    valid7 = true;
                    passing0 = 1;
                  }
                  const _errs31 = errors;
                  if (data10 && typeof data10 == 'object' && !Array.isArray(data10)) {
                    if (data10.label === undefined) {
                      const err13 = {
                        instancePath: instancePath + '/options/' + i0,
                        schemaPath:
                          '#/selectCases/select/properties/options/items/oneOf/2/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err13];
                      } else {
                        vErrors.push(err13);
                      }
                      errors++;
                    }
                    if (data10.value === undefined) {
                      const err14 = {
                        instancePath: instancePath + '/options/' + i0,
                        schemaPath:
                          '#/selectCases/select/properties/options/items/oneOf/2/required',
                        keyword: 'required',
                        params: { missingProperty: 'value' },
                        message: "must have required property '" + 'value' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err14];
                      } else {
                        vErrors.push(err14);
                      }
                      errors++;
                    }
                    if (data10.label !== undefined) {
                      if (typeof data10.label !== 'string') {
                        const err15 = {
                          instancePath: instancePath + '/options/' + i0 + '/label',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err15];
                        } else {
                          vErrors.push(err15);
                        }
                        errors++;
                      }
                    }
                    if (data10.value !== undefined) {
                      let data12 = data10.value;
                      const _errs36 = errors;
                      let valid9 = false;
                      let passing1 = null;
                      const _errs37 = errors;
                      if (typeof data12 !== 'string') {
                        const err16 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err16];
                        } else {
                          vErrors.push(err16);
                        }
                        errors++;
                      }
                      var _valid2 = _errs37 === errors;
                      if (_valid2) {
                        valid9 = true;
                        passing1 = 0;
                      }
                      const _errs39 = errors;
                      if (!(typeof data12 == 'number')) {
                        const err17 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                          keyword: 'type',
                          params: { type: 'number' },
                          message: 'must be number',
                        };
                        if (vErrors === null) {
                          vErrors = [err17];
                        } else {
                          vErrors.push(err17);
                        }
                        errors++;
                      }
                      var _valid2 = _errs39 === errors;
                      if (_valid2 && valid9) {
                        valid9 = false;
                        passing1 = [passing1, 1];
                      } else {
                        if (_valid2) {
                          valid9 = true;
                          passing1 = 1;
                        }
                      }
                      if (!valid9) {
                        const err18 = {
                          instancePath: instancePath + '/options/' + i0 + '/value',
                          schemaPath:
                            '#/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                          keyword: 'oneOf',
                          params: { passingSchemas: passing1 },
                          message: 'must match exactly one schema in oneOf',
                        };
                        if (vErrors === null) {
                          vErrors = [err18];
                        } else {
                          vErrors.push(err18);
                        }
                        errors++;
                      } else {
                        errors = _errs36;
                        if (vErrors !== null) {
                          if (_errs36) {
                            vErrors.length = _errs36;
                          } else {
                            vErrors = null;
                          }
                        }
                      }
                    }
                  } else {
                    const err19 = {
                      instancePath: instancePath + '/options/' + i0,
                      schemaPath: '#/selectCases/select/properties/options/items/oneOf/2/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                  var _valid1 = _errs31 === errors;
                  if (_valid1 && valid7) {
                    valid7 = false;
                    passing0 = [passing0, 2];
                  } else {
                    if (_valid1) {
                      valid7 = true;
                      passing0 = 2;
                    }
                  }
                }
                if (!valid7) {
                  const err20 = {
                    instancePath: instancePath + '/options/' + i0,
                    schemaPath: '#/selectCases/select/properties/options/items/oneOf',
                    keyword: 'oneOf',
                    params: { passingSchemas: passing0 },
                    message: 'must match exactly one schema in oneOf',
                  };
                  if (vErrors === null) {
                    vErrors = [err20];
                  } else {
                    vErrors.push(err20);
                  }
                  errors++;
                } else {
                  errors = _errs26;
                  if (vErrors !== null) {
                    if (_errs26) {
                      vErrors.length = _errs26;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
            } else {
              const err21 = {
                instancePath: instancePath + '/options',
                schemaPath: '#/selectCases/select/properties/options/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs16 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'markdown') {
        const _errs41 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.minimal !== undefined) {
            if (typeof data.minimal !== 'boolean') {
              const err22 = {
                instancePath: instancePath + '/minimal',
                schemaPath: '#/selectCases/markdown/properties/minimal/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          }
          if (data.buttons !== undefined) {
            let data14 = data.buttons;
            if (Array.isArray(data14)) {
              const len1 = data14.length;
              for (let i1 = 0; i1 < len1; i1++) {
                let data15 = data14[i1];
                if (typeof data15 !== 'string') {
                  const err23 = {
                    instancePath: instancePath + '/buttons/' + i1,
                    schemaPath: '#/selectCases/markdown/properties/buttons/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
                if (
                  !(
                    data15 === 'bold' ||
                    data15 === 'italic' ||
                    data15 === 'code' ||
                    data15 === 'link' ||
                    data15 === 'heading-one' ||
                    data15 === 'heading-two' ||
                    data15 === 'heading-three' ||
                    data15 === 'heading-four' ||
                    data15 === 'heading-five' ||
                    data15 === 'heading-six' ||
                    data15 === 'quote' ||
                    data15 === 'bulleted-list' ||
                    data15 === 'numbered-list'
                  )
                ) {
                  const err24 = {
                    instancePath: instancePath + '/buttons/' + i1,
                    schemaPath: '#/selectCases/markdown/properties/buttons/items/enum',
                    keyword: 'enum',
                    params: {
                      allowedValues: schema43.selectCases.markdown.properties.buttons.items.enum,
                    },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err24];
                  } else {
                    vErrors.push(err24);
                  }
                  errors++;
                }
              }
            } else {
              const err25 = {
                instancePath: instancePath + '/buttons',
                schemaPath: '#/selectCases/markdown/properties/buttons/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
          }
          if (data.editor_components !== undefined) {
            let data16 = data.editor_components;
            if (Array.isArray(data16)) {
              const len2 = data16.length;
              for (let i2 = 0; i2 < len2; i2++) {
                if (typeof data16[i2] !== 'string') {
                  const err26 = {
                    instancePath: instancePath + '/editor_components/' + i2,
                    schemaPath: '#/selectCases/markdown/properties/editor_components/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              }
            } else {
              const err27 = {
                instancePath: instancePath + '/editor_components',
                schemaPath: '#/selectCases/markdown/properties/editor_components/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err27];
              } else {
                vErrors.push(err27);
              }
              errors++;
            }
          }
          if (data.modes !== undefined) {
            let data18 = data.modes;
            if (Array.isArray(data18)) {
              if (data18.length < 1) {
                const err28 = {
                  instancePath: instancePath + '/modes',
                  schemaPath: '#/selectCases/markdown/properties/modes/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
              const len3 = data18.length;
              for (let i3 = 0; i3 < len3; i3++) {
                let data19 = data18[i3];
                if (typeof data19 !== 'string') {
                  const err29 = {
                    instancePath: instancePath + '/modes/' + i3,
                    schemaPath: '#/selectCases/markdown/properties/modes/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                }
                if (!(data19 === 'raw' || data19 === 'rich_text')) {
                  const err30 = {
                    instancePath: instancePath + '/modes/' + i3,
                    schemaPath: '#/selectCases/markdown/properties/modes/items/enum',
                    keyword: 'enum',
                    params: {
                      allowedValues: schema43.selectCases.markdown.properties.modes.items.enum,
                    },
                    message: 'must be equal to one of the allowed values',
                  };
                  if (vErrors === null) {
                    vErrors = [err30];
                  } else {
                    vErrors.push(err30);
                  }
                  errors++;
                }
              }
            } else {
              const err31 = {
                instancePath: instancePath + '/modes',
                schemaPath: '#/selectCases/markdown/properties/modes/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs41 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'list') {
        const _errs56 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.allow_add !== undefined) {
            if (typeof data.allow_add !== 'boolean') {
              const err32 = {
                instancePath: instancePath + '/allow_add',
                schemaPath: '#/selectCases/list/properties/allow_add/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
          }
          if (data.collapsed !== undefined) {
            if (typeof data.collapsed !== 'boolean') {
              const err33 = {
                instancePath: instancePath + '/collapsed',
                schemaPath: '#/selectCases/list/properties/collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
          }
          if (data.summary !== undefined) {
            if (typeof data.summary !== 'string') {
              const err34 = {
                instancePath: instancePath + '/summary',
                schemaPath: '#/selectCases/list/properties/summary/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
          }
          if (data.minimize_collapsed !== undefined) {
            if (typeof data.minimize_collapsed !== 'boolean') {
              const err35 = {
                instancePath: instancePath + '/minimize_collapsed',
                schemaPath: '#/selectCases/list/properties/minimize_collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          }
          if (data.label_singular !== undefined) {
            if (typeof data.label_singular !== 'string') {
              const err36 = {
                instancePath: instancePath + '/label_singular',
                schemaPath: '#/selectCases/list/properties/label_singular/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err36];
              } else {
                vErrors.push(err36);
              }
              errors++;
            }
          }
          if (data.i18n !== undefined) {
            if (typeof data.i18n !== 'boolean') {
              const err37 = {
                instancePath: instancePath + '/i18n',
                schemaPath: '#/selectCases/list/properties/i18n/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            if (!(typeof data.min == 'number')) {
              const err38 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/list/properties/min/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            if (!(typeof data.max == 'number')) {
              const err39 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/list/properties/max/type',
                keyword: 'type',
                params: { type: 'number' },
                message: 'must be number',
              };
              if (vErrors === null) {
                vErrors = [err39];
              } else {
                vErrors.push(err39);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs56 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'object') {
        const _errs73 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collapsed !== undefined) {
            if (typeof data.collapsed !== 'boolean') {
              const err40 = {
                instancePath: instancePath + '/collapsed',
                schemaPath: '#/selectCases/object/properties/collapsed/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err40];
              } else {
                vErrors.push(err40);
              }
              errors++;
            }
          }
          if (data.i18n !== undefined) {
            if (typeof data.i18n !== 'boolean') {
              const err41 = {
                instancePath: instancePath + '/i18n',
                schemaPath: '#/selectCases/object/properties/i18n/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs73 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'relation') {
        const _errs78 = errors;
        const _errs79 = errors;
        let valid19 = false;
        let passing2 = null;
        const _errs80 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection === undefined) {
            const err42 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'collection' },
              message: "must have required property '" + 'collection' + "'",
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
          if (data.value_field === undefined) {
            const err43 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'value_field' },
              message: "must have required property '" + 'value_field' + "'",
            };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
          if (data.search_fields === undefined) {
            const err44 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/0/required',
              keyword: 'required',
              params: { missingProperty: 'search_fields' },
              message: "must have required property '" + 'search_fields' + "'",
            };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        var _valid3 = _errs80 === errors;
        if (_valid3) {
          valid19 = true;
          passing2 = 0;
        }
        const _errs81 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection === undefined) {
            const err45 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'collection' },
              message: "must have required property '" + 'collection' + "'",
            };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
          if (data.valueField === undefined) {
            const err46 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'valueField' },
              message: "must have required property '" + 'valueField' + "'",
            };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
          if (data.searchFields === undefined) {
            const err47 = {
              instancePath,
              schemaPath: '#/selectCases/relation/oneOf/1/required',
              keyword: 'required',
              params: { missingProperty: 'searchFields' },
              message: "must have required property '" + 'searchFields' + "'",
            };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
        var _valid3 = _errs81 === errors;
        if (_valid3 && valid19) {
          valid19 = false;
          passing2 = [passing2, 1];
        } else {
          if (_valid3) {
            valid19 = true;
            passing2 = 1;
          }
        }
        if (!valid19) {
          const err48 = {
            instancePath,
            schemaPath: '#/selectCases/relation/oneOf',
            keyword: 'oneOf',
            params: { passingSchemas: passing2 },
            message: 'must match exactly one schema in oneOf',
          };
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        } else {
          errors = _errs79;
          if (vErrors !== null) {
            if (_errs79) {
              vErrors.length = _errs79;
            } else {
              vErrors = null;
            }
          }
        }
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.collection !== undefined) {
            if (typeof data.collection !== 'string') {
              const err49 = {
                instancePath: instancePath + '/collection',
                schemaPath: '#/selectCases/relation/properties/collection/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            }
          }
          if (data.value_field !== undefined) {
            if (typeof data.value_field !== 'string') {
              const err50 = {
                instancePath: instancePath + '/value_field',
                schemaPath: '#/selectCases/relation/properties/value_field/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
          }
          if (data.search_fields !== undefined) {
            let data32 = data.search_fields;
            if (Array.isArray(data32)) {
              if (data32.length < 1) {
                const err51 = {
                  instancePath: instancePath + '/search_fields',
                  schemaPath: '#/selectCases/relation/properties/search_fields/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err51];
                } else {
                  vErrors.push(err51);
                }
                errors++;
              }
              const len4 = data32.length;
              for (let i4 = 0; i4 < len4; i4++) {
                if (typeof data32[i4] !== 'string') {
                  const err52 = {
                    instancePath: instancePath + '/search_fields/' + i4,
                    schemaPath: '#/selectCases/relation/properties/search_fields/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err52];
                  } else {
                    vErrors.push(err52);
                  }
                  errors++;
                }
              }
            } else {
              const err53 = {
                instancePath: instancePath + '/search_fields',
                schemaPath: '#/selectCases/relation/properties/search_fields/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err53];
              } else {
                vErrors.push(err53);
              }
              errors++;
            }
          }
          if (data.file !== undefined) {
            if (typeof data.file !== 'string') {
              const err54 = {
                instancePath: instancePath + '/file',
                schemaPath: '#/selectCases/relation/properties/file/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err54];
              } else {
                vErrors.push(err54);
              }
              errors++;
            }
          }
          if (data.multiple !== undefined) {
            if (typeof data.multiple !== 'boolean') {
              const err55 = {
                instancePath: instancePath + '/multiple',
                schemaPath: '#/selectCases/relation/properties/multiple/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err55];
              } else {
                vErrors.push(err55);
              }
              errors++;
            }
          }
          if (data.min !== undefined) {
            let data36 = data.min;
            if (!(typeof data36 == 'number' && !(data36 % 1) && !isNaN(data36))) {
              const err56 = {
                instancePath: instancePath + '/min',
                schemaPath: '#/selectCases/relation/properties/min/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err56];
              } else {
                vErrors.push(err56);
              }
              errors++;
            }
          }
          if (data.max !== undefined) {
            let data37 = data.max;
            if (!(typeof data37 == 'number' && !(data37 % 1) && !isNaN(data37))) {
              const err57 = {
                instancePath: instancePath + '/max',
                schemaPath: '#/selectCases/relation/properties/max/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err57];
              } else {
                vErrors.push(err57);
              }
              errors++;
            }
          }
          if (data.display_fields !== undefined) {
            let data38 = data.display_fields;
            if (Array.isArray(data38)) {
              if (data38.length < 1) {
                const err58 = {
                  instancePath: instancePath + '/display_fields',
                  schemaPath: '#/selectCases/relation/properties/display_fields/minItems',
                  keyword: 'minItems',
                  params: { limit: 1 },
                  message: 'must NOT have fewer than 1 items',
                };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              }
              const len5 = data38.length;
              for (let i5 = 0; i5 < len5; i5++) {
                if (typeof data38[i5] !== 'string') {
                  const err59 = {
                    instancePath: instancePath + '/display_fields/' + i5,
                    schemaPath: '#/selectCases/relation/properties/display_fields/items/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err59];
                  } else {
                    vErrors.push(err59);
                  }
                  errors++;
                }
              }
            } else {
              const err60 = {
                instancePath: instancePath + '/display_fields',
                schemaPath: '#/selectCases/relation/properties/display_fields/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              };
              if (vErrors === null) {
                vErrors = [err60];
              } else {
                vErrors.push(err60);
              }
              errors++;
            }
          }
          if (data.options_length !== undefined) {
            let data40 = data.options_length;
            if (!(typeof data40 == 'number' && !(data40 % 1) && !isNaN(data40))) {
              const err61 = {
                instancePath: instancePath + '/options_length',
                schemaPath: '#/selectCases/relation/properties/options_length/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err61];
              } else {
                vErrors.push(err61);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs78 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'boolean') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'map') {
        const _errs104 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.decimals !== undefined) {
            let data41 = data.decimals;
            if (!(typeof data41 == 'number' && !(data41 % 1) && !isNaN(data41))) {
              const err62 = {
                instancePath: instancePath + '/decimals',
                schemaPath: '#/selectCases/map/properties/decimals/type',
                keyword: 'type',
                params: { type: 'integer' },
                message: 'must be integer',
              };
              if (vErrors === null) {
                vErrors = [err62];
              } else {
                vErrors.push(err62);
              }
              errors++;
            }
          }
          if (data.type !== undefined) {
            let data42 = data.type;
            if (typeof data42 !== 'string') {
              const err63 = {
                instancePath: instancePath + '/type',
                schemaPath: '#/selectCases/map/properties/type/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
            if (!(data42 === 'Point' || data42 === 'LineString' || data42 === 'Polygon')) {
              const err64 = {
                instancePath: instancePath + '/type',
                schemaPath: '#/selectCases/map/properties/type/enum',
                keyword: 'enum',
                params: { allowedValues: schema43.selectCases.map.properties.type.enum },
                message: 'must be equal to one of the allowed values',
              };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs104 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'date') {
        var _valid0 = true;
        valid0 = _valid0;
      } else if ('' + value0 == 'datetime') {
        const _errs109 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.format !== undefined) {
            if (typeof data.format !== 'string') {
              const err65 = {
                instancePath: instancePath + '/format',
                schemaPath: '#/selectCases/datetime/properties/format/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err65];
              } else {
                vErrors.push(err65);
              }
              errors++;
            }
          }
          if (data.date_format !== undefined) {
            let data44 = data.date_format;
            const _errs113 = errors;
            let valid27 = false;
            let passing3 = null;
            const _errs114 = errors;
            if (typeof data44 !== 'string') {
              const err66 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf/0/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
            var _valid4 = _errs114 === errors;
            if (_valid4) {
              valid27 = true;
              passing3 = 0;
            }
            const _errs116 = errors;
            if (typeof data44 !== 'boolean') {
              const err67 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf/1/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err67];
              } else {
                vErrors.push(err67);
              }
              errors++;
            }
            var _valid4 = _errs116 === errors;
            if (_valid4 && valid27) {
              valid27 = false;
              passing3 = [passing3, 1];
            } else {
              if (_valid4) {
                valid27 = true;
                passing3 = 1;
              }
            }
            if (!valid27) {
              const err68 = {
                instancePath: instancePath + '/date_format',
                schemaPath: '#/selectCases/datetime/properties/date_format/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing3 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err68];
              } else {
                vErrors.push(err68);
              }
              errors++;
            } else {
              errors = _errs113;
              if (vErrors !== null) {
                if (_errs113) {
                  vErrors.length = _errs113;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (data.time_format !== undefined) {
            let data45 = data.time_format;
            const _errs119 = errors;
            let valid28 = false;
            let passing4 = null;
            const _errs120 = errors;
            if (typeof data45 !== 'string') {
              const err69 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf/0/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err69];
              } else {
                vErrors.push(err69);
              }
              errors++;
            }
            var _valid5 = _errs120 === errors;
            if (_valid5) {
              valid28 = true;
              passing4 = 0;
            }
            const _errs122 = errors;
            if (typeof data45 !== 'boolean') {
              const err70 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf/1/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err70];
              } else {
                vErrors.push(err70);
              }
              errors++;
            }
            var _valid5 = _errs122 === errors;
            if (_valid5 && valid28) {
              valid28 = false;
              passing4 = [passing4, 1];
            } else {
              if (_valid5) {
                valid28 = true;
                passing4 = 1;
              }
            }
            if (!valid28) {
              const err71 = {
                instancePath: instancePath + '/time_format',
                schemaPath: '#/selectCases/datetime/properties/time_format/oneOf',
                keyword: 'oneOf',
                params: { passingSchemas: passing4 },
                message: 'must match exactly one schema in oneOf',
              };
              if (vErrors === null) {
                vErrors = [err71];
              } else {
                vErrors.push(err71);
              }
              errors++;
            } else {
              errors = _errs119;
              if (vErrors !== null) {
                if (_errs119) {
                  vErrors.length = _errs119;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (data.picker_utc !== undefined) {
            if (typeof data.picker_utc !== 'boolean') {
              const err72 = {
                instancePath: instancePath + '/picker_utc',
                schemaPath: '#/selectCases/datetime/properties/picker_utc/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err72];
              } else {
                vErrors.push(err72);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs109 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'code') {
        const _errs126 = errors;
        if (data && typeof data == 'object' && !Array.isArray(data)) {
          if (data.default_language !== undefined) {
            if (typeof data.default_language !== 'string') {
              const err73 = {
                instancePath: instancePath + '/default_language',
                schemaPath: '#/selectCases/code/properties/default_language/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              };
              if (vErrors === null) {
                vErrors = [err73];
              } else {
                vErrors.push(err73);
              }
              errors++;
            }
          }
          if (data.allow_language_selection !== undefined) {
            if (typeof data.allow_language_selection !== 'boolean') {
              const err74 = {
                instancePath: instancePath + '/allow_language_selection',
                schemaPath: '#/selectCases/code/properties/allow_language_selection/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err74];
              } else {
                vErrors.push(err74);
              }
              errors++;
            }
          }
          if (data.output_code_only !== undefined) {
            if (typeof data.output_code_only !== 'boolean') {
              const err75 = {
                instancePath: instancePath + '/output_code_only',
                schemaPath: '#/selectCases/code/properties/output_code_only/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              };
              if (vErrors === null) {
                vErrors = [err75];
              } else {
                vErrors.push(err75);
              }
              errors++;
            }
          }
          if (data.keys !== undefined) {
            let data50 = data.keys;
            if (data50 && typeof data50 == 'object' && !Array.isArray(data50)) {
              if (data50.code !== undefined) {
                if (typeof data50.code !== 'string') {
                  const err76 = {
                    instancePath: instancePath + '/keys/code',
                    schemaPath: '#/selectCases/code/properties/keys/properties/code/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err76];
                  } else {
                    vErrors.push(err76);
                  }
                  errors++;
                }
              }
              if (data50.lang !== undefined) {
                if (typeof data50.lang !== 'string') {
                  const err77 = {
                    instancePath: instancePath + '/keys/lang',
                    schemaPath: '#/selectCases/code/properties/keys/properties/lang/type',
                    keyword: 'type',
                    params: { type: 'string' },
                    message: 'must be string',
                  };
                  if (vErrors === null) {
                    vErrors = [err77];
                  } else {
                    vErrors.push(err77);
                  }
                  errors++;
                }
              }
            } else {
              const err78 = {
                instancePath: instancePath + '/keys',
                schemaPath: '#/selectCases/code/properties/keys/type',
                keyword: 'type',
                params: { type: 'object' },
                message: 'must be object',
              };
              if (vErrors === null) {
                vErrors = [err78];
              } else {
                vErrors.push(err78);
              }
              errors++;
            }
          }
        }
        var _valid0 = _errs126 === errors;
        valid0 = _valid0;
      } else if ('' + value0 == 'color') {
        var _valid0 = true;
        valid0 = _valid0;
      }
      if (!valid0) {
        const err79 = {
          instancePath,
          schemaPath: '#/select',
          keyword: 'select',
          params: { failingCase: 'color' },
          message: 'should match case "color" schema',
        };
        if (vErrors === null) {
          vErrors = [err79];
        } else {
          vErrors.push(err79);
        }
        errors++;
      }
    }
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err80 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'name' },
        message: "must have required property '" + 'name' + "'",
      };
      if (vErrors === null) {
        vErrors = [err80];
      } else {
        vErrors.push(err80);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err81 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err81];
        } else {
          vErrors.push(err81);
        }
        errors++;
      }
    }
    if (data.label !== undefined) {
      if (typeof data.label !== 'string') {
        const err82 = {
          instancePath: instancePath + '/label',
          schemaPath: '#/properties/label/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
    }
    if (data.widget !== undefined) {
      if (typeof data.widget !== 'string') {
        const err83 = {
          instancePath: instancePath + '/widget',
          schemaPath: '#/properties/widget/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      }
    }
    if (data.required !== undefined) {
      if (typeof data.required !== 'boolean') {
        const err84 = {
          instancePath: instancePath + '/required',
          schemaPath: '#/properties/required/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err84];
        } else {
          vErrors.push(err84);
        }
        errors++;
      }
    }
    if (data.i18n !== undefined) {
      let data57 = data.i18n;
      const _errs149 = errors;
      let valid32 = false;
      let passing5 = null;
      const _errs150 = errors;
      if (typeof data57 !== 'boolean') {
        const err85 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/0/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err85];
        } else {
          vErrors.push(err85);
        }
        errors++;
      }
      var _valid6 = _errs150 === errors;
      if (_valid6) {
        valid32 = true;
        passing5 = 0;
      }
      const _errs152 = errors;
      if (typeof data57 !== 'string') {
        const err86 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/1/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err86];
        } else {
          vErrors.push(err86);
        }
        errors++;
      }
      if (!(data57 === 'translate' || data57 === 'duplicate' || data57 === 'none')) {
        const err87 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf/1/enum',
          keyword: 'enum',
          params: { allowedValues: schema43.properties.i18n.oneOf[1].enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err87];
        } else {
          vErrors.push(err87);
        }
        errors++;
      }
      var _valid6 = _errs152 === errors;
      if (_valid6 && valid32) {
        valid32 = false;
        passing5 = [passing5, 1];
      } else {
        if (_valid6) {
          valid32 = true;
          passing5 = 1;
        }
      }
      if (!valid32) {
        const err88 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: passing5 },
          message: 'must match exactly one schema in oneOf',
        };
        if (vErrors === null) {
          vErrors = [err88];
        } else {
          vErrors.push(err88);
        }
        errors++;
      } else {
        errors = _errs149;
        if (vErrors !== null) {
          if (_errs149) {
            vErrors.length = _errs149;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.hint !== undefined) {
      if (typeof data.hint !== 'string') {
        const err89 = {
          instancePath: instancePath + '/hint',
          schemaPath: '#/properties/hint/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err89];
        } else {
          vErrors.push(err89);
        }
        errors++;
      }
    }
    if (data.pattern !== undefined) {
      let data59 = data.pattern;
      if (Array.isArray(data59)) {
        if (data59.length < 2) {
          const err90 = {
            instancePath: instancePath + '/pattern',
            schemaPath: '#/properties/pattern/minItems',
            keyword: 'minItems',
            params: { limit: 2 },
            message: 'must NOT have fewer than 2 items',
          };
          if (vErrors === null) {
            vErrors = [err90];
          } else {
            vErrors.push(err90);
          }
          errors++;
        }
        const len6 = data59.length;
        if (len6 > 0) {
          let data60 = data59[0];
          const _errs159 = errors;
          let valid34 = false;
          let passing6 = null;
          const _errs160 = errors;
          if (typeof data60 !== 'string') {
            const err91 = {
              instancePath: instancePath + '/pattern/0',
              schemaPath: '#/properties/pattern/items/0/oneOf/0/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err91];
            } else {
              vErrors.push(err91);
            }
            errors++;
          }
          var _valid7 = _errs160 === errors;
          if (_valid7) {
            valid34 = true;
            passing6 = 0;
          }
          const _errs162 = errors;
          if (typeof data60 == 'number') {
            if (!(data60 instanceof RegExp)) {
              const err92 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err92];
              } else {
                vErrors.push(err92);
              }
              errors++;
            }
          }
          if (typeof data60 === 'string') {
            if (!(data60 instanceof RegExp)) {
              const err93 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err93];
              } else {
                vErrors.push(err93);
              }
              errors++;
            }
          }
          if (Array.isArray(data60)) {
            if (!(data60 instanceof RegExp)) {
              const err94 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err94];
              } else {
                vErrors.push(err94);
              }
              errors++;
            }
          }
          if (data60 && typeof data60 == 'object' && !Array.isArray(data60)) {
            if (!(data60 instanceof RegExp)) {
              const err95 = {
                instancePath: instancePath + '/pattern/0',
                schemaPath: '#/properties/pattern/items/0/oneOf/1/instanceof',
                keyword: 'instanceof',
                params: {},
                message: 'must pass "instanceof" keyword validation',
              };
              if (vErrors === null) {
                vErrors = [err95];
              } else {
                vErrors.push(err95);
              }
              errors++;
            }
          }
          var _valid7 = _errs162 === errors;
          if (_valid7 && valid34) {
            valid34 = false;
            passing6 = [passing6, 1];
          } else {
            if (_valid7) {
              valid34 = true;
              passing6 = 1;
            }
          }
          if (!valid34) {
            const err96 = {
              instancePath: instancePath + '/pattern/0',
              schemaPath: '#/properties/pattern/items/0/oneOf',
              keyword: 'oneOf',
              params: { passingSchemas: passing6 },
              message: 'must match exactly one schema in oneOf',
            };
            if (vErrors === null) {
              vErrors = [err96];
            } else {
              vErrors.push(err96);
            }
            errors++;
          } else {
            errors = _errs159;
            if (vErrors !== null) {
              if (_errs159) {
                vErrors.length = _errs159;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (len6 > 1) {
          if (typeof data59[1] !== 'string') {
            const err97 = {
              instancePath: instancePath + '/pattern/1',
              schemaPath: '#/properties/pattern/items/1/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err97];
            } else {
              vErrors.push(err97);
            }
            errors++;
          }
        }
      } else {
        const err98 = {
          instancePath: instancePath + '/pattern',
          schemaPath: '#/properties/pattern/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err98];
        } else {
          vErrors.push(err98);
        }
        errors++;
      }
    }
    if (data.field !== undefined) {
      if (
        !wrapper4.validate(data.field, {
          instancePath: instancePath + '/field',
          parentData: data,
          parentDataProperty: 'field',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null ? wrapper4.validate.errors : vErrors.concat(wrapper4.validate.errors);
        errors = vErrors.length;
      }
    }
    if (data.fields !== undefined) {
      if (
        !validate33(data.fields, {
          instancePath: instancePath + '/fields',
          parentData: data,
          parentDataProperty: 'fields',
          rootData,
        })
      ) {
        vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
        errors = vErrors.length;
      }
    }
    if (data.types !== undefined) {
      if (
        !validate33(data.types, {
          instancePath: instancePath + '/types',
          parentData: data,
          parentDataProperty: 'types',
          rootData,
        })
      ) {
        vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err99 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err99];
    } else {
      vErrors.push(err99);
    }
    errors++;
  }
  validate32.errors = vErrors;
  return errors === 0;
}
function validate24(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="https://netlify-cms/object.json" */ let vErrors = null;
  let errors = 0;
  const _errs1 = errors;
  let valid0 = false;
  const _errs2 = errors;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.media_folder === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/anyOf/0/required',
        keyword: 'required',
        params: { missingProperty: 'media_folder' },
        message: "must have required property '" + 'media_folder' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  }
  var _valid0 = _errs2 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs3 = errors;
    if (data && typeof data == 'object' && !Array.isArray(data)) {
      if (data.media_library === undefined) {
        const err1 = {
          instancePath,
          schemaPath: '#/anyOf/1/required',
          keyword: 'required',
          params: { missingProperty: 'media_library' },
          message: "must have required property '" + 'media_library' + "'",
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    var _valid0 = _errs3 === errors;
    valid0 = valid0 || _valid0;
  }
  if (!valid0) {
    const err2 = {
      instancePath,
      schemaPath: '#/anyOf',
      keyword: 'anyOf',
      params: {},
      message: 'must match a schema in anyOf',
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  } else {
    errors = _errs1;
    if (vErrors !== null) {
      if (_errs1) {
        vErrors.length = _errs1;
      } else {
        vErrors = null;
      }
    }
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.backend === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'backend' },
        message: "must have required property '" + 'backend' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.collections === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'collections' },
        message: "must have required property '" + 'collections' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.backend !== undefined) {
      let data0 = data.backend;
      if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
        if (data0.name === undefined) {
          const err5 = {
            instancePath: instancePath + '/backend',
            schemaPath: '#/properties/backend/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data0.name !== undefined) {
          if (typeof data0.name !== 'string') {
            const err6 = {
              instancePath: instancePath + '/backend/name',
              schemaPath: '#/properties/backend/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data0.auth_scope !== undefined) {
          let data2 = data0.auth_scope;
          if (typeof data2 !== 'string') {
            const err7 = {
              instancePath: instancePath + '/backend/auth_scope',
              schemaPath: '#/properties/backend/properties/auth_scope/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if (!(data2 === 'repo' || data2 === 'public_repo')) {
            const err8 = {
              instancePath: instancePath + '/backend/auth_scope',
              schemaPath: '#/properties/backend/properties/auth_scope/enum',
              keyword: 'enum',
              params: { allowedValues: schema40.properties.backend.properties.auth_scope.enum },
              message: 'must be equal to one of the allowed values',
            };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data0.cms_label_prefix !== undefined) {
          let data3 = data0.cms_label_prefix;
          if (typeof data3 === 'string') {
            if (func9(data3) < 1) {
              const err9 = {
                instancePath: instancePath + '/backend/cms_label_prefix',
                schemaPath: '#/properties/backend/properties/cms_label_prefix/minLength',
                keyword: 'minLength',
                params: { limit: 1 },
                message: 'must NOT have fewer than 1 characters',
              };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          } else {
            const err10 = {
              instancePath: instancePath + '/backend/cms_label_prefix',
              schemaPath: '#/properties/backend/properties/cms_label_prefix/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data0.open_authoring !== undefined) {
          if (typeof data0.open_authoring !== 'boolean') {
            const err11 = {
              instancePath: instancePath + '/backend/open_authoring',
              schemaPath: '#/properties/backend/properties/open_authoring/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
      } else {
        const err12 = {
          instancePath: instancePath + '/backend',
          schemaPath: '#/properties/backend/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.local_backend !== undefined) {
      let data5 = data.local_backend;
      const _errs15 = errors;
      let valid3 = false;
      let passing0 = null;
      const _errs16 = errors;
      if (typeof data5 !== 'boolean') {
        const err13 = {
          instancePath: instancePath + '/local_backend',
          schemaPath: '#/properties/local_backend/oneOf/0/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
      var _valid1 = _errs16 === errors;
      if (_valid1) {
        valid3 = true;
        passing0 = 0;
      }
      const _errs18 = errors;
      if (data5 && typeof data5 == 'object' && !Array.isArray(data5)) {
        for (const key0 in data5) {
          if (!(key0 === 'url' || key0 === 'allowed_hosts')) {
            const err14 = {
              instancePath: instancePath + '/local_backend',
              schemaPath: '#/properties/local_backend/oneOf/1/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key0 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data5.url !== undefined) {
          if (typeof data5.url !== 'string') {
            const err15 = {
              instancePath: instancePath + '/local_backend/url',
              schemaPath: '#/properties/local_backend/oneOf/1/properties/url/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data5.allowed_hosts !== undefined) {
          let data7 = data5.allowed_hosts;
          if (Array.isArray(data7)) {
            const len0 = data7.length;
            for (let i0 = 0; i0 < len0; i0++) {
              if (typeof data7[i0] !== 'string') {
                const err16 = {
                  instancePath: instancePath + '/local_backend/allowed_hosts/' + i0,
                  schemaPath:
                    '#/properties/local_backend/oneOf/1/properties/allowed_hosts/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
          } else {
            const err17 = {
              instancePath: instancePath + '/local_backend/allowed_hosts',
              schemaPath: '#/properties/local_backend/oneOf/1/properties/allowed_hosts/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
      } else {
        const err18 = {
          instancePath: instancePath + '/local_backend',
          schemaPath: '#/properties/local_backend/oneOf/1/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
      var _valid1 = _errs18 === errors;
      if (_valid1 && valid3) {
        valid3 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid1) {
          valid3 = true;
          passing0 = 1;
        }
      }
      if (!valid3) {
        const err19 = {
          instancePath: instancePath + '/local_backend',
          schemaPath: '#/properties/local_backend/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: passing0 },
          message: 'must match exactly one schema in oneOf',
        };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      } else {
        errors = _errs15;
        if (vErrors !== null) {
          if (_errs15) {
            vErrors.length = _errs15;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.locale !== undefined) {
      if (typeof data.locale !== 'string') {
        const err20 = {
          instancePath: instancePath + '/locale',
          schemaPath: '#/properties/locale/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.i18n !== undefined) {
      let data10 = data.i18n;
      if (data10 && typeof data10 == 'object' && !Array.isArray(data10)) {
        if (data10.structure === undefined) {
          const err21 = {
            instancePath: instancePath + '/i18n',
            schemaPath: '#/properties/i18n/required',
            keyword: 'required',
            params: { missingProperty: 'structure' },
            message: "must have required property '" + 'structure' + "'",
          };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        if (data10.locales === undefined) {
          const err22 = {
            instancePath: instancePath + '/i18n',
            schemaPath: '#/properties/i18n/required',
            keyword: 'required',
            params: { missingProperty: 'locales' },
            message: "must have required property '" + 'locales' + "'",
          };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (data10.structure !== undefined) {
          let data11 = data10.structure;
          if (typeof data11 !== 'string') {
            const err23 = {
              instancePath: instancePath + '/i18n/structure',
              schemaPath: '#/properties/i18n/properties/structure/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
          if (
            !(
              data11 === 'multiple_folders' ||
              data11 === 'multiple_files' ||
              data11 === 'single_file'
            )
          ) {
            const err24 = {
              instancePath: instancePath + '/i18n/structure',
              schemaPath: '#/properties/i18n/properties/structure/enum',
              keyword: 'enum',
              params: { allowedValues: schema40.properties.i18n.properties.structure.enum },
              message: 'must be equal to one of the allowed values',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
        if (data10.locales !== undefined) {
          let data12 = data10.locales;
          if (Array.isArray(data12)) {
            if (data12.length < 2) {
              const err25 = {
                instancePath: instancePath + '/i18n/locales',
                schemaPath: '#/properties/i18n/properties/locales/minItems',
                keyword: 'minItems',
                params: { limit: 2 },
                message: 'must NOT have fewer than 2 items',
              };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
            const len1 = data12.length;
            for (let i1 = 0; i1 < len1; i1++) {
              let data13 = data12[i1];
              if (typeof data13 === 'string') {
                if (func9(data13) > 10) {
                  const err26 = {
                    instancePath: instancePath + '/i18n/locales/' + i1,
                    schemaPath: '#/properties/i18n/properties/locales/items/maxLength',
                    keyword: 'maxLength',
                    params: { limit: 10 },
                    message: 'must NOT have more than 10 characters',
                  };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
                if (func9(data13) < 2) {
                  const err27 = {
                    instancePath: instancePath + '/i18n/locales/' + i1,
                    schemaPath: '#/properties/i18n/properties/locales/items/minLength',
                    keyword: 'minLength',
                    params: { limit: 2 },
                    message: 'must NOT have fewer than 2 characters',
                  };
                  if (vErrors === null) {
                    vErrors = [err27];
                  } else {
                    vErrors.push(err27);
                  }
                  errors++;
                }
                if (!pattern0.test(data13)) {
                  const err28 = {
                    instancePath: instancePath + '/i18n/locales/' + i1,
                    schemaPath: '#/properties/i18n/properties/locales/items/pattern',
                    keyword: 'pattern',
                    params: { pattern: '^[a-zA-Z-_]+$' },
                    message: 'must match pattern "' + '^[a-zA-Z-_]+$' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
              } else {
                const err29 = {
                  instancePath: instancePath + '/i18n/locales/' + i1,
                  schemaPath: '#/properties/i18n/properties/locales/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            let i2 = data12.length;
            let j0;
            if (i2 > 1) {
              const indices0 = {};
              for (; i2--; ) {
                let item0 = data12[i2];
                if (typeof item0 !== 'string') {
                  continue;
                }
                if (typeof indices0[item0] == 'number') {
                  j0 = indices0[item0];
                  const err30 = {
                    instancePath: instancePath + '/i18n/locales',
                    schemaPath: '#/properties/i18n/properties/locales/uniqueItems',
                    keyword: 'uniqueItems',
                    params: { i: i2, j: j0 },
                    message:
                      'must NOT have duplicate items (items ## ' +
                      j0 +
                      ' and ' +
                      i2 +
                      ' are identical)',
                  };
                  if (vErrors === null) {
                    vErrors = [err30];
                  } else {
                    vErrors.push(err30);
                  }
                  errors++;
                  break;
                }
                indices0[item0] = i2;
              }
            }
          } else {
            const err31 = {
              instancePath: instancePath + '/i18n/locales',
              schemaPath: '#/properties/i18n/properties/locales/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
        if (data10.default_locale !== undefined) {
          let data14 = data10.default_locale;
          if (typeof data14 === 'string') {
            if (func9(data14) > 10) {
              const err32 = {
                instancePath: instancePath + '/i18n/default_locale',
                schemaPath: '#/properties/i18n/properties/default_locale/maxLength',
                keyword: 'maxLength',
                params: { limit: 10 },
                message: 'must NOT have more than 10 characters',
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (func9(data14) < 2) {
              const err33 = {
                instancePath: instancePath + '/i18n/default_locale',
                schemaPath: '#/properties/i18n/properties/default_locale/minLength',
                keyword: 'minLength',
                params: { limit: 2 },
                message: 'must NOT have fewer than 2 characters',
              };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (!pattern0.test(data14)) {
              const err34 = {
                instancePath: instancePath + '/i18n/default_locale',
                schemaPath: '#/properties/i18n/properties/default_locale/pattern',
                keyword: 'pattern',
                params: { pattern: '^[a-zA-Z-_]+$' },
                message: 'must match pattern "' + '^[a-zA-Z-_]+$' + '"',
              };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
          } else {
            const err35 = {
              instancePath: instancePath + '/i18n/default_locale',
              schemaPath: '#/properties/i18n/properties/default_locale/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err35];
            } else {
              vErrors.push(err35);
            }
            errors++;
          }
        }
      } else {
        const err36 = {
          instancePath: instancePath + '/i18n',
          schemaPath: '#/properties/i18n/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.site_url !== undefined) {
      if (typeof data.site_url !== 'string') {
        const err37 = {
          instancePath: instancePath + '/site_url',
          schemaPath: '#/properties/site_url/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err37];
        } else {
          vErrors.push(err37);
        }
        errors++;
      }
    }
    if (data.display_url !== undefined) {
      if (typeof data.display_url !== 'string') {
        const err38 = {
          instancePath: instancePath + '/display_url',
          schemaPath: '#/properties/display_url/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
    if (data.logo_url !== undefined) {
      if (typeof data.logo_url !== 'string') {
        const err39 = {
          instancePath: instancePath + '/logo_url',
          schemaPath: '#/properties/logo_url/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.show_preview_links !== undefined) {
      if (typeof data.show_preview_links !== 'boolean') {
        const err40 = {
          instancePath: instancePath + '/show_preview_links',
          schemaPath: '#/properties/show_preview_links/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.media_folder !== undefined) {
      if (typeof data.media_folder !== 'string') {
        const err41 = {
          instancePath: instancePath + '/media_folder',
          schemaPath: '#/properties/media_folder/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err41];
        } else {
          vErrors.push(err41);
        }
        errors++;
      }
    }
    if (data.public_folder !== undefined) {
      if (typeof data.public_folder !== 'string') {
        const err42 = {
          instancePath: instancePath + '/public_folder',
          schemaPath: '#/properties/public_folder/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      }
    }
    if (data.media_folder_relative !== undefined) {
      if (typeof data.media_folder_relative !== 'boolean') {
        const err43 = {
          instancePath: instancePath + '/media_folder_relative',
          schemaPath: '#/properties/media_folder_relative/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err43];
        } else {
          vErrors.push(err43);
        }
        errors++;
      }
    }
    if (data.media_library !== undefined) {
      let data22 = data.media_library;
      if (data22 && typeof data22 == 'object' && !Array.isArray(data22)) {
        if (data22.name === undefined) {
          const err44 = {
            instancePath: instancePath + '/media_library',
            schemaPath: '#/properties/media_library/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err44];
          } else {
            vErrors.push(err44);
          }
          errors++;
        }
        if (data22.name !== undefined) {
          if (typeof data22.name !== 'string') {
            const err45 = {
              instancePath: instancePath + '/media_library/name',
              schemaPath: '#/properties/media_library/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        }
        if (data22.config !== undefined) {
          let data24 = data22.config;
          if (!(data24 && typeof data24 == 'object' && !Array.isArray(data24))) {
            const err46 = {
              instancePath: instancePath + '/media_library/config',
              schemaPath: '#/properties/media_library/properties/config/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
        }
      } else {
        const err47 = {
          instancePath: instancePath + '/media_library',
          schemaPath: '#/properties/media_library/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err47];
        } else {
          vErrors.push(err47);
        }
        errors++;
      }
    }
    if (data.publish_mode !== undefined) {
      let data25 = data.publish_mode;
      if (typeof data25 !== 'string') {
        const err48 = {
          instancePath: instancePath + '/publish_mode',
          schemaPath: '#/properties/publish_mode/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err48];
        } else {
          vErrors.push(err48);
        }
        errors++;
      }
      if (!(data25 === 'simple' || data25 === 'editorial_workflow')) {
        const err49 = {
          instancePath: instancePath + '/publish_mode',
          schemaPath: '#/properties/publish_mode/enum',
          keyword: 'enum',
          params: { allowedValues: schema40.properties.publish_mode.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    if (data.slug !== undefined) {
      let data26 = data.slug;
      if (data26 && typeof data26 == 'object' && !Array.isArray(data26)) {
        if (data26.encoding !== undefined) {
          let data27 = data26.encoding;
          if (typeof data27 !== 'string') {
            const err50 = {
              instancePath: instancePath + '/slug/encoding',
              schemaPath: '#/properties/slug/properties/encoding/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err50];
            } else {
              vErrors.push(err50);
            }
            errors++;
          }
          if (!(data27 === 'unicode' || data27 === 'ascii')) {
            const err51 = {
              instancePath: instancePath + '/slug/encoding',
              schemaPath: '#/properties/slug/properties/encoding/enum',
              keyword: 'enum',
              params: { allowedValues: schema40.properties.slug.properties.encoding.enum },
              message: 'must be equal to one of the allowed values',
            };
            if (vErrors === null) {
              vErrors = [err51];
            } else {
              vErrors.push(err51);
            }
            errors++;
          }
        }
        if (data26.clean_accents !== undefined) {
          if (typeof data26.clean_accents !== 'boolean') {
            const err52 = {
              instancePath: instancePath + '/slug/clean_accents',
              schemaPath: '#/properties/slug/properties/clean_accents/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err52];
            } else {
              vErrors.push(err52);
            }
            errors++;
          }
        }
      } else {
        const err53 = {
          instancePath: instancePath + '/slug',
          schemaPath: '#/properties/slug/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err53];
        } else {
          vErrors.push(err53);
        }
        errors++;
      }
    }
    if (data.collections !== undefined) {
      let data29 = data.collections;
      if (Array.isArray(data29)) {
        if (data29.length < 1) {
          const err54 = {
            instancePath: instancePath + '/collections',
            schemaPath: '#/properties/collections/minItems',
            keyword: 'minItems',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 items',
          };
          if (vErrors === null) {
            vErrors = [err54];
          } else {
            vErrors.push(err54);
          }
          errors++;
        }
        const len2 = data29.length;
        for (let i3 = 0; i3 < len2; i3++) {
          let data30 = data29[i3];
          const _errs71 = errors;
          const _errs72 = errors;
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            let missing0;
            if (
              (data30.sortable_fields === undefined && (missing0 = 'sortable_fields')) ||
              (data30.sortableFields === undefined && (missing0 = 'sortableFields'))
            ) {
              const err55 = {};
              if (vErrors === null) {
                vErrors = [err55];
              } else {
                vErrors.push(err55);
              }
              errors++;
            }
          }
          var valid15 = _errs72 === errors;
          if (valid15) {
            const err56 = {
              instancePath: instancePath + '/collections/' + i3,
              schemaPath: '#/properties/collections/items/not',
              keyword: 'not',
              params: {},
              message: 'must NOT be valid',
            };
            if (vErrors === null) {
              vErrors = [err56];
            } else {
              vErrors.push(err56);
            }
            errors++;
          } else {
            errors = _errs71;
            if (vErrors !== null) {
              if (_errs71) {
                vErrors.length = _errs71;
              } else {
                vErrors = null;
              }
            }
          }
          const _errs73 = errors;
          let valid16 = false;
          let passing1 = null;
          const _errs74 = errors;
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            if (data30.files === undefined) {
              const err57 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/oneOf/0/required',
                keyword: 'required',
                params: { missingProperty: 'files' },
                message: "must have required property '" + 'files' + "'",
              };
              if (vErrors === null) {
                vErrors = [err57];
              } else {
                vErrors.push(err57);
              }
              errors++;
            }
          }
          var _valid2 = _errs74 === errors;
          if (_valid2) {
            valid16 = true;
            passing1 = 0;
          }
          const _errs75 = errors;
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            if (data30.folder === undefined) {
              const err58 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/oneOf/1/required',
                keyword: 'required',
                params: { missingProperty: 'folder' },
                message: "must have required property '" + 'folder' + "'",
              };
              if (vErrors === null) {
                vErrors = [err58];
              } else {
                vErrors.push(err58);
              }
              errors++;
            }
            if (data30.fields === undefined) {
              const err59 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/oneOf/1/required',
                keyword: 'required',
                params: { missingProperty: 'fields' },
                message: "must have required property '" + 'fields' + "'",
              };
              if (vErrors === null) {
                vErrors = [err59];
              } else {
                vErrors.push(err59);
              }
              errors++;
            }
          }
          var _valid2 = _errs75 === errors;
          if (_valid2 && valid16) {
            valid16 = false;
            passing1 = [passing1, 1];
          } else {
            if (_valid2) {
              valid16 = true;
              passing1 = 1;
            }
          }
          if (!valid16) {
            const err60 = {
              instancePath: instancePath + '/collections/' + i3,
              schemaPath: '#/properties/collections/items/oneOf',
              keyword: 'oneOf',
              params: { passingSchemas: passing1 },
              message: 'must match exactly one schema in oneOf',
            };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          } else {
            errors = _errs73;
            if (vErrors !== null) {
              if (_errs73) {
                vErrors.length = _errs73;
              } else {
                vErrors = null;
              }
            }
          }
          const _errs76 = errors;
          let valid17 = true;
          const _errs77 = errors;
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            let missing1;
            if (data30.extension === undefined && (missing1 = 'extension')) {
              const err61 = {};
              if (vErrors === null) {
                vErrors = [err61];
              } else {
                vErrors.push(err61);
              }
              errors++;
            }
          }
          var _valid3 = _errs77 === errors;
          errors = _errs76;
          if (vErrors !== null) {
            if (_errs76) {
              vErrors.length = _errs76;
            } else {
              vErrors = null;
            }
          }
          if (_valid3) {
            const _errs78 = errors;
            const _errs79 = errors;
            let valid18 = true;
            const _errs80 = errors;
            if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
              if (data30.extension !== undefined) {
                let data31 = data30.extension;
                if (
                  !(
                    data31 === 'yml' ||
                    data31 === 'yaml' ||
                    data31 === 'toml' ||
                    data31 === 'json' ||
                    data31 === 'md' ||
                    data31 === 'markdown' ||
                    data31 === 'html'
                  )
                ) {
                  const err62 = {};
                  if (vErrors === null) {
                    vErrors = [err62];
                  } else {
                    vErrors.push(err62);
                  }
                  errors++;
                }
              }
            }
            var _valid4 = _errs80 === errors;
            errors = _errs79;
            if (vErrors !== null) {
              if (_errs79) {
                vErrors.length = _errs79;
              } else {
                vErrors = null;
              }
            }
            if (!_valid4) {
              const _errs82 = errors;
              if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
                if (data30.format === undefined) {
                  const err63 = {
                    instancePath: instancePath + '/collections/' + i3,
                    schemaPath: '#/properties/collections/items/then/else/required',
                    keyword: 'required',
                    params: { missingProperty: 'format' },
                    message: "must have required property '" + 'format' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err63];
                  } else {
                    vErrors.push(err63);
                  }
                  errors++;
                }
              }
              var _valid4 = _errs82 === errors;
              valid18 = _valid4;
            }
            if (!valid18) {
              const err64 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/then/if',
                keyword: 'if',
                params: { failingKeyword: 'else' },
                message: 'must match "else" schema',
              };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
            var _valid3 = _errs78 === errors;
            valid17 = _valid3;
          }
          if (!valid17) {
            const err65 = {
              instancePath: instancePath + '/collections/' + i3,
              schemaPath: '#/properties/collections/items/if',
              keyword: 'if',
              params: { failingKeyword: 'then' },
              message: 'must match "then" schema',
            };
            if (vErrors === null) {
              vErrors = [err65];
            } else {
              vErrors.push(err65);
            }
            errors++;
          }
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            if (data30.name === undefined) {
              const err66 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
            if (data30.label === undefined) {
              const err67 = {
                instancePath: instancePath + '/collections/' + i3,
                schemaPath: '#/properties/collections/items/required',
                keyword: 'required',
                params: { missingProperty: 'label' },
                message: "must have required property '" + 'label' + "'",
              };
              if (vErrors === null) {
                vErrors = [err67];
              } else {
                vErrors.push(err67);
              }
              errors++;
            }
            if (data30.frontmatter_delimiter !== undefined) {
              if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
                if (data30.format === undefined) {
                  const err68 = {
                    instancePath: instancePath + '/collections/' + i3,
                    schemaPath:
                      '#/properties/collections/items/dependencies/frontmatter_delimiter/required',
                    keyword: 'required',
                    params: { missingProperty: 'format' },
                    message: "must have required property '" + 'format' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err68];
                  } else {
                    vErrors.push(err68);
                  }
                  errors++;
                }
                if (data30.format !== undefined) {
                  let data32 = data30.format;
                  if (
                    !(
                      data32 === 'yaml-frontmatter' ||
                      data32 === 'toml-frontmatter' ||
                      data32 === 'json-frontmatter'
                    )
                  ) {
                    const err69 = {
                      instancePath: instancePath + '/collections/' + i3 + '/format',
                      schemaPath:
                        '#/properties/collections/items/dependencies/frontmatter_delimiter/properties/format/enum',
                      keyword: 'enum',
                      params: {
                        allowedValues:
                          schema40.properties.collections.items.dependencies.frontmatter_delimiter
                            .properties.format.enum,
                      },
                      message: 'must be equal to one of the allowed values',
                    };
                    if (vErrors === null) {
                      vErrors = [err69];
                    } else {
                      vErrors.push(err69);
                    }
                    errors++;
                  }
                }
              }
            }
            if (data30.name !== undefined) {
              if (typeof data30.name !== 'string') {
                const err70 = {
                  instancePath: instancePath + '/collections/' + i3 + '/name',
                  schemaPath: '#/properties/collections/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
            }
            if (data30.label !== undefined) {
              if (typeof data30.label !== 'string') {
                const err71 = {
                  instancePath: instancePath + '/collections/' + i3 + '/label',
                  schemaPath: '#/properties/collections/items/properties/label/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err71];
                } else {
                  vErrors.push(err71);
                }
                errors++;
              }
            }
            if (data30.label_singular !== undefined) {
              if (typeof data30.label_singular !== 'string') {
                const err72 = {
                  instancePath: instancePath + '/collections/' + i3 + '/label_singular',
                  schemaPath: '#/properties/collections/items/properties/label_singular/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err72];
                } else {
                  vErrors.push(err72);
                }
                errors++;
              }
            }
            if (data30.description !== undefined) {
              if (typeof data30.description !== 'string') {
                const err73 = {
                  instancePath: instancePath + '/collections/' + i3 + '/description',
                  schemaPath: '#/properties/collections/items/properties/description/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err73];
                } else {
                  vErrors.push(err73);
                }
                errors++;
              }
            }
            if (data30.folder !== undefined) {
              if (typeof data30.folder !== 'string') {
                const err74 = {
                  instancePath: instancePath + '/collections/' + i3 + '/folder',
                  schemaPath: '#/properties/collections/items/properties/folder/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err74];
                } else {
                  vErrors.push(err74);
                }
                errors++;
              }
            }
            if (data30.files !== undefined) {
              let data38 = data30.files;
              if (Array.isArray(data38)) {
                const len3 = data38.length;
                for (let i4 = 0; i4 < len3; i4++) {
                  let data39 = data38[i4];
                  if (data39 && typeof data39 == 'object' && !Array.isArray(data39)) {
                    if (data39.name === undefined) {
                      const err75 = {
                        instancePath: instancePath + '/collections/' + i3 + '/files/' + i4,
                        schemaPath:
                          '#/properties/collections/items/properties/files/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'name' },
                        message: "must have required property '" + 'name' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err75];
                      } else {
                        vErrors.push(err75);
                      }
                      errors++;
                    }
                    if (data39.label === undefined) {
                      const err76 = {
                        instancePath: instancePath + '/collections/' + i3 + '/files/' + i4,
                        schemaPath:
                          '#/properties/collections/items/properties/files/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err76];
                      } else {
                        vErrors.push(err76);
                      }
                      errors++;
                    }
                    if (data39.file === undefined) {
                      const err77 = {
                        instancePath: instancePath + '/collections/' + i3 + '/files/' + i4,
                        schemaPath:
                          '#/properties/collections/items/properties/files/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'file' },
                        message: "must have required property '" + 'file' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err77];
                      } else {
                        vErrors.push(err77);
                      }
                      errors++;
                    }
                    if (data39.fields === undefined) {
                      const err78 = {
                        instancePath: instancePath + '/collections/' + i3 + '/files/' + i4,
                        schemaPath:
                          '#/properties/collections/items/properties/files/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'fields' },
                        message: "must have required property '" + 'fields' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err78];
                      } else {
                        vErrors.push(err78);
                      }
                      errors++;
                    }
                    if (data39.name !== undefined) {
                      if (typeof data39.name !== 'string') {
                        const err79 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/name',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/name/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err79];
                        } else {
                          vErrors.push(err79);
                        }
                        errors++;
                      }
                    }
                    if (data39.label !== undefined) {
                      if (typeof data39.label !== 'string') {
                        const err80 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/label',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err80];
                        } else {
                          vErrors.push(err80);
                        }
                        errors++;
                      }
                    }
                    if (data39.label_singular !== undefined) {
                      if (typeof data39.label_singular !== 'string') {
                        const err81 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/files/' +
                            i4 +
                            '/label_singular',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/label_singular/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err81];
                        } else {
                          vErrors.push(err81);
                        }
                        errors++;
                      }
                    }
                    if (data39.description !== undefined) {
                      if (typeof data39.description !== 'string') {
                        const err82 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/description',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/description/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err82];
                        } else {
                          vErrors.push(err82);
                        }
                        errors++;
                      }
                    }
                    if (data39.file !== undefined) {
                      if (typeof data39.file !== 'string') {
                        const err83 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/file',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/file/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err83];
                        } else {
                          vErrors.push(err83);
                        }
                        errors++;
                      }
                    }
                    if (data39.preview_path !== undefined) {
                      if (typeof data39.preview_path !== 'string') {
                        const err84 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/preview_path',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/preview_path/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err84];
                        } else {
                          vErrors.push(err84);
                        }
                        errors++;
                      }
                    }
                    if (data39.preview_path_date_field !== undefined) {
                      if (typeof data39.preview_path_date_field !== 'string') {
                        const err85 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/files/' +
                            i4 +
                            '/preview_path_date_field',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/preview_path_date_field/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err85];
                        } else {
                          vErrors.push(err85);
                        }
                        errors++;
                      }
                    }
                    if (data39.fields !== undefined) {
                      let data47 = data39.fields;
                      if (Array.isArray(data47)) {
                        if (data47.length < 1) {
                          const err86 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/files/' + i4 + '/fields',
                            schemaPath:
                              '#/properties/collections/items/properties/files/items/properties/fields/minItems',
                            keyword: 'minItems',
                            params: { limit: 1 },
                            message: 'must NOT have fewer than 1 items',
                          };
                          if (vErrors === null) {
                            vErrors = [err86];
                          } else {
                            vErrors.push(err86);
                          }
                          errors++;
                        }
                        const len4 = data47.length;
                        for (let i5 = 0; i5 < len4; i5++) {
                          let data48 = data47[i5];
                          const vSchema6 = data48 && data48.widget;
                          if (!(vSchema6 === undefined)) {
                            if (
                              typeof vSchema6 !== 'string' &&
                              !(typeof vSchema6 == 'number') &&
                              typeof vSchema6 !== 'boolean' &&
                              vSchema6 !== null
                            ) {
                              const err87 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/files/' +
                                  i4 +
                                  '/fields/' +
                                  i5,
                                schemaPath:
                                  '#/properties/collections/items/properties/files/items/properties/fields/items/select',
                                keyword: 'select',
                                params: {},
                                message:
                                  '"select" keyword must be string,number,boolean,null ($data)',
                              };
                              if (vErrors === null) {
                                vErrors = [err87];
                              } else {
                                vErrors.push(err87);
                              }
                              errors++;
                            } else {
                              let valid28 = true;
                              const value0 = vSchema6 === null ? 'null' : vSchema6;
                              if ('' + value0 == 'unknown') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'string') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'number') {
                                const _errs117 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.step !== undefined) {
                                    if (!(typeof data48.step == 'number')) {
                                      const err88 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/step',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/number/properties/step/type',
                                        keyword: 'type',
                                        params: { type: 'number' },
                                        message: 'must be number',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err88];
                                      } else {
                                        vErrors.push(err88);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.value_type !== undefined) {
                                    if (typeof data48.value_type !== 'string') {
                                      const err89 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/value_type',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/number/properties/value_type/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err89];
                                      } else {
                                        vErrors.push(err89);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.min !== undefined) {
                                    if (!(typeof data48.min == 'number')) {
                                      const err90 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/min',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/number/properties/min/type',
                                        keyword: 'type',
                                        params: { type: 'number' },
                                        message: 'must be number',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err90];
                                      } else {
                                        vErrors.push(err90);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.max !== undefined) {
                                    if (!(typeof data48.max == 'number')) {
                                      const err91 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/max',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/number/properties/max/type',
                                        keyword: 'type',
                                        params: { type: 'number' },
                                        message: 'must be number',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err91];
                                      } else {
                                        vErrors.push(err91);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs117 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'text') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'image') {
                                const _errs126 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.allow_multiple !== undefined) {
                                    if (typeof data48.allow_multiple !== 'boolean') {
                                      const err92 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/allow_multiple',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/image/properties/allow_multiple/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err92];
                                      } else {
                                        vErrors.push(err92);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs126 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'file') {
                                const _errs129 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.allow_multiple !== undefined) {
                                    if (typeof data48.allow_multiple !== 'boolean') {
                                      const err93 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/allow_multiple',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/file/properties/allow_multiple/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err93];
                                      } else {
                                        vErrors.push(err93);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs129 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'select') {
                                const _errs132 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.options === undefined) {
                                    const err94 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'options' },
                                      message: "must have required property '" + 'options' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err94];
                                    } else {
                                      vErrors.push(err94);
                                    }
                                    errors++;
                                  }
                                  if (data48.multiple !== undefined) {
                                    if (typeof data48.multiple !== 'boolean') {
                                      const err95 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/multiple',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/multiple/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err95];
                                      } else {
                                        vErrors.push(err95);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.min !== undefined) {
                                    let data56 = data48.min;
                                    if (
                                      !(
                                        typeof data56 == 'number' &&
                                        !(data56 % 1) &&
                                        !isNaN(data56)
                                      )
                                    ) {
                                      const err96 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/min',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/min/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err96];
                                      } else {
                                        vErrors.push(err96);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.max !== undefined) {
                                    let data57 = data48.max;
                                    if (
                                      !(
                                        typeof data57 == 'number' &&
                                        !(data57 % 1) &&
                                        !isNaN(data57)
                                      )
                                    ) {
                                      const err97 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/max',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/max/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err97];
                                      } else {
                                        vErrors.push(err97);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.options !== undefined) {
                                    let data58 = data48.options;
                                    if (Array.isArray(data58)) {
                                      const len5 = data58.length;
                                      for (let i6 = 0; i6 < len5; i6++) {
                                        let data59 = data58[i6];
                                        const _errs142 = errors;
                                        let valid35 = false;
                                        let passing2 = null;
                                        const _errs143 = errors;
                                        if (typeof data59 !== 'string') {
                                          const err98 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/options/' +
                                              i6,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/0/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err98];
                                          } else {
                                            vErrors.push(err98);
                                          }
                                          errors++;
                                        }
                                        var _valid6 = _errs143 === errors;
                                        if (_valid6) {
                                          valid35 = true;
                                          passing2 = 0;
                                        }
                                        const _errs145 = errors;
                                        if (!(typeof data59 == 'number')) {
                                          const err99 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/options/' +
                                              i6,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/1/type',
                                            keyword: 'type',
                                            params: { type: 'number' },
                                            message: 'must be number',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err99];
                                          } else {
                                            vErrors.push(err99);
                                          }
                                          errors++;
                                        }
                                        var _valid6 = _errs145 === errors;
                                        if (_valid6 && valid35) {
                                          valid35 = false;
                                          passing2 = [passing2, 1];
                                        } else {
                                          if (_valid6) {
                                            valid35 = true;
                                            passing2 = 1;
                                          }
                                          const _errs147 = errors;
                                          if (
                                            data59 &&
                                            typeof data59 == 'object' &&
                                            !Array.isArray(data59)
                                          ) {
                                            if (data59.label === undefined) {
                                              const err100 = {
                                                instancePath:
                                                  instancePath +
                                                  '/collections/' +
                                                  i3 +
                                                  '/files/' +
                                                  i4 +
                                                  '/fields/' +
                                                  i5 +
                                                  '/options/' +
                                                  i6,
                                                schemaPath:
                                                  '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/required',
                                                keyword: 'required',
                                                params: { missingProperty: 'label' },
                                                message:
                                                  "must have required property '" + 'label' + "'",
                                              };
                                              if (vErrors === null) {
                                                vErrors = [err100];
                                              } else {
                                                vErrors.push(err100);
                                              }
                                              errors++;
                                            }
                                            if (data59.value === undefined) {
                                              const err101 = {
                                                instancePath:
                                                  instancePath +
                                                  '/collections/' +
                                                  i3 +
                                                  '/files/' +
                                                  i4 +
                                                  '/fields/' +
                                                  i5 +
                                                  '/options/' +
                                                  i6,
                                                schemaPath:
                                                  '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/required',
                                                keyword: 'required',
                                                params: { missingProperty: 'value' },
                                                message:
                                                  "must have required property '" + 'value' + "'",
                                              };
                                              if (vErrors === null) {
                                                vErrors = [err101];
                                              } else {
                                                vErrors.push(err101);
                                              }
                                              errors++;
                                            }
                                            if (data59.label !== undefined) {
                                              if (typeof data59.label !== 'string') {
                                                const err102 = {
                                                  instancePath:
                                                    instancePath +
                                                    '/collections/' +
                                                    i3 +
                                                    '/files/' +
                                                    i4 +
                                                    '/fields/' +
                                                    i5 +
                                                    '/options/' +
                                                    i6 +
                                                    '/label',
                                                  schemaPath:
                                                    '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                                                  keyword: 'type',
                                                  params: { type: 'string' },
                                                  message: 'must be string',
                                                };
                                                if (vErrors === null) {
                                                  vErrors = [err102];
                                                } else {
                                                  vErrors.push(err102);
                                                }
                                                errors++;
                                              }
                                            }
                                            if (data59.value !== undefined) {
                                              let data61 = data59.value;
                                              const _errs152 = errors;
                                              let valid37 = false;
                                              let passing3 = null;
                                              const _errs153 = errors;
                                              if (typeof data61 !== 'string') {
                                                const err103 = {
                                                  instancePath:
                                                    instancePath +
                                                    '/collections/' +
                                                    i3 +
                                                    '/files/' +
                                                    i4 +
                                                    '/fields/' +
                                                    i5 +
                                                    '/options/' +
                                                    i6 +
                                                    '/value',
                                                  schemaPath:
                                                    '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                                                  keyword: 'type',
                                                  params: { type: 'string' },
                                                  message: 'must be string',
                                                };
                                                if (vErrors === null) {
                                                  vErrors = [err103];
                                                } else {
                                                  vErrors.push(err103);
                                                }
                                                errors++;
                                              }
                                              var _valid7 = _errs153 === errors;
                                              if (_valid7) {
                                                valid37 = true;
                                                passing3 = 0;
                                              }
                                              const _errs155 = errors;
                                              if (!(typeof data61 == 'number')) {
                                                const err104 = {
                                                  instancePath:
                                                    instancePath +
                                                    '/collections/' +
                                                    i3 +
                                                    '/files/' +
                                                    i4 +
                                                    '/fields/' +
                                                    i5 +
                                                    '/options/' +
                                                    i6 +
                                                    '/value',
                                                  schemaPath:
                                                    '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                                                  keyword: 'type',
                                                  params: { type: 'number' },
                                                  message: 'must be number',
                                                };
                                                if (vErrors === null) {
                                                  vErrors = [err104];
                                                } else {
                                                  vErrors.push(err104);
                                                }
                                                errors++;
                                              }
                                              var _valid7 = _errs155 === errors;
                                              if (_valid7 && valid37) {
                                                valid37 = false;
                                                passing3 = [passing3, 1];
                                              } else {
                                                if (_valid7) {
                                                  valid37 = true;
                                                  passing3 = 1;
                                                }
                                              }
                                              if (!valid37) {
                                                const err105 = {
                                                  instancePath:
                                                    instancePath +
                                                    '/collections/' +
                                                    i3 +
                                                    '/files/' +
                                                    i4 +
                                                    '/fields/' +
                                                    i5 +
                                                    '/options/' +
                                                    i6 +
                                                    '/value',
                                                  schemaPath:
                                                    '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                                                  keyword: 'oneOf',
                                                  params: { passingSchemas: passing3 },
                                                  message: 'must match exactly one schema in oneOf',
                                                };
                                                if (vErrors === null) {
                                                  vErrors = [err105];
                                                } else {
                                                  vErrors.push(err105);
                                                }
                                                errors++;
                                              } else {
                                                errors = _errs152;
                                                if (vErrors !== null) {
                                                  if (_errs152) {
                                                    vErrors.length = _errs152;
                                                  } else {
                                                    vErrors = null;
                                                  }
                                                }
                                              }
                                            }
                                          } else {
                                            const err106 = {
                                              instancePath:
                                                instancePath +
                                                '/collections/' +
                                                i3 +
                                                '/files/' +
                                                i4 +
                                                '/fields/' +
                                                i5 +
                                                '/options/' +
                                                i6,
                                              schemaPath:
                                                '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/type',
                                              keyword: 'type',
                                              params: { type: 'object' },
                                              message: 'must be object',
                                            };
                                            if (vErrors === null) {
                                              vErrors = [err106];
                                            } else {
                                              vErrors.push(err106);
                                            }
                                            errors++;
                                          }
                                          var _valid6 = _errs147 === errors;
                                          if (_valid6 && valid35) {
                                            valid35 = false;
                                            passing2 = [passing2, 2];
                                          } else {
                                            if (_valid6) {
                                              valid35 = true;
                                              passing2 = 2;
                                            }
                                          }
                                        }
                                        if (!valid35) {
                                          const err107 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/options/' +
                                              i6,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/items/oneOf',
                                            keyword: 'oneOf',
                                            params: { passingSchemas: passing2 },
                                            message: 'must match exactly one schema in oneOf',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err107];
                                          } else {
                                            vErrors.push(err107);
                                          }
                                          errors++;
                                        } else {
                                          errors = _errs142;
                                          if (vErrors !== null) {
                                            if (_errs142) {
                                              vErrors.length = _errs142;
                                            } else {
                                              vErrors = null;
                                            }
                                          }
                                        }
                                      }
                                    } else {
                                      const err108 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/options',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/select/properties/options/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err108];
                                      } else {
                                        vErrors.push(err108);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs132 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'markdown') {
                                const _errs157 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.minimal !== undefined) {
                                    if (typeof data48.minimal !== 'boolean') {
                                      const err109 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/minimal',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/minimal/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err109];
                                      } else {
                                        vErrors.push(err109);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.buttons !== undefined) {
                                    let data63 = data48.buttons;
                                    if (Array.isArray(data63)) {
                                      const len6 = data63.length;
                                      for (let i7 = 0; i7 < len6; i7++) {
                                        let data64 = data63[i7];
                                        if (typeof data64 !== 'string') {
                                          const err110 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/buttons/' +
                                              i7,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/buttons/items/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err110];
                                          } else {
                                            vErrors.push(err110);
                                          }
                                          errors++;
                                        }
                                        if (
                                          !(
                                            data64 === 'bold' ||
                                            data64 === 'italic' ||
                                            data64 === 'code' ||
                                            data64 === 'link' ||
                                            data64 === 'heading-one' ||
                                            data64 === 'heading-two' ||
                                            data64 === 'heading-three' ||
                                            data64 === 'heading-four' ||
                                            data64 === 'heading-five' ||
                                            data64 === 'heading-six' ||
                                            data64 === 'quote' ||
                                            data64 === 'bulleted-list' ||
                                            data64 === 'numbered-list'
                                          )
                                        ) {
                                          const err111 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/buttons/' +
                                              i7,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/buttons/items/enum',
                                            keyword: 'enum',
                                            params: {
                                              allowedValues:
                                                schema40.properties.collections.items.properties
                                                  .files.items.properties.fields.items.selectCases
                                                  .markdown.properties.buttons.items.enum,
                                            },
                                            message: 'must be equal to one of the allowed values',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err111];
                                          } else {
                                            vErrors.push(err111);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err112 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/buttons',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/buttons/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err112];
                                      } else {
                                        vErrors.push(err112);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.editor_components !== undefined) {
                                    let data65 = data48.editor_components;
                                    if (Array.isArray(data65)) {
                                      const len7 = data65.length;
                                      for (let i8 = 0; i8 < len7; i8++) {
                                        if (typeof data65[i8] !== 'string') {
                                          const err113 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/editor_components/' +
                                              i8,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/editor_components/items/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err113];
                                          } else {
                                            vErrors.push(err113);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err114 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/editor_components',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/editor_components/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err114];
                                      } else {
                                        vErrors.push(err114);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.modes !== undefined) {
                                    let data67 = data48.modes;
                                    if (Array.isArray(data67)) {
                                      if (data67.length < 1) {
                                        const err115 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/files/' +
                                            i4 +
                                            '/fields/' +
                                            i5 +
                                            '/modes',
                                          schemaPath:
                                            '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/modes/minItems',
                                          keyword: 'minItems',
                                          params: { limit: 1 },
                                          message: 'must NOT have fewer than 1 items',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err115];
                                        } else {
                                          vErrors.push(err115);
                                        }
                                        errors++;
                                      }
                                      const len8 = data67.length;
                                      for (let i9 = 0; i9 < len8; i9++) {
                                        let data68 = data67[i9];
                                        if (typeof data68 !== 'string') {
                                          const err116 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/modes/' +
                                              i9,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/modes/items/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err116];
                                          } else {
                                            vErrors.push(err116);
                                          }
                                          errors++;
                                        }
                                        if (!(data68 === 'raw' || data68 === 'rich_text')) {
                                          const err117 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/modes/' +
                                              i9,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/modes/items/enum',
                                            keyword: 'enum',
                                            params: {
                                              allowedValues:
                                                schema40.properties.collections.items.properties
                                                  .files.items.properties.fields.items.selectCases
                                                  .markdown.properties.modes.items.enum,
                                            },
                                            message: 'must be equal to one of the allowed values',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err117];
                                          } else {
                                            vErrors.push(err117);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err118 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/modes',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/markdown/properties/modes/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err118];
                                      } else {
                                        vErrors.push(err118);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs157 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'list') {
                                const _errs172 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.allow_add !== undefined) {
                                    if (typeof data48.allow_add !== 'boolean') {
                                      const err119 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/allow_add',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/allow_add/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err119];
                                      } else {
                                        vErrors.push(err119);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.collapsed !== undefined) {
                                    if (typeof data48.collapsed !== 'boolean') {
                                      const err120 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/collapsed',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/collapsed/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err120];
                                      } else {
                                        vErrors.push(err120);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.summary !== undefined) {
                                    if (typeof data48.summary !== 'string') {
                                      const err121 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/summary',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/summary/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err121];
                                      } else {
                                        vErrors.push(err121);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.minimize_collapsed !== undefined) {
                                    if (typeof data48.minimize_collapsed !== 'boolean') {
                                      const err122 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/minimize_collapsed',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/minimize_collapsed/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err122];
                                      } else {
                                        vErrors.push(err122);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.label_singular !== undefined) {
                                    if (typeof data48.label_singular !== 'string') {
                                      const err123 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/label_singular',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/label_singular/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err123];
                                      } else {
                                        vErrors.push(err123);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.i18n !== undefined) {
                                    if (typeof data48.i18n !== 'boolean') {
                                      const err124 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/i18n',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/i18n/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err124];
                                      } else {
                                        vErrors.push(err124);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.min !== undefined) {
                                    if (!(typeof data48.min == 'number')) {
                                      const err125 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/min',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/min/type',
                                        keyword: 'type',
                                        params: { type: 'number' },
                                        message: 'must be number',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err125];
                                      } else {
                                        vErrors.push(err125);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.max !== undefined) {
                                    if (!(typeof data48.max == 'number')) {
                                      const err126 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/max',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/list/properties/max/type',
                                        keyword: 'type',
                                        params: { type: 'number' },
                                        message: 'must be number',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err126];
                                      } else {
                                        vErrors.push(err126);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs172 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'object') {
                                const _errs189 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.collapsed !== undefined) {
                                    if (typeof data48.collapsed !== 'boolean') {
                                      const err127 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/collapsed',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/object/properties/collapsed/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err127];
                                      } else {
                                        vErrors.push(err127);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.i18n !== undefined) {
                                    if (typeof data48.i18n !== 'boolean') {
                                      const err128 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/i18n',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/object/properties/i18n/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err128];
                                      } else {
                                        vErrors.push(err128);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs189 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'relation') {
                                const _errs194 = errors;
                                const _errs195 = errors;
                                let valid47 = false;
                                let passing4 = null;
                                const _errs196 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.collection === undefined) {
                                    const err129 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'collection' },
                                      message: "must have required property '" + 'collection' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err129];
                                    } else {
                                      vErrors.push(err129);
                                    }
                                    errors++;
                                  }
                                  if (data48.value_field === undefined) {
                                    const err130 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'value_field' },
                                      message:
                                        "must have required property '" + 'value_field' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err130];
                                    } else {
                                      vErrors.push(err130);
                                    }
                                    errors++;
                                  }
                                  if (data48.search_fields === undefined) {
                                    const err131 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'search_fields' },
                                      message:
                                        "must have required property '" + 'search_fields' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err131];
                                    } else {
                                      vErrors.push(err131);
                                    }
                                    errors++;
                                  }
                                }
                                var _valid8 = _errs196 === errors;
                                if (_valid8) {
                                  valid47 = true;
                                  passing4 = 0;
                                }
                                const _errs197 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.collection === undefined) {
                                    const err132 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'collection' },
                                      message: "must have required property '" + 'collection' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err132];
                                    } else {
                                      vErrors.push(err132);
                                    }
                                    errors++;
                                  }
                                  if (data48.valueField === undefined) {
                                    const err133 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'valueField' },
                                      message: "must have required property '" + 'valueField' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err133];
                                    } else {
                                      vErrors.push(err133);
                                    }
                                    errors++;
                                  }
                                  if (data48.searchFields === undefined) {
                                    const err134 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5,
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                                      keyword: 'required',
                                      params: { missingProperty: 'searchFields' },
                                      message:
                                        "must have required property '" + 'searchFields' + "'",
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err134];
                                    } else {
                                      vErrors.push(err134);
                                    }
                                    errors++;
                                  }
                                }
                                var _valid8 = _errs197 === errors;
                                if (_valid8 && valid47) {
                                  valid47 = false;
                                  passing4 = [passing4, 1];
                                } else {
                                  if (_valid8) {
                                    valid47 = true;
                                    passing4 = 1;
                                  }
                                }
                                if (!valid47) {
                                  const err135 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/files/' +
                                      i4 +
                                      '/fields/' +
                                      i5,
                                    schemaPath:
                                      '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/oneOf',
                                    keyword: 'oneOf',
                                    params: { passingSchemas: passing4 },
                                    message: 'must match exactly one schema in oneOf',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err135];
                                  } else {
                                    vErrors.push(err135);
                                  }
                                  errors++;
                                } else {
                                  errors = _errs195;
                                  if (vErrors !== null) {
                                    if (_errs195) {
                                      vErrors.length = _errs195;
                                    } else {
                                      vErrors = null;
                                    }
                                  }
                                }
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.collection !== undefined) {
                                    if (typeof data48.collection !== 'string') {
                                      const err136 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/collection',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/collection/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err136];
                                      } else {
                                        vErrors.push(err136);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.value_field !== undefined) {
                                    if (typeof data48.value_field !== 'string') {
                                      const err137 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/value_field',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/value_field/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err137];
                                      } else {
                                        vErrors.push(err137);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.search_fields !== undefined) {
                                    let data81 = data48.search_fields;
                                    if (Array.isArray(data81)) {
                                      if (data81.length < 1) {
                                        const err138 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/files/' +
                                            i4 +
                                            '/fields/' +
                                            i5 +
                                            '/search_fields',
                                          schemaPath:
                                            '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/search_fields/minItems',
                                          keyword: 'minItems',
                                          params: { limit: 1 },
                                          message: 'must NOT have fewer than 1 items',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err138];
                                        } else {
                                          vErrors.push(err138);
                                        }
                                        errors++;
                                      }
                                      const len9 = data81.length;
                                      for (let i10 = 0; i10 < len9; i10++) {
                                        if (typeof data81[i10] !== 'string') {
                                          const err139 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/search_fields/' +
                                              i10,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/search_fields/items/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err139];
                                          } else {
                                            vErrors.push(err139);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err140 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/search_fields',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/search_fields/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err140];
                                      } else {
                                        vErrors.push(err140);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.file !== undefined) {
                                    if (typeof data48.file !== 'string') {
                                      const err141 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/file',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/file/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err141];
                                      } else {
                                        vErrors.push(err141);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.multiple !== undefined) {
                                    if (typeof data48.multiple !== 'boolean') {
                                      const err142 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/multiple',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/multiple/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err142];
                                      } else {
                                        vErrors.push(err142);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.min !== undefined) {
                                    let data85 = data48.min;
                                    if (
                                      !(
                                        typeof data85 == 'number' &&
                                        !(data85 % 1) &&
                                        !isNaN(data85)
                                      )
                                    ) {
                                      const err143 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/min',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/min/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err143];
                                      } else {
                                        vErrors.push(err143);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.max !== undefined) {
                                    let data86 = data48.max;
                                    if (
                                      !(
                                        typeof data86 == 'number' &&
                                        !(data86 % 1) &&
                                        !isNaN(data86)
                                      )
                                    ) {
                                      const err144 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/max',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/max/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err144];
                                      } else {
                                        vErrors.push(err144);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.display_fields !== undefined) {
                                    let data87 = data48.display_fields;
                                    if (Array.isArray(data87)) {
                                      if (data87.length < 1) {
                                        const err145 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/files/' +
                                            i4 +
                                            '/fields/' +
                                            i5 +
                                            '/display_fields',
                                          schemaPath:
                                            '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/display_fields/minItems',
                                          keyword: 'minItems',
                                          params: { limit: 1 },
                                          message: 'must NOT have fewer than 1 items',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err145];
                                        } else {
                                          vErrors.push(err145);
                                        }
                                        errors++;
                                      }
                                      const len10 = data87.length;
                                      for (let i11 = 0; i11 < len10; i11++) {
                                        if (typeof data87[i11] !== 'string') {
                                          const err146 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/display_fields/' +
                                              i11,
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/display_fields/items/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err146];
                                          } else {
                                            vErrors.push(err146);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err147 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/display_fields',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/display_fields/type',
                                        keyword: 'type',
                                        params: { type: 'array' },
                                        message: 'must be array',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err147];
                                      } else {
                                        vErrors.push(err147);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.options_length !== undefined) {
                                    let data89 = data48.options_length;
                                    if (
                                      !(
                                        typeof data89 == 'number' &&
                                        !(data89 % 1) &&
                                        !isNaN(data89)
                                      )
                                    ) {
                                      const err148 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/options_length',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/relation/properties/options_length/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err148];
                                      } else {
                                        vErrors.push(err148);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs194 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'boolean') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'map') {
                                const _errs220 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.decimals !== undefined) {
                                    let data90 = data48.decimals;
                                    if (
                                      !(
                                        typeof data90 == 'number' &&
                                        !(data90 % 1) &&
                                        !isNaN(data90)
                                      )
                                    ) {
                                      const err149 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/decimals',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/map/properties/decimals/type',
                                        keyword: 'type',
                                        params: { type: 'integer' },
                                        message: 'must be integer',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err149];
                                      } else {
                                        vErrors.push(err149);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.type !== undefined) {
                                    let data91 = data48.type;
                                    if (typeof data91 !== 'string') {
                                      const err150 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/type',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/map/properties/type/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err150];
                                      } else {
                                        vErrors.push(err150);
                                      }
                                      errors++;
                                    }
                                    if (
                                      !(
                                        data91 === 'Point' ||
                                        data91 === 'LineString' ||
                                        data91 === 'Polygon'
                                      )
                                    ) {
                                      const err151 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/type',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/map/properties/type/enum',
                                        keyword: 'enum',
                                        params: {
                                          allowedValues:
                                            schema40.properties.collections.items.properties.files
                                              .items.properties.fields.items.selectCases.map
                                              .properties.type.enum,
                                        },
                                        message: 'must be equal to one of the allowed values',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err151];
                                      } else {
                                        vErrors.push(err151);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs220 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'date') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'datetime') {
                                const _errs225 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.format !== undefined) {
                                    if (typeof data48.format !== 'string') {
                                      const err152 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/format/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err152];
                                      } else {
                                        vErrors.push(err152);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.date_format !== undefined) {
                                    let data93 = data48.date_format;
                                    const _errs229 = errors;
                                    let valid55 = false;
                                    let passing5 = null;
                                    const _errs230 = errors;
                                    if (typeof data93 !== 'string') {
                                      const err153 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/date_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf/0/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err153];
                                      } else {
                                        vErrors.push(err153);
                                      }
                                      errors++;
                                    }
                                    var _valid9 = _errs230 === errors;
                                    if (_valid9) {
                                      valid55 = true;
                                      passing5 = 0;
                                    }
                                    const _errs232 = errors;
                                    if (typeof data93 !== 'boolean') {
                                      const err154 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/date_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf/1/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err154];
                                      } else {
                                        vErrors.push(err154);
                                      }
                                      errors++;
                                    }
                                    var _valid9 = _errs232 === errors;
                                    if (_valid9 && valid55) {
                                      valid55 = false;
                                      passing5 = [passing5, 1];
                                    } else {
                                      if (_valid9) {
                                        valid55 = true;
                                        passing5 = 1;
                                      }
                                    }
                                    if (!valid55) {
                                      const err155 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/date_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf',
                                        keyword: 'oneOf',
                                        params: { passingSchemas: passing5 },
                                        message: 'must match exactly one schema in oneOf',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err155];
                                      } else {
                                        vErrors.push(err155);
                                      }
                                      errors++;
                                    } else {
                                      errors = _errs229;
                                      if (vErrors !== null) {
                                        if (_errs229) {
                                          vErrors.length = _errs229;
                                        } else {
                                          vErrors = null;
                                        }
                                      }
                                    }
                                  }
                                  if (data48.time_format !== undefined) {
                                    let data94 = data48.time_format;
                                    const _errs235 = errors;
                                    let valid56 = false;
                                    let passing6 = null;
                                    const _errs236 = errors;
                                    if (typeof data94 !== 'string') {
                                      const err156 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/time_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf/0/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err156];
                                      } else {
                                        vErrors.push(err156);
                                      }
                                      errors++;
                                    }
                                    var _valid10 = _errs236 === errors;
                                    if (_valid10) {
                                      valid56 = true;
                                      passing6 = 0;
                                    }
                                    const _errs238 = errors;
                                    if (typeof data94 !== 'boolean') {
                                      const err157 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/time_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf/1/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err157];
                                      } else {
                                        vErrors.push(err157);
                                      }
                                      errors++;
                                    }
                                    var _valid10 = _errs238 === errors;
                                    if (_valid10 && valid56) {
                                      valid56 = false;
                                      passing6 = [passing6, 1];
                                    } else {
                                      if (_valid10) {
                                        valid56 = true;
                                        passing6 = 1;
                                      }
                                    }
                                    if (!valid56) {
                                      const err158 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/time_format',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf',
                                        keyword: 'oneOf',
                                        params: { passingSchemas: passing6 },
                                        message: 'must match exactly one schema in oneOf',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err158];
                                      } else {
                                        vErrors.push(err158);
                                      }
                                      errors++;
                                    } else {
                                      errors = _errs235;
                                      if (vErrors !== null) {
                                        if (_errs235) {
                                          vErrors.length = _errs235;
                                        } else {
                                          vErrors = null;
                                        }
                                      }
                                    }
                                  }
                                  if (data48.picker_utc !== undefined) {
                                    if (typeof data48.picker_utc !== 'boolean') {
                                      const err159 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/picker_utc',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/datetime/properties/picker_utc/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err159];
                                      } else {
                                        vErrors.push(err159);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs225 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'code') {
                                const _errs242 = errors;
                                if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                                  if (data48.default_language !== undefined) {
                                    if (typeof data48.default_language !== 'string') {
                                      const err160 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/default_language',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/default_language/type',
                                        keyword: 'type',
                                        params: { type: 'string' },
                                        message: 'must be string',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err160];
                                      } else {
                                        vErrors.push(err160);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.allow_language_selection !== undefined) {
                                    if (typeof data48.allow_language_selection !== 'boolean') {
                                      const err161 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/allow_language_selection',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/allow_language_selection/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err161];
                                      } else {
                                        vErrors.push(err161);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.output_code_only !== undefined) {
                                    if (typeof data48.output_code_only !== 'boolean') {
                                      const err162 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/output_code_only',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/output_code_only/type',
                                        keyword: 'type',
                                        params: { type: 'boolean' },
                                        message: 'must be boolean',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err162];
                                      } else {
                                        vErrors.push(err162);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (data48.keys !== undefined) {
                                    let data99 = data48.keys;
                                    if (
                                      data99 &&
                                      typeof data99 == 'object' &&
                                      !Array.isArray(data99)
                                    ) {
                                      if (data99.code !== undefined) {
                                        if (typeof data99.code !== 'string') {
                                          const err163 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/keys/code',
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/keys/properties/code/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err163];
                                          } else {
                                            vErrors.push(err163);
                                          }
                                          errors++;
                                        }
                                      }
                                      if (data99.lang !== undefined) {
                                        if (typeof data99.lang !== 'string') {
                                          const err164 = {
                                            instancePath:
                                              instancePath +
                                              '/collections/' +
                                              i3 +
                                              '/files/' +
                                              i4 +
                                              '/fields/' +
                                              i5 +
                                              '/keys/lang',
                                            schemaPath:
                                              '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/keys/properties/lang/type',
                                            keyword: 'type',
                                            params: { type: 'string' },
                                            message: 'must be string',
                                          };
                                          if (vErrors === null) {
                                            vErrors = [err164];
                                          } else {
                                            vErrors.push(err164);
                                          }
                                          errors++;
                                        }
                                      }
                                    } else {
                                      const err165 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/keys',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/selectCases/code/properties/keys/type',
                                        keyword: 'type',
                                        params: { type: 'object' },
                                        message: 'must be object',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err165];
                                      } else {
                                        vErrors.push(err165);
                                      }
                                      errors++;
                                    }
                                  }
                                }
                                var _valid5 = _errs242 === errors;
                                valid28 = _valid5;
                              } else if ('' + value0 == 'color') {
                                var _valid5 = true;
                                valid28 = _valid5;
                              }
                              if (!valid28) {
                                const err166 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5,
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/select',
                                  keyword: 'select',
                                  params: { failingCase: 'color' },
                                  message: 'should match case "color" schema',
                                };
                                if (vErrors === null) {
                                  vErrors = [err166];
                                } else {
                                  vErrors.push(err166);
                                }
                                errors++;
                              }
                            }
                          }
                          if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
                            if (data48.name === undefined) {
                              const err167 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/files/' +
                                  i4 +
                                  '/fields/' +
                                  i5,
                                schemaPath:
                                  '#/properties/collections/items/properties/files/items/properties/fields/items/required',
                                keyword: 'required',
                                params: { missingProperty: 'name' },
                                message: "must have required property '" + 'name' + "'",
                              };
                              if (vErrors === null) {
                                vErrors = [err167];
                              } else {
                                vErrors.push(err167);
                              }
                              errors++;
                            }
                            if (data48.name !== undefined) {
                              if (typeof data48.name !== 'string') {
                                const err168 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/name',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/name/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                };
                                if (vErrors === null) {
                                  vErrors = [err168];
                                } else {
                                  vErrors.push(err168);
                                }
                                errors++;
                              }
                            }
                            if (data48.label !== undefined) {
                              if (typeof data48.label !== 'string') {
                                const err169 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/label',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/label/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                };
                                if (vErrors === null) {
                                  vErrors = [err169];
                                } else {
                                  vErrors.push(err169);
                                }
                                errors++;
                              }
                            }
                            if (data48.widget !== undefined) {
                              if (typeof data48.widget !== 'string') {
                                const err170 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/widget',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/widget/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                };
                                if (vErrors === null) {
                                  vErrors = [err170];
                                } else {
                                  vErrors.push(err170);
                                }
                                errors++;
                              }
                            }
                            if (data48.required !== undefined) {
                              if (typeof data48.required !== 'boolean') {
                                const err171 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/required',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/required/type',
                                  keyword: 'type',
                                  params: { type: 'boolean' },
                                  message: 'must be boolean',
                                };
                                if (vErrors === null) {
                                  vErrors = [err171];
                                } else {
                                  vErrors.push(err171);
                                }
                                errors++;
                              }
                            }
                            if (data48.i18n !== undefined) {
                              let data106 = data48.i18n;
                              const _errs265 = errors;
                              let valid60 = false;
                              let passing7 = null;
                              const _errs266 = errors;
                              if (typeof data106 !== 'boolean') {
                                const err172 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/i18n',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/i18n/oneOf/0/type',
                                  keyword: 'type',
                                  params: { type: 'boolean' },
                                  message: 'must be boolean',
                                };
                                if (vErrors === null) {
                                  vErrors = [err172];
                                } else {
                                  vErrors.push(err172);
                                }
                                errors++;
                              }
                              var _valid11 = _errs266 === errors;
                              if (_valid11) {
                                valid60 = true;
                                passing7 = 0;
                              }
                              const _errs268 = errors;
                              if (typeof data106 !== 'string') {
                                const err173 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/i18n',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/i18n/oneOf/1/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                };
                                if (vErrors === null) {
                                  vErrors = [err173];
                                } else {
                                  vErrors.push(err173);
                                }
                                errors++;
                              }
                              if (
                                !(
                                  data106 === 'translate' ||
                                  data106 === 'duplicate' ||
                                  data106 === 'none'
                                )
                              ) {
                                const err174 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/i18n',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/i18n/oneOf/1/enum',
                                  keyword: 'enum',
                                  params: {
                                    allowedValues:
                                      schema40.properties.collections.items.properties.files.items
                                        .properties.fields.items.properties.i18n.oneOf[1].enum,
                                  },
                                  message: 'must be equal to one of the allowed values',
                                };
                                if (vErrors === null) {
                                  vErrors = [err174];
                                } else {
                                  vErrors.push(err174);
                                }
                                errors++;
                              }
                              var _valid11 = _errs268 === errors;
                              if (_valid11 && valid60) {
                                valid60 = false;
                                passing7 = [passing7, 1];
                              } else {
                                if (_valid11) {
                                  valid60 = true;
                                  passing7 = 1;
                                }
                              }
                              if (!valid60) {
                                const err175 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/i18n',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/i18n/oneOf',
                                  keyword: 'oneOf',
                                  params: { passingSchemas: passing7 },
                                  message: 'must match exactly one schema in oneOf',
                                };
                                if (vErrors === null) {
                                  vErrors = [err175];
                                } else {
                                  vErrors.push(err175);
                                }
                                errors++;
                              } else {
                                errors = _errs265;
                                if (vErrors !== null) {
                                  if (_errs265) {
                                    vErrors.length = _errs265;
                                  } else {
                                    vErrors = null;
                                  }
                                }
                              }
                            }
                            if (data48.hint !== undefined) {
                              if (typeof data48.hint !== 'string') {
                                const err176 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/hint',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/hint/type',
                                  keyword: 'type',
                                  params: { type: 'string' },
                                  message: 'must be string',
                                };
                                if (vErrors === null) {
                                  vErrors = [err176];
                                } else {
                                  vErrors.push(err176);
                                }
                                errors++;
                              }
                            }
                            if (data48.pattern !== undefined) {
                              let data108 = data48.pattern;
                              if (Array.isArray(data108)) {
                                if (data108.length < 2) {
                                  const err177 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/files/' +
                                      i4 +
                                      '/fields/' +
                                      i5 +
                                      '/pattern',
                                    schemaPath:
                                      '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/minItems',
                                    keyword: 'minItems',
                                    params: { limit: 2 },
                                    message: 'must NOT have fewer than 2 items',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err177];
                                  } else {
                                    vErrors.push(err177);
                                  }
                                  errors++;
                                }
                                const len11 = data108.length;
                                if (len11 > 0) {
                                  let data109 = data108[0];
                                  const _errs275 = errors;
                                  let valid62 = false;
                                  let passing8 = null;
                                  const _errs276 = errors;
                                  if (typeof data109 !== 'string') {
                                    const err178 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5 +
                                        '/pattern/0',
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf/0/type',
                                      keyword: 'type',
                                      params: { type: 'string' },
                                      message: 'must be string',
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err178];
                                    } else {
                                      vErrors.push(err178);
                                    }
                                    errors++;
                                  }
                                  var _valid12 = _errs276 === errors;
                                  if (_valid12) {
                                    valid62 = true;
                                    passing8 = 0;
                                  }
                                  const _errs278 = errors;
                                  if (typeof data109 == 'number') {
                                    if (!(data109 instanceof RegExp)) {
                                      const err179 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/pattern/0',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                        keyword: 'instanceof',
                                        params: {},
                                        message: 'must pass "instanceof" keyword validation',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err179];
                                      } else {
                                        vErrors.push(err179);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (typeof data109 === 'string') {
                                    if (!(data109 instanceof RegExp)) {
                                      const err180 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/pattern/0',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                        keyword: 'instanceof',
                                        params: {},
                                        message: 'must pass "instanceof" keyword validation',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err180];
                                      } else {
                                        vErrors.push(err180);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (Array.isArray(data109)) {
                                    if (!(data109 instanceof RegExp)) {
                                      const err181 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/pattern/0',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                        keyword: 'instanceof',
                                        params: {},
                                        message: 'must pass "instanceof" keyword validation',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err181];
                                      } else {
                                        vErrors.push(err181);
                                      }
                                      errors++;
                                    }
                                  }
                                  if (
                                    data109 &&
                                    typeof data109 == 'object' &&
                                    !Array.isArray(data109)
                                  ) {
                                    if (!(data109 instanceof RegExp)) {
                                      const err182 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/files/' +
                                          i4 +
                                          '/fields/' +
                                          i5 +
                                          '/pattern/0',
                                        schemaPath:
                                          '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                        keyword: 'instanceof',
                                        params: {},
                                        message: 'must pass "instanceof" keyword validation',
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err182];
                                      } else {
                                        vErrors.push(err182);
                                      }
                                      errors++;
                                    }
                                  }
                                  var _valid12 = _errs278 === errors;
                                  if (_valid12 && valid62) {
                                    valid62 = false;
                                    passing8 = [passing8, 1];
                                  } else {
                                    if (_valid12) {
                                      valid62 = true;
                                      passing8 = 1;
                                    }
                                  }
                                  if (!valid62) {
                                    const err183 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5 +
                                        '/pattern/0',
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/0/oneOf',
                                      keyword: 'oneOf',
                                      params: { passingSchemas: passing8 },
                                      message: 'must match exactly one schema in oneOf',
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err183];
                                    } else {
                                      vErrors.push(err183);
                                    }
                                    errors++;
                                  } else {
                                    errors = _errs275;
                                    if (vErrors !== null) {
                                      if (_errs275) {
                                        vErrors.length = _errs275;
                                      } else {
                                        vErrors = null;
                                      }
                                    }
                                  }
                                }
                                if (len11 > 1) {
                                  if (typeof data108[1] !== 'string') {
                                    const err184 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/files/' +
                                        i4 +
                                        '/fields/' +
                                        i5 +
                                        '/pattern/1',
                                      schemaPath:
                                        '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/items/1/type',
                                      keyword: 'type',
                                      params: { type: 'string' },
                                      message: 'must be string',
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err184];
                                    } else {
                                      vErrors.push(err184);
                                    }
                                    errors++;
                                  }
                                }
                              } else {
                                const err185 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/pattern',
                                  schemaPath:
                                    '#/properties/collections/items/properties/files/items/properties/fields/items/properties/pattern/type',
                                  keyword: 'type',
                                  params: { type: 'array' },
                                  message: 'must be array',
                                };
                                if (vErrors === null) {
                                  vErrors = [err185];
                                } else {
                                  vErrors.push(err185);
                                }
                                errors++;
                              }
                            }
                            if (data48.field !== undefined) {
                              if (
                                !validate25(data48.field, {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/field',
                                  parentData: data48,
                                  parentDataProperty: 'field',
                                  rootData,
                                })
                              ) {
                                vErrors =
                                  vErrors === null
                                    ? validate25.errors
                                    : vErrors.concat(validate25.errors);
                                errors = vErrors.length;
                              }
                            }
                            if (data48.fields !== undefined) {
                              if (
                                !validate26(data48.fields, {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/fields',
                                  parentData: data48,
                                  parentDataProperty: 'fields',
                                  rootData,
                                })
                              ) {
                                vErrors =
                                  vErrors === null
                                    ? validate26.errors
                                    : vErrors.concat(validate26.errors);
                                errors = vErrors.length;
                              }
                            }
                            if (data48.types !== undefined) {
                              if (
                                !validate26(data48.types, {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/files/' +
                                    i4 +
                                    '/fields/' +
                                    i5 +
                                    '/types',
                                  parentData: data48,
                                  parentDataProperty: 'types',
                                  rootData,
                                })
                              ) {
                                vErrors =
                                  vErrors === null
                                    ? validate26.errors
                                    : vErrors.concat(validate26.errors);
                                errors = vErrors.length;
                              }
                            }
                          } else {
                            const err186 = {
                              instancePath:
                                instancePath +
                                '/collections/' +
                                i3 +
                                '/files/' +
                                i4 +
                                '/fields/' +
                                i5,
                              schemaPath:
                                '#/properties/collections/items/properties/files/items/properties/fields/items/type',
                              keyword: 'type',
                              params: { type: 'object' },
                              message: 'must be object',
                            };
                            if (vErrors === null) {
                              vErrors = [err186];
                            } else {
                              vErrors.push(err186);
                            }
                            errors++;
                          }
                        }
                        if (
                          schema40.properties.collections.items.properties.files.items.properties.fields.uniqueItemProperties
                            .map(property =>
                              data47
                                .map(item => item && item[property])
                                .some((value, index, array) => array.indexOf(value) !== index),
                            )
                            .some(value => value)
                        ) {
                          const err187 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/files/' + i4 + '/fields',
                            schemaPath:
                              '#/properties/collections/items/properties/files/items/properties/fields/uniqueItemProperties',
                            keyword: 'uniqueItemProperties',
                            params: {},
                            message: 'must pass "uniqueItemProperties" keyword validation',
                          };
                          if (vErrors === null) {
                            vErrors = [err187];
                          } else {
                            vErrors.push(err187);
                          }
                          errors++;
                        }
                      } else {
                        const err188 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/files/' + i4 + '/fields',
                          schemaPath:
                            '#/properties/collections/items/properties/files/items/properties/fields/type',
                          keyword: 'type',
                          params: { type: 'array' },
                          message: 'must be array',
                        };
                        if (vErrors === null) {
                          vErrors = [err188];
                        } else {
                          vErrors.push(err188);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err189 = {
                      instancePath: instancePath + '/collections/' + i3 + '/files/' + i4,
                      schemaPath: '#/properties/collections/items/properties/files/items/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err189];
                    } else {
                      vErrors.push(err189);
                    }
                    errors++;
                  }
                }
                if (
                  schema40.properties.collections.items.properties.files.uniqueItemProperties
                    .map(property =>
                      data38
                        .map(item => item && item[property])
                        .some((value, index, array) => array.indexOf(value) !== index),
                    )
                    .some(value => value)
                ) {
                  const err190 = {
                    instancePath: instancePath + '/collections/' + i3 + '/files',
                    schemaPath:
                      '#/properties/collections/items/properties/files/uniqueItemProperties',
                    keyword: 'uniqueItemProperties',
                    params: {},
                    message: 'must pass "uniqueItemProperties" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err190];
                  } else {
                    vErrors.push(err190);
                  }
                  errors++;
                }
              } else {
                const err191 = {
                  instancePath: instancePath + '/collections/' + i3 + '/files',
                  schemaPath: '#/properties/collections/items/properties/files/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err191];
                } else {
                  vErrors.push(err191);
                }
                errors++;
              }
            }
            if (data30.identifier_field !== undefined) {
              if (typeof data30.identifier_field !== 'string') {
                const err192 = {
                  instancePath: instancePath + '/collections/' + i3 + '/identifier_field',
                  schemaPath: '#/properties/collections/items/properties/identifier_field/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err192];
                } else {
                  vErrors.push(err192);
                }
                errors++;
              }
            }
            if (data30.summary !== undefined) {
              if (typeof data30.summary !== 'string') {
                const err193 = {
                  instancePath: instancePath + '/collections/' + i3 + '/summary',
                  schemaPath: '#/properties/collections/items/properties/summary/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err193];
                } else {
                  vErrors.push(err193);
                }
                errors++;
              }
            }
            if (data30.slug !== undefined) {
              if (typeof data30.slug !== 'string') {
                const err194 = {
                  instancePath: instancePath + '/collections/' + i3 + '/slug',
                  schemaPath: '#/properties/collections/items/properties/slug/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err194];
                } else {
                  vErrors.push(err194);
                }
                errors++;
              }
            }
            if (data30.path !== undefined) {
              if (typeof data30.path !== 'string') {
                const err195 = {
                  instancePath: instancePath + '/collections/' + i3 + '/path',
                  schemaPath: '#/properties/collections/items/properties/path/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err195];
                } else {
                  vErrors.push(err195);
                }
                errors++;
              }
            }
            if (data30.preview_path !== undefined) {
              if (typeof data30.preview_path !== 'string') {
                const err196 = {
                  instancePath: instancePath + '/collections/' + i3 + '/preview_path',
                  schemaPath: '#/properties/collections/items/properties/preview_path/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err196];
                } else {
                  vErrors.push(err196);
                }
                errors++;
              }
            }
            if (data30.preview_path_date_field !== undefined) {
              if (typeof data30.preview_path_date_field !== 'string') {
                const err197 = {
                  instancePath: instancePath + '/collections/' + i3 + '/preview_path_date_field',
                  schemaPath:
                    '#/properties/collections/items/properties/preview_path_date_field/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err197];
                } else {
                  vErrors.push(err197);
                }
                errors++;
              }
            }
            if (data30.create !== undefined) {
              if (typeof data30.create !== 'boolean') {
                const err198 = {
                  instancePath: instancePath + '/collections/' + i3 + '/create',
                  schemaPath: '#/properties/collections/items/properties/create/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err198];
                } else {
                  vErrors.push(err198);
                }
                errors++;
              }
            }
            if (data30.publish !== undefined) {
              if (typeof data30.publish !== 'boolean') {
                const err199 = {
                  instancePath: instancePath + '/collections/' + i3 + '/publish',
                  schemaPath: '#/properties/collections/items/properties/publish/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err199];
                } else {
                  vErrors.push(err199);
                }
                errors++;
              }
            }
            if (data30.hide !== undefined) {
              if (typeof data30.hide !== 'boolean') {
                const err200 = {
                  instancePath: instancePath + '/collections/' + i3 + '/hide',
                  schemaPath: '#/properties/collections/items/properties/hide/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err200];
                } else {
                  vErrors.push(err200);
                }
                errors++;
              }
            }
            if (data30.editor !== undefined) {
              let data123 = data30.editor;
              if (data123 && typeof data123 == 'object' && !Array.isArray(data123)) {
                if (data123.preview !== undefined) {
                  if (typeof data123.preview !== 'boolean') {
                    const err201 = {
                      instancePath: instancePath + '/collections/' + i3 + '/editor/preview',
                      schemaPath:
                        '#/properties/collections/items/properties/editor/properties/preview/type',
                      keyword: 'type',
                      params: { type: 'boolean' },
                      message: 'must be boolean',
                    };
                    if (vErrors === null) {
                      vErrors = [err201];
                    } else {
                      vErrors.push(err201);
                    }
                    errors++;
                  }
                }
              } else {
                const err202 = {
                  instancePath: instancePath + '/collections/' + i3 + '/editor',
                  schemaPath: '#/properties/collections/items/properties/editor/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err202];
                } else {
                  vErrors.push(err202);
                }
                errors++;
              }
            }
            if (data30.format !== undefined) {
              let data125 = data30.format;
              if (typeof data125 !== 'string') {
                const err203 = {
                  instancePath: instancePath + '/collections/' + i3 + '/format',
                  schemaPath: '#/properties/collections/items/properties/format/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err203];
                } else {
                  vErrors.push(err203);
                }
                errors++;
              }
              if (
                !(
                  data125 === 'yml' ||
                  data125 === 'yaml' ||
                  data125 === 'toml' ||
                  data125 === 'json' ||
                  data125 === 'frontmatter' ||
                  data125 === 'json-frontmatter' ||
                  data125 === 'toml-frontmatter' ||
                  data125 === 'yaml-frontmatter'
                )
              ) {
                const err204 = {
                  instancePath: instancePath + '/collections/' + i3 + '/format',
                  schemaPath: '#/properties/collections/items/properties/format/enum',
                  keyword: 'enum',
                  params: {
                    allowedValues: schema40.properties.collections.items.properties.format.enum,
                  },
                  message: 'must be equal to one of the allowed values',
                };
                if (vErrors === null) {
                  vErrors = [err204];
                } else {
                  vErrors.push(err204);
                }
                errors++;
              }
            }
            if (data30.extension !== undefined) {
              if (typeof data30.extension !== 'string') {
                const err205 = {
                  instancePath: instancePath + '/collections/' + i3 + '/extension',
                  schemaPath: '#/properties/collections/items/properties/extension/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err205];
                } else {
                  vErrors.push(err205);
                }
                errors++;
              }
            }
            if (data30.frontmatter_delimiter !== undefined) {
              let data127 = data30.frontmatter_delimiter;
              if (typeof data127 !== 'string' && !Array.isArray(data127)) {
                const err206 = {
                  instancePath: instancePath + '/collections/' + i3 + '/frontmatter_delimiter',
                  schemaPath:
                    '#/properties/collections/items/properties/frontmatter_delimiter/type',
                  keyword: 'type',
                  params: {
                    type: schema40.properties.collections.items.properties.frontmatter_delimiter
                      .type,
                  },
                  message: 'must be string,array',
                };
                if (vErrors === null) {
                  vErrors = [err206];
                } else {
                  vErrors.push(err206);
                }
                errors++;
              }
              if (Array.isArray(data127)) {
                if (data127.length > 2) {
                  const err207 = {
                    instancePath: instancePath + '/collections/' + i3 + '/frontmatter_delimiter',
                    schemaPath:
                      '#/properties/collections/items/properties/frontmatter_delimiter/maxItems',
                    keyword: 'maxItems',
                    params: { limit: 2 },
                    message: 'must NOT have more than 2 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err207];
                  } else {
                    vErrors.push(err207);
                  }
                  errors++;
                }
                if (data127.length < 2) {
                  const err208 = {
                    instancePath: instancePath + '/collections/' + i3 + '/frontmatter_delimiter',
                    schemaPath:
                      '#/properties/collections/items/properties/frontmatter_delimiter/minItems',
                    keyword: 'minItems',
                    params: { limit: 2 },
                    message: 'must NOT have fewer than 2 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err208];
                  } else {
                    vErrors.push(err208);
                  }
                  errors++;
                }
                const len12 = data127.length;
                for (let i12 = 0; i12 < len12; i12++) {
                  if (typeof data127[i12] !== 'string') {
                    const err209 = {
                      instancePath:
                        instancePath + '/collections/' + i3 + '/frontmatter_delimiter/' + i12,
                      schemaPath:
                        '#/properties/collections/items/properties/frontmatter_delimiter/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err209];
                    } else {
                      vErrors.push(err209);
                    }
                    errors++;
                  }
                }
              }
            }
            if (data30.fields !== undefined) {
              let data129 = data30.fields;
              if (Array.isArray(data129)) {
                if (data129.length < 1) {
                  const err210 = {
                    instancePath: instancePath + '/collections/' + i3 + '/fields',
                    schemaPath: '#/properties/collections/items/properties/fields/minItems',
                    keyword: 'minItems',
                    params: { limit: 1 },
                    message: 'must NOT have fewer than 1 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err210];
                  } else {
                    vErrors.push(err210);
                  }
                  errors++;
                }
                const len13 = data129.length;
                for (let i13 = 0; i13 < len13; i13++) {
                  let data130 = data129[i13];
                  const vSchema12 = data130 && data130.widget;
                  if (!(vSchema12 === undefined)) {
                    if (
                      typeof vSchema12 !== 'string' &&
                      !(typeof vSchema12 == 'number') &&
                      typeof vSchema12 !== 'boolean' &&
                      vSchema12 !== null
                    ) {
                      const err211 = {
                        instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                        schemaPath: '#/properties/collections/items/properties/fields/items/select',
                        keyword: 'select',
                        params: {},
                        message: '"select" keyword must be string,number,boolean,null ($data)',
                      };
                      if (vErrors === null) {
                        vErrors = [err211];
                      } else {
                        vErrors.push(err211);
                      }
                      errors++;
                    } else {
                      let valid68 = true;
                      const value1 = vSchema12 === null ? 'null' : vSchema12;
                      if ('' + value1 == 'unknown') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'string') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'number') {
                        const _errs318 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.step !== undefined) {
                            if (!(typeof data130.step == 'number')) {
                              const err212 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/step',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/number/properties/step/type',
                                keyword: 'type',
                                params: { type: 'number' },
                                message: 'must be number',
                              };
                              if (vErrors === null) {
                                vErrors = [err212];
                              } else {
                                vErrors.push(err212);
                              }
                              errors++;
                            }
                          }
                          if (data130.value_type !== undefined) {
                            if (typeof data130.value_type !== 'string') {
                              const err213 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/value_type',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/number/properties/value_type/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err213];
                              } else {
                                vErrors.push(err213);
                              }
                              errors++;
                            }
                          }
                          if (data130.min !== undefined) {
                            if (!(typeof data130.min == 'number')) {
                              const err214 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/min',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/number/properties/min/type',
                                keyword: 'type',
                                params: { type: 'number' },
                                message: 'must be number',
                              };
                              if (vErrors === null) {
                                vErrors = [err214];
                              } else {
                                vErrors.push(err214);
                              }
                              errors++;
                            }
                          }
                          if (data130.max !== undefined) {
                            if (!(typeof data130.max == 'number')) {
                              const err215 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/max',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/number/properties/max/type',
                                keyword: 'type',
                                params: { type: 'number' },
                                message: 'must be number',
                              };
                              if (vErrors === null) {
                                vErrors = [err215];
                              } else {
                                vErrors.push(err215);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs318 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'text') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'image') {
                        const _errs327 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.allow_multiple !== undefined) {
                            if (typeof data130.allow_multiple !== 'boolean') {
                              const err216 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/allow_multiple',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/image/properties/allow_multiple/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err216];
                              } else {
                                vErrors.push(err216);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs327 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'file') {
                        const _errs330 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.allow_multiple !== undefined) {
                            if (typeof data130.allow_multiple !== 'boolean') {
                              const err217 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/allow_multiple',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/file/properties/allow_multiple/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err217];
                              } else {
                                vErrors.push(err217);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs330 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'select') {
                        const _errs333 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.options === undefined) {
                            const err218 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/select/required',
                              keyword: 'required',
                              params: { missingProperty: 'options' },
                              message: "must have required property '" + 'options' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err218];
                            } else {
                              vErrors.push(err218);
                            }
                            errors++;
                          }
                          if (data130.multiple !== undefined) {
                            if (typeof data130.multiple !== 'boolean') {
                              const err219 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/multiple',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/select/properties/multiple/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err219];
                              } else {
                                vErrors.push(err219);
                              }
                              errors++;
                            }
                          }
                          if (data130.min !== undefined) {
                            let data138 = data130.min;
                            if (
                              !(typeof data138 == 'number' && !(data138 % 1) && !isNaN(data138))
                            ) {
                              const err220 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/min',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/select/properties/min/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err220];
                              } else {
                                vErrors.push(err220);
                              }
                              errors++;
                            }
                          }
                          if (data130.max !== undefined) {
                            let data139 = data130.max;
                            if (
                              !(typeof data139 == 'number' && !(data139 % 1) && !isNaN(data139))
                            ) {
                              const err221 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/max',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/select/properties/max/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err221];
                              } else {
                                vErrors.push(err221);
                              }
                              errors++;
                            }
                          }
                          if (data130.options !== undefined) {
                            let data140 = data130.options;
                            if (Array.isArray(data140)) {
                              const len14 = data140.length;
                              for (let i14 = 0; i14 < len14; i14++) {
                                let data141 = data140[i14];
                                const _errs343 = errors;
                                let valid75 = false;
                                let passing9 = null;
                                const _errs344 = errors;
                                if (typeof data141 !== 'string') {
                                  const err222 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/options/' +
                                      i14,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/0/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err222];
                                  } else {
                                    vErrors.push(err222);
                                  }
                                  errors++;
                                }
                                var _valid14 = _errs344 === errors;
                                if (_valid14) {
                                  valid75 = true;
                                  passing9 = 0;
                                }
                                const _errs346 = errors;
                                if (!(typeof data141 == 'number')) {
                                  const err223 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/options/' +
                                      i14,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/1/type',
                                    keyword: 'type',
                                    params: { type: 'number' },
                                    message: 'must be number',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err223];
                                  } else {
                                    vErrors.push(err223);
                                  }
                                  errors++;
                                }
                                var _valid14 = _errs346 === errors;
                                if (_valid14 && valid75) {
                                  valid75 = false;
                                  passing9 = [passing9, 1];
                                } else {
                                  if (_valid14) {
                                    valid75 = true;
                                    passing9 = 1;
                                  }
                                  const _errs348 = errors;
                                  if (
                                    data141 &&
                                    typeof data141 == 'object' &&
                                    !Array.isArray(data141)
                                  ) {
                                    if (data141.label === undefined) {
                                      const err224 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/fields/' +
                                          i13 +
                                          '/options/' +
                                          i14,
                                        schemaPath:
                                          '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/required',
                                        keyword: 'required',
                                        params: { missingProperty: 'label' },
                                        message: "must have required property '" + 'label' + "'",
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err224];
                                      } else {
                                        vErrors.push(err224);
                                      }
                                      errors++;
                                    }
                                    if (data141.value === undefined) {
                                      const err225 = {
                                        instancePath:
                                          instancePath +
                                          '/collections/' +
                                          i3 +
                                          '/fields/' +
                                          i13 +
                                          '/options/' +
                                          i14,
                                        schemaPath:
                                          '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/required',
                                        keyword: 'required',
                                        params: { missingProperty: 'value' },
                                        message: "must have required property '" + 'value' + "'",
                                      };
                                      if (vErrors === null) {
                                        vErrors = [err225];
                                      } else {
                                        vErrors.push(err225);
                                      }
                                      errors++;
                                    }
                                    if (data141.label !== undefined) {
                                      if (typeof data141.label !== 'string') {
                                        const err226 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/fields/' +
                                            i13 +
                                            '/options/' +
                                            i14 +
                                            '/label',
                                          schemaPath:
                                            '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/label/type',
                                          keyword: 'type',
                                          params: { type: 'string' },
                                          message: 'must be string',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err226];
                                        } else {
                                          vErrors.push(err226);
                                        }
                                        errors++;
                                      }
                                    }
                                    if (data141.value !== undefined) {
                                      let data143 = data141.value;
                                      const _errs353 = errors;
                                      let valid77 = false;
                                      let passing10 = null;
                                      const _errs354 = errors;
                                      if (typeof data143 !== 'string') {
                                        const err227 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/fields/' +
                                            i13 +
                                            '/options/' +
                                            i14 +
                                            '/value',
                                          schemaPath:
                                            '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/0/type',
                                          keyword: 'type',
                                          params: { type: 'string' },
                                          message: 'must be string',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err227];
                                        } else {
                                          vErrors.push(err227);
                                        }
                                        errors++;
                                      }
                                      var _valid15 = _errs354 === errors;
                                      if (_valid15) {
                                        valid77 = true;
                                        passing10 = 0;
                                      }
                                      const _errs356 = errors;
                                      if (!(typeof data143 == 'number')) {
                                        const err228 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/fields/' +
                                            i13 +
                                            '/options/' +
                                            i14 +
                                            '/value',
                                          schemaPath:
                                            '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf/1/type',
                                          keyword: 'type',
                                          params: { type: 'number' },
                                          message: 'must be number',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err228];
                                        } else {
                                          vErrors.push(err228);
                                        }
                                        errors++;
                                      }
                                      var _valid15 = _errs356 === errors;
                                      if (_valid15 && valid77) {
                                        valid77 = false;
                                        passing10 = [passing10, 1];
                                      } else {
                                        if (_valid15) {
                                          valid77 = true;
                                          passing10 = 1;
                                        }
                                      }
                                      if (!valid77) {
                                        const err229 = {
                                          instancePath:
                                            instancePath +
                                            '/collections/' +
                                            i3 +
                                            '/fields/' +
                                            i13 +
                                            '/options/' +
                                            i14 +
                                            '/value',
                                          schemaPath:
                                            '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/properties/value/oneOf',
                                          keyword: 'oneOf',
                                          params: { passingSchemas: passing10 },
                                          message: 'must match exactly one schema in oneOf',
                                        };
                                        if (vErrors === null) {
                                          vErrors = [err229];
                                        } else {
                                          vErrors.push(err229);
                                        }
                                        errors++;
                                      } else {
                                        errors = _errs353;
                                        if (vErrors !== null) {
                                          if (_errs353) {
                                            vErrors.length = _errs353;
                                          } else {
                                            vErrors = null;
                                          }
                                        }
                                      }
                                    }
                                  } else {
                                    const err230 = {
                                      instancePath:
                                        instancePath +
                                        '/collections/' +
                                        i3 +
                                        '/fields/' +
                                        i13 +
                                        '/options/' +
                                        i14,
                                      schemaPath:
                                        '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf/2/type',
                                      keyword: 'type',
                                      params: { type: 'object' },
                                      message: 'must be object',
                                    };
                                    if (vErrors === null) {
                                      vErrors = [err230];
                                    } else {
                                      vErrors.push(err230);
                                    }
                                    errors++;
                                  }
                                  var _valid14 = _errs348 === errors;
                                  if (_valid14 && valid75) {
                                    valid75 = false;
                                    passing9 = [passing9, 2];
                                  } else {
                                    if (_valid14) {
                                      valid75 = true;
                                      passing9 = 2;
                                    }
                                  }
                                }
                                if (!valid75) {
                                  const err231 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/options/' +
                                      i14,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/items/oneOf',
                                    keyword: 'oneOf',
                                    params: { passingSchemas: passing9 },
                                    message: 'must match exactly one schema in oneOf',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err231];
                                  } else {
                                    vErrors.push(err231);
                                  }
                                  errors++;
                                } else {
                                  errors = _errs343;
                                  if (vErrors !== null) {
                                    if (_errs343) {
                                      vErrors.length = _errs343;
                                    } else {
                                      vErrors = null;
                                    }
                                  }
                                }
                              }
                            } else {
                              const err232 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/options',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/select/properties/options/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err232];
                              } else {
                                vErrors.push(err232);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs333 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'markdown') {
                        const _errs358 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.minimal !== undefined) {
                            if (typeof data130.minimal !== 'boolean') {
                              const err233 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/minimal',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/minimal/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err233];
                              } else {
                                vErrors.push(err233);
                              }
                              errors++;
                            }
                          }
                          if (data130.buttons !== undefined) {
                            let data145 = data130.buttons;
                            if (Array.isArray(data145)) {
                              const len15 = data145.length;
                              for (let i15 = 0; i15 < len15; i15++) {
                                let data146 = data145[i15];
                                if (typeof data146 !== 'string') {
                                  const err234 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/buttons/' +
                                      i15,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/buttons/items/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err234];
                                  } else {
                                    vErrors.push(err234);
                                  }
                                  errors++;
                                }
                                if (
                                  !(
                                    data146 === 'bold' ||
                                    data146 === 'italic' ||
                                    data146 === 'code' ||
                                    data146 === 'link' ||
                                    data146 === 'heading-one' ||
                                    data146 === 'heading-two' ||
                                    data146 === 'heading-three' ||
                                    data146 === 'heading-four' ||
                                    data146 === 'heading-five' ||
                                    data146 === 'heading-six' ||
                                    data146 === 'quote' ||
                                    data146 === 'bulleted-list' ||
                                    data146 === 'numbered-list'
                                  )
                                ) {
                                  const err235 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/buttons/' +
                                      i15,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/buttons/items/enum',
                                    keyword: 'enum',
                                    params: {
                                      allowedValues:
                                        schema40.properties.collections.items.properties.fields
                                          .items.selectCases.markdown.properties.buttons.items.enum,
                                    },
                                    message: 'must be equal to one of the allowed values',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err235];
                                  } else {
                                    vErrors.push(err235);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err236 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/buttons',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/buttons/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err236];
                              } else {
                                vErrors.push(err236);
                              }
                              errors++;
                            }
                          }
                          if (data130.editor_components !== undefined) {
                            let data147 = data130.editor_components;
                            if (Array.isArray(data147)) {
                              const len16 = data147.length;
                              for (let i16 = 0; i16 < len16; i16++) {
                                if (typeof data147[i16] !== 'string') {
                                  const err237 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/editor_components/' +
                                      i16,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/editor_components/items/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err237];
                                  } else {
                                    vErrors.push(err237);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err238 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/editor_components',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/editor_components/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err238];
                              } else {
                                vErrors.push(err238);
                              }
                              errors++;
                            }
                          }
                          if (data130.modes !== undefined) {
                            let data149 = data130.modes;
                            if (Array.isArray(data149)) {
                              if (data149.length < 1) {
                                const err239 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/fields/' +
                                    i13 +
                                    '/modes',
                                  schemaPath:
                                    '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/modes/minItems',
                                  keyword: 'minItems',
                                  params: { limit: 1 },
                                  message: 'must NOT have fewer than 1 items',
                                };
                                if (vErrors === null) {
                                  vErrors = [err239];
                                } else {
                                  vErrors.push(err239);
                                }
                                errors++;
                              }
                              const len17 = data149.length;
                              for (let i17 = 0; i17 < len17; i17++) {
                                let data150 = data149[i17];
                                if (typeof data150 !== 'string') {
                                  const err240 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/modes/' +
                                      i17,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/modes/items/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err240];
                                  } else {
                                    vErrors.push(err240);
                                  }
                                  errors++;
                                }
                                if (!(data150 === 'raw' || data150 === 'rich_text')) {
                                  const err241 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/modes/' +
                                      i17,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/modes/items/enum',
                                    keyword: 'enum',
                                    params: {
                                      allowedValues:
                                        schema40.properties.collections.items.properties.fields
                                          .items.selectCases.markdown.properties.modes.items.enum,
                                    },
                                    message: 'must be equal to one of the allowed values',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err241];
                                  } else {
                                    vErrors.push(err241);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err242 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/modes',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/markdown/properties/modes/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err242];
                              } else {
                                vErrors.push(err242);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs358 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'list') {
                        const _errs373 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.allow_add !== undefined) {
                            if (typeof data130.allow_add !== 'boolean') {
                              const err243 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/allow_add',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/allow_add/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err243];
                              } else {
                                vErrors.push(err243);
                              }
                              errors++;
                            }
                          }
                          if (data130.collapsed !== undefined) {
                            if (typeof data130.collapsed !== 'boolean') {
                              const err244 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/collapsed',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/collapsed/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err244];
                              } else {
                                vErrors.push(err244);
                              }
                              errors++;
                            }
                          }
                          if (data130.summary !== undefined) {
                            if (typeof data130.summary !== 'string') {
                              const err245 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/summary',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/summary/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err245];
                              } else {
                                vErrors.push(err245);
                              }
                              errors++;
                            }
                          }
                          if (data130.minimize_collapsed !== undefined) {
                            if (typeof data130.minimize_collapsed !== 'boolean') {
                              const err246 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/minimize_collapsed',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/minimize_collapsed/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err246];
                              } else {
                                vErrors.push(err246);
                              }
                              errors++;
                            }
                          }
                          if (data130.label_singular !== undefined) {
                            if (typeof data130.label_singular !== 'string') {
                              const err247 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/label_singular',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/label_singular/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err247];
                              } else {
                                vErrors.push(err247);
                              }
                              errors++;
                            }
                          }
                          if (data130.i18n !== undefined) {
                            if (typeof data130.i18n !== 'boolean') {
                              const err248 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/i18n/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err248];
                              } else {
                                vErrors.push(err248);
                              }
                              errors++;
                            }
                          }
                          if (data130.min !== undefined) {
                            if (!(typeof data130.min == 'number')) {
                              const err249 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/min',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/min/type',
                                keyword: 'type',
                                params: { type: 'number' },
                                message: 'must be number',
                              };
                              if (vErrors === null) {
                                vErrors = [err249];
                              } else {
                                vErrors.push(err249);
                              }
                              errors++;
                            }
                          }
                          if (data130.max !== undefined) {
                            if (!(typeof data130.max == 'number')) {
                              const err250 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/max',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/list/properties/max/type',
                                keyword: 'type',
                                params: { type: 'number' },
                                message: 'must be number',
                              };
                              if (vErrors === null) {
                                vErrors = [err250];
                              } else {
                                vErrors.push(err250);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs373 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'object') {
                        const _errs390 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.collapsed !== undefined) {
                            if (typeof data130.collapsed !== 'boolean') {
                              const err251 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/collapsed',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/object/properties/collapsed/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err251];
                              } else {
                                vErrors.push(err251);
                              }
                              errors++;
                            }
                          }
                          if (data130.i18n !== undefined) {
                            if (typeof data130.i18n !== 'boolean') {
                              const err252 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/object/properties/i18n/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err252];
                              } else {
                                vErrors.push(err252);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs390 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'relation') {
                        const _errs395 = errors;
                        const _errs396 = errors;
                        let valid87 = false;
                        let passing11 = null;
                        const _errs397 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.collection === undefined) {
                            const err253 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                              keyword: 'required',
                              params: { missingProperty: 'collection' },
                              message: "must have required property '" + 'collection' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err253];
                            } else {
                              vErrors.push(err253);
                            }
                            errors++;
                          }
                          if (data130.value_field === undefined) {
                            const err254 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                              keyword: 'required',
                              params: { missingProperty: 'value_field' },
                              message: "must have required property '" + 'value_field' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err254];
                            } else {
                              vErrors.push(err254);
                            }
                            errors++;
                          }
                          if (data130.search_fields === undefined) {
                            const err255 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/0/required',
                              keyword: 'required',
                              params: { missingProperty: 'search_fields' },
                              message: "must have required property '" + 'search_fields' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err255];
                            } else {
                              vErrors.push(err255);
                            }
                            errors++;
                          }
                        }
                        var _valid16 = _errs397 === errors;
                        if (_valid16) {
                          valid87 = true;
                          passing11 = 0;
                        }
                        const _errs398 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.collection === undefined) {
                            const err256 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                              keyword: 'required',
                              params: { missingProperty: 'collection' },
                              message: "must have required property '" + 'collection' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err256];
                            } else {
                              vErrors.push(err256);
                            }
                            errors++;
                          }
                          if (data130.valueField === undefined) {
                            const err257 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                              keyword: 'required',
                              params: { missingProperty: 'valueField' },
                              message: "must have required property '" + 'valueField' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err257];
                            } else {
                              vErrors.push(err257);
                            }
                            errors++;
                          }
                          if (data130.searchFields === undefined) {
                            const err258 = {
                              instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf/1/required',
                              keyword: 'required',
                              params: { missingProperty: 'searchFields' },
                              message: "must have required property '" + 'searchFields' + "'",
                            };
                            if (vErrors === null) {
                              vErrors = [err258];
                            } else {
                              vErrors.push(err258);
                            }
                            errors++;
                          }
                        }
                        var _valid16 = _errs398 === errors;
                        if (_valid16 && valid87) {
                          valid87 = false;
                          passing11 = [passing11, 1];
                        } else {
                          if (_valid16) {
                            valid87 = true;
                            passing11 = 1;
                          }
                        }
                        if (!valid87) {
                          const err259 = {
                            instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                            schemaPath:
                              '#/properties/collections/items/properties/fields/items/selectCases/relation/oneOf',
                            keyword: 'oneOf',
                            params: { passingSchemas: passing11 },
                            message: 'must match exactly one schema in oneOf',
                          };
                          if (vErrors === null) {
                            vErrors = [err259];
                          } else {
                            vErrors.push(err259);
                          }
                          errors++;
                        } else {
                          errors = _errs396;
                          if (vErrors !== null) {
                            if (_errs396) {
                              vErrors.length = _errs396;
                            } else {
                              vErrors = null;
                            }
                          }
                        }
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.collection !== undefined) {
                            if (typeof data130.collection !== 'string') {
                              const err260 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/collection',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/collection/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err260];
                              } else {
                                vErrors.push(err260);
                              }
                              errors++;
                            }
                          }
                          if (data130.value_field !== undefined) {
                            if (typeof data130.value_field !== 'string') {
                              const err261 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/value_field',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/value_field/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err261];
                              } else {
                                vErrors.push(err261);
                              }
                              errors++;
                            }
                          }
                          if (data130.search_fields !== undefined) {
                            let data163 = data130.search_fields;
                            if (Array.isArray(data163)) {
                              if (data163.length < 1) {
                                const err262 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/fields/' +
                                    i13 +
                                    '/search_fields',
                                  schemaPath:
                                    '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/search_fields/minItems',
                                  keyword: 'minItems',
                                  params: { limit: 1 },
                                  message: 'must NOT have fewer than 1 items',
                                };
                                if (vErrors === null) {
                                  vErrors = [err262];
                                } else {
                                  vErrors.push(err262);
                                }
                                errors++;
                              }
                              const len18 = data163.length;
                              for (let i18 = 0; i18 < len18; i18++) {
                                if (typeof data163[i18] !== 'string') {
                                  const err263 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/search_fields/' +
                                      i18,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/search_fields/items/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err263];
                                  } else {
                                    vErrors.push(err263);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err264 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/search_fields',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/search_fields/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err264];
                              } else {
                                vErrors.push(err264);
                              }
                              errors++;
                            }
                          }
                          if (data130.file !== undefined) {
                            if (typeof data130.file !== 'string') {
                              const err265 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/file',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/file/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err265];
                              } else {
                                vErrors.push(err265);
                              }
                              errors++;
                            }
                          }
                          if (data130.multiple !== undefined) {
                            if (typeof data130.multiple !== 'boolean') {
                              const err266 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/multiple',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/multiple/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err266];
                              } else {
                                vErrors.push(err266);
                              }
                              errors++;
                            }
                          }
                          if (data130.min !== undefined) {
                            let data167 = data130.min;
                            if (
                              !(typeof data167 == 'number' && !(data167 % 1) && !isNaN(data167))
                            ) {
                              const err267 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/min',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/min/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err267];
                              } else {
                                vErrors.push(err267);
                              }
                              errors++;
                            }
                          }
                          if (data130.max !== undefined) {
                            let data168 = data130.max;
                            if (
                              !(typeof data168 == 'number' && !(data168 % 1) && !isNaN(data168))
                            ) {
                              const err268 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/max',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/max/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err268];
                              } else {
                                vErrors.push(err268);
                              }
                              errors++;
                            }
                          }
                          if (data130.display_fields !== undefined) {
                            let data169 = data130.display_fields;
                            if (Array.isArray(data169)) {
                              if (data169.length < 1) {
                                const err269 = {
                                  instancePath:
                                    instancePath +
                                    '/collections/' +
                                    i3 +
                                    '/fields/' +
                                    i13 +
                                    '/display_fields',
                                  schemaPath:
                                    '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/display_fields/minItems',
                                  keyword: 'minItems',
                                  params: { limit: 1 },
                                  message: 'must NOT have fewer than 1 items',
                                };
                                if (vErrors === null) {
                                  vErrors = [err269];
                                } else {
                                  vErrors.push(err269);
                                }
                                errors++;
                              }
                              const len19 = data169.length;
                              for (let i19 = 0; i19 < len19; i19++) {
                                if (typeof data169[i19] !== 'string') {
                                  const err270 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/display_fields/' +
                                      i19,
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/display_fields/items/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err270];
                                  } else {
                                    vErrors.push(err270);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err271 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/display_fields',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/display_fields/type',
                                keyword: 'type',
                                params: { type: 'array' },
                                message: 'must be array',
                              };
                              if (vErrors === null) {
                                vErrors = [err271];
                              } else {
                                vErrors.push(err271);
                              }
                              errors++;
                            }
                          }
                          if (data130.options_length !== undefined) {
                            let data171 = data130.options_length;
                            if (
                              !(typeof data171 == 'number' && !(data171 % 1) && !isNaN(data171))
                            ) {
                              const err272 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/options_length',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/relation/properties/options_length/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err272];
                              } else {
                                vErrors.push(err272);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs395 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'boolean') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'map') {
                        const _errs421 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.decimals !== undefined) {
                            let data172 = data130.decimals;
                            if (
                              !(typeof data172 == 'number' && !(data172 % 1) && !isNaN(data172))
                            ) {
                              const err273 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/decimals',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/map/properties/decimals/type',
                                keyword: 'type',
                                params: { type: 'integer' },
                                message: 'must be integer',
                              };
                              if (vErrors === null) {
                                vErrors = [err273];
                              } else {
                                vErrors.push(err273);
                              }
                              errors++;
                            }
                          }
                          if (data130.type !== undefined) {
                            let data173 = data130.type;
                            if (typeof data173 !== 'string') {
                              const err274 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/type',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/map/properties/type/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err274];
                              } else {
                                vErrors.push(err274);
                              }
                              errors++;
                            }
                            if (
                              !(
                                data173 === 'Point' ||
                                data173 === 'LineString' ||
                                data173 === 'Polygon'
                              )
                            ) {
                              const err275 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/type',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/map/properties/type/enum',
                                keyword: 'enum',
                                params: {
                                  allowedValues:
                                    schema40.properties.collections.items.properties.fields.items
                                      .selectCases.map.properties.type.enum,
                                },
                                message: 'must be equal to one of the allowed values',
                              };
                              if (vErrors === null) {
                                vErrors = [err275];
                              } else {
                                vErrors.push(err275);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs421 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'date') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'datetime') {
                        const _errs426 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.format !== undefined) {
                            if (typeof data130.format !== 'string') {
                              const err276 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/format/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err276];
                              } else {
                                vErrors.push(err276);
                              }
                              errors++;
                            }
                          }
                          if (data130.date_format !== undefined) {
                            let data175 = data130.date_format;
                            const _errs430 = errors;
                            let valid95 = false;
                            let passing12 = null;
                            const _errs431 = errors;
                            if (typeof data175 !== 'string') {
                              const err277 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/date_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf/0/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err277];
                              } else {
                                vErrors.push(err277);
                              }
                              errors++;
                            }
                            var _valid17 = _errs431 === errors;
                            if (_valid17) {
                              valid95 = true;
                              passing12 = 0;
                            }
                            const _errs433 = errors;
                            if (typeof data175 !== 'boolean') {
                              const err278 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/date_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf/1/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err278];
                              } else {
                                vErrors.push(err278);
                              }
                              errors++;
                            }
                            var _valid17 = _errs433 === errors;
                            if (_valid17 && valid95) {
                              valid95 = false;
                              passing12 = [passing12, 1];
                            } else {
                              if (_valid17) {
                                valid95 = true;
                                passing12 = 1;
                              }
                            }
                            if (!valid95) {
                              const err279 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/date_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/date_format/oneOf',
                                keyword: 'oneOf',
                                params: { passingSchemas: passing12 },
                                message: 'must match exactly one schema in oneOf',
                              };
                              if (vErrors === null) {
                                vErrors = [err279];
                              } else {
                                vErrors.push(err279);
                              }
                              errors++;
                            } else {
                              errors = _errs430;
                              if (vErrors !== null) {
                                if (_errs430) {
                                  vErrors.length = _errs430;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                          }
                          if (data130.time_format !== undefined) {
                            let data176 = data130.time_format;
                            const _errs436 = errors;
                            let valid96 = false;
                            let passing13 = null;
                            const _errs437 = errors;
                            if (typeof data176 !== 'string') {
                              const err280 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/time_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf/0/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err280];
                              } else {
                                vErrors.push(err280);
                              }
                              errors++;
                            }
                            var _valid18 = _errs437 === errors;
                            if (_valid18) {
                              valid96 = true;
                              passing13 = 0;
                            }
                            const _errs439 = errors;
                            if (typeof data176 !== 'boolean') {
                              const err281 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/time_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf/1/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err281];
                              } else {
                                vErrors.push(err281);
                              }
                              errors++;
                            }
                            var _valid18 = _errs439 === errors;
                            if (_valid18 && valid96) {
                              valid96 = false;
                              passing13 = [passing13, 1];
                            } else {
                              if (_valid18) {
                                valid96 = true;
                                passing13 = 1;
                              }
                            }
                            if (!valid96) {
                              const err282 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/time_format',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/time_format/oneOf',
                                keyword: 'oneOf',
                                params: { passingSchemas: passing13 },
                                message: 'must match exactly one schema in oneOf',
                              };
                              if (vErrors === null) {
                                vErrors = [err282];
                              } else {
                                vErrors.push(err282);
                              }
                              errors++;
                            } else {
                              errors = _errs436;
                              if (vErrors !== null) {
                                if (_errs436) {
                                  vErrors.length = _errs436;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                          }
                          if (data130.picker_utc !== undefined) {
                            if (typeof data130.picker_utc !== 'boolean') {
                              const err283 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/picker_utc',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/datetime/properties/picker_utc/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err283];
                              } else {
                                vErrors.push(err283);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs426 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'code') {
                        const _errs443 = errors;
                        if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                          if (data130.default_language !== undefined) {
                            if (typeof data130.default_language !== 'string') {
                              const err284 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/default_language',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/code/properties/default_language/type',
                                keyword: 'type',
                                params: { type: 'string' },
                                message: 'must be string',
                              };
                              if (vErrors === null) {
                                vErrors = [err284];
                              } else {
                                vErrors.push(err284);
                              }
                              errors++;
                            }
                          }
                          if (data130.allow_language_selection !== undefined) {
                            if (typeof data130.allow_language_selection !== 'boolean') {
                              const err285 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/allow_language_selection',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/code/properties/allow_language_selection/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err285];
                              } else {
                                vErrors.push(err285);
                              }
                              errors++;
                            }
                          }
                          if (data130.output_code_only !== undefined) {
                            if (typeof data130.output_code_only !== 'boolean') {
                              const err286 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/output_code_only',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/code/properties/output_code_only/type',
                                keyword: 'type',
                                params: { type: 'boolean' },
                                message: 'must be boolean',
                              };
                              if (vErrors === null) {
                                vErrors = [err286];
                              } else {
                                vErrors.push(err286);
                              }
                              errors++;
                            }
                          }
                          if (data130.keys !== undefined) {
                            let data181 = data130.keys;
                            if (data181 && typeof data181 == 'object' && !Array.isArray(data181)) {
                              if (data181.code !== undefined) {
                                if (typeof data181.code !== 'string') {
                                  const err287 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/keys/code',
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/code/properties/keys/properties/code/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err287];
                                  } else {
                                    vErrors.push(err287);
                                  }
                                  errors++;
                                }
                              }
                              if (data181.lang !== undefined) {
                                if (typeof data181.lang !== 'string') {
                                  const err288 = {
                                    instancePath:
                                      instancePath +
                                      '/collections/' +
                                      i3 +
                                      '/fields/' +
                                      i13 +
                                      '/keys/lang',
                                    schemaPath:
                                      '#/properties/collections/items/properties/fields/items/selectCases/code/properties/keys/properties/lang/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                  };
                                  if (vErrors === null) {
                                    vErrors = [err288];
                                  } else {
                                    vErrors.push(err288);
                                  }
                                  errors++;
                                }
                              }
                            } else {
                              const err289 = {
                                instancePath:
                                  instancePath + '/collections/' + i3 + '/fields/' + i13 + '/keys',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/selectCases/code/properties/keys/type',
                                keyword: 'type',
                                params: { type: 'object' },
                                message: 'must be object',
                              };
                              if (vErrors === null) {
                                vErrors = [err289];
                              } else {
                                vErrors.push(err289);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid13 = _errs443 === errors;
                        valid68 = _valid13;
                      } else if ('' + value1 == 'color') {
                        var _valid13 = true;
                        valid68 = _valid13;
                      }
                      if (!valid68) {
                        const err290 = {
                          instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/select',
                          keyword: 'select',
                          params: { failingCase: 'color' },
                          message: 'should match case "color" schema',
                        };
                        if (vErrors === null) {
                          vErrors = [err290];
                        } else {
                          vErrors.push(err290);
                        }
                        errors++;
                      }
                    }
                  }
                  if (data130 && typeof data130 == 'object' && !Array.isArray(data130)) {
                    if (data130.name === undefined) {
                      const err291 = {
                        instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                        schemaPath:
                          '#/properties/collections/items/properties/fields/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'name' },
                        message: "must have required property '" + 'name' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err291];
                      } else {
                        vErrors.push(err291);
                      }
                      errors++;
                    }
                    if (data130.name !== undefined) {
                      if (typeof data130.name !== 'string') {
                        const err292 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/name',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/name/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err292];
                        } else {
                          vErrors.push(err292);
                        }
                        errors++;
                      }
                    }
                    if (data130.label !== undefined) {
                      if (typeof data130.label !== 'string') {
                        const err293 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/label',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err293];
                        } else {
                          vErrors.push(err293);
                        }
                        errors++;
                      }
                    }
                    if (data130.widget !== undefined) {
                      if (typeof data130.widget !== 'string') {
                        const err294 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/widget',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/widget/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err294];
                        } else {
                          vErrors.push(err294);
                        }
                        errors++;
                      }
                    }
                    if (data130.required !== undefined) {
                      if (typeof data130.required !== 'boolean') {
                        const err295 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/required',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/required/type',
                          keyword: 'type',
                          params: { type: 'boolean' },
                          message: 'must be boolean',
                        };
                        if (vErrors === null) {
                          vErrors = [err295];
                        } else {
                          vErrors.push(err295);
                        }
                        errors++;
                      }
                    }
                    if (data130.i18n !== undefined) {
                      let data188 = data130.i18n;
                      const _errs466 = errors;
                      let valid100 = false;
                      let passing14 = null;
                      const _errs467 = errors;
                      if (typeof data188 !== 'boolean') {
                        const err296 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/i18n/oneOf/0/type',
                          keyword: 'type',
                          params: { type: 'boolean' },
                          message: 'must be boolean',
                        };
                        if (vErrors === null) {
                          vErrors = [err296];
                        } else {
                          vErrors.push(err296);
                        }
                        errors++;
                      }
                      var _valid19 = _errs467 === errors;
                      if (_valid19) {
                        valid100 = true;
                        passing14 = 0;
                      }
                      const _errs469 = errors;
                      if (typeof data188 !== 'string') {
                        const err297 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/i18n/oneOf/1/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err297];
                        } else {
                          vErrors.push(err297);
                        }
                        errors++;
                      }
                      if (
                        !(data188 === 'translate' || data188 === 'duplicate' || data188 === 'none')
                      ) {
                        const err298 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/i18n/oneOf/1/enum',
                          keyword: 'enum',
                          params: {
                            allowedValues:
                              schema40.properties.collections.items.properties.fields.items
                                .properties.i18n.oneOf[1].enum,
                          },
                          message: 'must be equal to one of the allowed values',
                        };
                        if (vErrors === null) {
                          vErrors = [err298];
                        } else {
                          vErrors.push(err298);
                        }
                        errors++;
                      }
                      var _valid19 = _errs469 === errors;
                      if (_valid19 && valid100) {
                        valid100 = false;
                        passing14 = [passing14, 1];
                      } else {
                        if (_valid19) {
                          valid100 = true;
                          passing14 = 1;
                        }
                      }
                      if (!valid100) {
                        const err299 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/i18n',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/i18n/oneOf',
                          keyword: 'oneOf',
                          params: { passingSchemas: passing14 },
                          message: 'must match exactly one schema in oneOf',
                        };
                        if (vErrors === null) {
                          vErrors = [err299];
                        } else {
                          vErrors.push(err299);
                        }
                        errors++;
                      } else {
                        errors = _errs466;
                        if (vErrors !== null) {
                          if (_errs466) {
                            vErrors.length = _errs466;
                          } else {
                            vErrors = null;
                          }
                        }
                      }
                    }
                    if (data130.hint !== undefined) {
                      if (typeof data130.hint !== 'string') {
                        const err300 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/hint',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/hint/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err300];
                        } else {
                          vErrors.push(err300);
                        }
                        errors++;
                      }
                    }
                    if (data130.pattern !== undefined) {
                      let data190 = data130.pattern;
                      if (Array.isArray(data190)) {
                        if (data190.length < 2) {
                          const err301 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/fields/' + i13 + '/pattern',
                            schemaPath:
                              '#/properties/collections/items/properties/fields/items/properties/pattern/minItems',
                            keyword: 'minItems',
                            params: { limit: 2 },
                            message: 'must NOT have fewer than 2 items',
                          };
                          if (vErrors === null) {
                            vErrors = [err301];
                          } else {
                            vErrors.push(err301);
                          }
                          errors++;
                        }
                        const len20 = data190.length;
                        if (len20 > 0) {
                          let data191 = data190[0];
                          const _errs476 = errors;
                          let valid102 = false;
                          let passing15 = null;
                          const _errs477 = errors;
                          if (typeof data191 !== 'string') {
                            const err302 = {
                              instancePath:
                                instancePath +
                                '/collections/' +
                                i3 +
                                '/fields/' +
                                i13 +
                                '/pattern/0',
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf/0/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err302];
                            } else {
                              vErrors.push(err302);
                            }
                            errors++;
                          }
                          var _valid20 = _errs477 === errors;
                          if (_valid20) {
                            valid102 = true;
                            passing15 = 0;
                          }
                          const _errs479 = errors;
                          if (typeof data191 == 'number') {
                            if (!(data191 instanceof RegExp)) {
                              const err303 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/pattern/0',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                keyword: 'instanceof',
                                params: {},
                                message: 'must pass "instanceof" keyword validation',
                              };
                              if (vErrors === null) {
                                vErrors = [err303];
                              } else {
                                vErrors.push(err303);
                              }
                              errors++;
                            }
                          }
                          if (typeof data191 === 'string') {
                            if (!(data191 instanceof RegExp)) {
                              const err304 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/pattern/0',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                keyword: 'instanceof',
                                params: {},
                                message: 'must pass "instanceof" keyword validation',
                              };
                              if (vErrors === null) {
                                vErrors = [err304];
                              } else {
                                vErrors.push(err304);
                              }
                              errors++;
                            }
                          }
                          if (Array.isArray(data191)) {
                            if (!(data191 instanceof RegExp)) {
                              const err305 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/pattern/0',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                keyword: 'instanceof',
                                params: {},
                                message: 'must pass "instanceof" keyword validation',
                              };
                              if (vErrors === null) {
                                vErrors = [err305];
                              } else {
                                vErrors.push(err305);
                              }
                              errors++;
                            }
                          }
                          if (data191 && typeof data191 == 'object' && !Array.isArray(data191)) {
                            if (!(data191 instanceof RegExp)) {
                              const err306 = {
                                instancePath:
                                  instancePath +
                                  '/collections/' +
                                  i3 +
                                  '/fields/' +
                                  i13 +
                                  '/pattern/0',
                                schemaPath:
                                  '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf/1/instanceof',
                                keyword: 'instanceof',
                                params: {},
                                message: 'must pass "instanceof" keyword validation',
                              };
                              if (vErrors === null) {
                                vErrors = [err306];
                              } else {
                                vErrors.push(err306);
                              }
                              errors++;
                            }
                          }
                          var _valid20 = _errs479 === errors;
                          if (_valid20 && valid102) {
                            valid102 = false;
                            passing15 = [passing15, 1];
                          } else {
                            if (_valid20) {
                              valid102 = true;
                              passing15 = 1;
                            }
                          }
                          if (!valid102) {
                            const err307 = {
                              instancePath:
                                instancePath +
                                '/collections/' +
                                i3 +
                                '/fields/' +
                                i13 +
                                '/pattern/0',
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/properties/pattern/items/0/oneOf',
                              keyword: 'oneOf',
                              params: { passingSchemas: passing15 },
                              message: 'must match exactly one schema in oneOf',
                            };
                            if (vErrors === null) {
                              vErrors = [err307];
                            } else {
                              vErrors.push(err307);
                            }
                            errors++;
                          } else {
                            errors = _errs476;
                            if (vErrors !== null) {
                              if (_errs476) {
                                vErrors.length = _errs476;
                              } else {
                                vErrors = null;
                              }
                            }
                          }
                        }
                        if (len20 > 1) {
                          if (typeof data190[1] !== 'string') {
                            const err308 = {
                              instancePath:
                                instancePath +
                                '/collections/' +
                                i3 +
                                '/fields/' +
                                i13 +
                                '/pattern/1',
                              schemaPath:
                                '#/properties/collections/items/properties/fields/items/properties/pattern/items/1/type',
                              keyword: 'type',
                              params: { type: 'string' },
                              message: 'must be string',
                            };
                            if (vErrors === null) {
                              vErrors = [err308];
                            } else {
                              vErrors.push(err308);
                            }
                            errors++;
                          }
                        }
                      } else {
                        const err309 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/pattern',
                          schemaPath:
                            '#/properties/collections/items/properties/fields/items/properties/pattern/type',
                          keyword: 'type',
                          params: { type: 'array' },
                          message: 'must be array',
                        };
                        if (vErrors === null) {
                          vErrors = [err309];
                        } else {
                          vErrors.push(err309);
                        }
                        errors++;
                      }
                    }
                    if (data130.field !== undefined) {
                      if (
                        !validate32(data130.field, {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/field',
                          parentData: data130,
                          parentDataProperty: 'field',
                          rootData,
                        })
                      ) {
                        vErrors =
                          vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                        errors = vErrors.length;
                      }
                    }
                    if (data130.fields !== undefined) {
                      if (
                        !validate33(data130.fields, {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/fields',
                          parentData: data130,
                          parentDataProperty: 'fields',
                          rootData,
                        })
                      ) {
                        vErrors =
                          vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
                        errors = vErrors.length;
                      }
                    }
                    if (data130.types !== undefined) {
                      if (
                        !validate33(data130.types, {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/fields/' + i13 + '/types',
                          parentData: data130,
                          parentDataProperty: 'types',
                          rootData,
                        })
                      ) {
                        vErrors =
                          vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
                        errors = vErrors.length;
                      }
                    }
                  } else {
                    const err310 = {
                      instancePath: instancePath + '/collections/' + i3 + '/fields/' + i13,
                      schemaPath: '#/properties/collections/items/properties/fields/items/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err310];
                    } else {
                      vErrors.push(err310);
                    }
                    errors++;
                  }
                }
                if (
                  schema40.properties.collections.items.properties.fields.uniqueItemProperties
                    .map(property =>
                      data129
                        .map(item => item && item[property])
                        .some((value, index, array) => array.indexOf(value) !== index),
                    )
                    .some(value => value)
                ) {
                  const err311 = {
                    instancePath: instancePath + '/collections/' + i3 + '/fields',
                    schemaPath:
                      '#/properties/collections/items/properties/fields/uniqueItemProperties',
                    keyword: 'uniqueItemProperties',
                    params: {},
                    message: 'must pass "uniqueItemProperties" keyword validation',
                  };
                  if (vErrors === null) {
                    vErrors = [err311];
                  } else {
                    vErrors.push(err311);
                  }
                  errors++;
                }
              } else {
                const err312 = {
                  instancePath: instancePath + '/collections/' + i3 + '/fields',
                  schemaPath: '#/properties/collections/items/properties/fields/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err312];
                } else {
                  vErrors.push(err312);
                }
                errors++;
              }
            }
            if (data30.sortable_fields !== undefined) {
              let data196 = data30.sortable_fields;
              if (Array.isArray(data196)) {
                const len21 = data196.length;
                for (let i20 = 0; i20 < len21; i20++) {
                  if (typeof data196[i20] !== 'string') {
                    const err313 = {
                      instancePath: instancePath + '/collections/' + i3 + '/sortable_fields/' + i20,
                      schemaPath:
                        '#/properties/collections/items/properties/sortable_fields/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err313];
                    } else {
                      vErrors.push(err313);
                    }
                    errors++;
                  }
                }
              } else {
                const err314 = {
                  instancePath: instancePath + '/collections/' + i3 + '/sortable_fields',
                  schemaPath: '#/properties/collections/items/properties/sortable_fields/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err314];
                } else {
                  vErrors.push(err314);
                }
                errors++;
              }
            }
            if (data30.sortableFields !== undefined) {
              let data198 = data30.sortableFields;
              if (Array.isArray(data198)) {
                const len22 = data198.length;
                for (let i21 = 0; i21 < len22; i21++) {
                  if (typeof data198[i21] !== 'string') {
                    const err315 = {
                      instancePath: instancePath + '/collections/' + i3 + '/sortableFields/' + i21,
                      schemaPath:
                        '#/properties/collections/items/properties/sortableFields/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err315];
                    } else {
                      vErrors.push(err315);
                    }
                    errors++;
                  }
                }
              } else {
                const err316 = {
                  instancePath: instancePath + '/collections/' + i3 + '/sortableFields',
                  schemaPath: '#/properties/collections/items/properties/sortableFields/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err316];
                } else {
                  vErrors.push(err316);
                }
                errors++;
              }
            }
            if (data30.view_filters !== undefined) {
              let data200 = data30.view_filters;
              if (Array.isArray(data200)) {
                if (data200.length < 1) {
                  const err317 = {
                    instancePath: instancePath + '/collections/' + i3 + '/view_filters',
                    schemaPath: '#/properties/collections/items/properties/view_filters/minItems',
                    keyword: 'minItems',
                    params: { limit: 1 },
                    message: 'must NOT have fewer than 1 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err317];
                  } else {
                    vErrors.push(err317);
                  }
                  errors++;
                }
                const len23 = data200.length;
                for (let i22 = 0; i22 < len23; i22++) {
                  let data201 = data200[i22];
                  if (data201 && typeof data201 == 'object' && !Array.isArray(data201)) {
                    if (data201.label === undefined) {
                      const err318 = {
                        instancePath: instancePath + '/collections/' + i3 + '/view_filters/' + i22,
                        schemaPath:
                          '#/properties/collections/items/properties/view_filters/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err318];
                      } else {
                        vErrors.push(err318);
                      }
                      errors++;
                    }
                    if (data201.field === undefined) {
                      const err319 = {
                        instancePath: instancePath + '/collections/' + i3 + '/view_filters/' + i22,
                        schemaPath:
                          '#/properties/collections/items/properties/view_filters/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'field' },
                        message: "must have required property '" + 'field' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err319];
                      } else {
                        vErrors.push(err319);
                      }
                      errors++;
                    }
                    if (data201.pattern === undefined) {
                      const err320 = {
                        instancePath: instancePath + '/collections/' + i3 + '/view_filters/' + i22,
                        schemaPath:
                          '#/properties/collections/items/properties/view_filters/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'pattern' },
                        message: "must have required property '" + 'pattern' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err320];
                      } else {
                        vErrors.push(err320);
                      }
                      errors++;
                    }
                    for (const key1 in data201) {
                      if (!(key1 === 'label' || key1 === 'field' || key1 === 'pattern')) {
                        const err321 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/view_filters/' + i22,
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/additionalProperties',
                          keyword: 'additionalProperties',
                          params: { additionalProperty: key1 },
                          message: 'must NOT have additional properties',
                        };
                        if (vErrors === null) {
                          vErrors = [err321];
                        } else {
                          vErrors.push(err321);
                        }
                        errors++;
                      }
                    }
                    if (data201.label !== undefined) {
                      if (typeof data201.label !== 'string') {
                        const err322 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/view_filters/' + i22 + '/label',
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err322];
                        } else {
                          vErrors.push(err322);
                        }
                        errors++;
                      }
                    }
                    if (data201.field !== undefined) {
                      if (typeof data201.field !== 'string') {
                        const err323 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/view_filters/' + i22 + '/field',
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/properties/field/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err323];
                        } else {
                          vErrors.push(err323);
                        }
                        errors++;
                      }
                    }
                    if (data201.pattern !== undefined) {
                      let data204 = data201.pattern;
                      const _errs503 = errors;
                      let valid110 = false;
                      let passing16 = null;
                      const _errs504 = errors;
                      if (typeof data204 !== 'boolean') {
                        const err324 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/view_filters/' +
                            i22 +
                            '/pattern',
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/properties/pattern/oneOf/0/type',
                          keyword: 'type',
                          params: { type: 'boolean' },
                          message: 'must be boolean',
                        };
                        if (vErrors === null) {
                          vErrors = [err324];
                        } else {
                          vErrors.push(err324);
                        }
                        errors++;
                      }
                      var _valid21 = _errs504 === errors;
                      if (_valid21) {
                        valid110 = true;
                        passing16 = 0;
                      }
                      const _errs506 = errors;
                      if (typeof data204 !== 'string') {
                        const err325 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/view_filters/' +
                            i22 +
                            '/pattern',
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/properties/pattern/oneOf/1/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err325];
                        } else {
                          vErrors.push(err325);
                        }
                        errors++;
                      }
                      var _valid21 = _errs506 === errors;
                      if (_valid21 && valid110) {
                        valid110 = false;
                        passing16 = [passing16, 1];
                      } else {
                        if (_valid21) {
                          valid110 = true;
                          passing16 = 1;
                        }
                      }
                      if (!valid110) {
                        const err326 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/view_filters/' +
                            i22 +
                            '/pattern',
                          schemaPath:
                            '#/properties/collections/items/properties/view_filters/items/properties/pattern/oneOf',
                          keyword: 'oneOf',
                          params: { passingSchemas: passing16 },
                          message: 'must match exactly one schema in oneOf',
                        };
                        if (vErrors === null) {
                          vErrors = [err326];
                        } else {
                          vErrors.push(err326);
                        }
                        errors++;
                      } else {
                        errors = _errs503;
                        if (vErrors !== null) {
                          if (_errs503) {
                            vErrors.length = _errs503;
                          } else {
                            vErrors = null;
                          }
                        }
                      }
                    }
                  } else {
                    const err327 = {
                      instancePath: instancePath + '/collections/' + i3 + '/view_filters/' + i22,
                      schemaPath:
                        '#/properties/collections/items/properties/view_filters/items/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err327];
                    } else {
                      vErrors.push(err327);
                    }
                    errors++;
                  }
                }
              } else {
                const err328 = {
                  instancePath: instancePath + '/collections/' + i3 + '/view_filters',
                  schemaPath: '#/properties/collections/items/properties/view_filters/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err328];
                } else {
                  vErrors.push(err328);
                }
                errors++;
              }
            }
            if (data30.view_groups !== undefined) {
              let data205 = data30.view_groups;
              if (Array.isArray(data205)) {
                if (data205.length < 1) {
                  const err329 = {
                    instancePath: instancePath + '/collections/' + i3 + '/view_groups',
                    schemaPath: '#/properties/collections/items/properties/view_groups/minItems',
                    keyword: 'minItems',
                    params: { limit: 1 },
                    message: 'must NOT have fewer than 1 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err329];
                  } else {
                    vErrors.push(err329);
                  }
                  errors++;
                }
                const len24 = data205.length;
                for (let i23 = 0; i23 < len24; i23++) {
                  let data206 = data205[i23];
                  if (data206 && typeof data206 == 'object' && !Array.isArray(data206)) {
                    if (data206.label === undefined) {
                      const err330 = {
                        instancePath: instancePath + '/collections/' + i3 + '/view_groups/' + i23,
                        schemaPath:
                          '#/properties/collections/items/properties/view_groups/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err330];
                      } else {
                        vErrors.push(err330);
                      }
                      errors++;
                    }
                    if (data206.field === undefined) {
                      const err331 = {
                        instancePath: instancePath + '/collections/' + i3 + '/view_groups/' + i23,
                        schemaPath:
                          '#/properties/collections/items/properties/view_groups/items/required',
                        keyword: 'required',
                        params: { missingProperty: 'field' },
                        message: "must have required property '" + 'field' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err331];
                      } else {
                        vErrors.push(err331);
                      }
                      errors++;
                    }
                    for (const key2 in data206) {
                      if (!(key2 === 'label' || key2 === 'field' || key2 === 'pattern')) {
                        const err332 = {
                          instancePath: instancePath + '/collections/' + i3 + '/view_groups/' + i23,
                          schemaPath:
                            '#/properties/collections/items/properties/view_groups/items/additionalProperties',
                          keyword: 'additionalProperties',
                          params: { additionalProperty: key2 },
                          message: 'must NOT have additional properties',
                        };
                        if (vErrors === null) {
                          vErrors = [err332];
                        } else {
                          vErrors.push(err332);
                        }
                        errors++;
                      }
                    }
                    if (data206.label !== undefined) {
                      if (typeof data206.label !== 'string') {
                        const err333 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/view_groups/' + i23 + '/label',
                          schemaPath:
                            '#/properties/collections/items/properties/view_groups/items/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err333];
                        } else {
                          vErrors.push(err333);
                        }
                        errors++;
                      }
                    }
                    if (data206.field !== undefined) {
                      if (typeof data206.field !== 'string') {
                        const err334 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/view_groups/' + i23 + '/field',
                          schemaPath:
                            '#/properties/collections/items/properties/view_groups/items/properties/field/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err334];
                        } else {
                          vErrors.push(err334);
                        }
                        errors++;
                      }
                    }
                    if (data206.pattern !== undefined) {
                      if (typeof data206.pattern !== 'string') {
                        const err335 = {
                          instancePath:
                            instancePath +
                            '/collections/' +
                            i3 +
                            '/view_groups/' +
                            i23 +
                            '/pattern',
                          schemaPath:
                            '#/properties/collections/items/properties/view_groups/items/properties/pattern/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err335];
                        } else {
                          vErrors.push(err335);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err336 = {
                      instancePath: instancePath + '/collections/' + i3 + '/view_groups/' + i23,
                      schemaPath:
                        '#/properties/collections/items/properties/view_groups/items/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err336];
                    } else {
                      vErrors.push(err336);
                    }
                    errors++;
                  }
                }
              } else {
                const err337 = {
                  instancePath: instancePath + '/collections/' + i3 + '/view_groups',
                  schemaPath: '#/properties/collections/items/properties/view_groups/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err337];
                } else {
                  vErrors.push(err337);
                }
                errors++;
              }
            }
            if (data30.nested !== undefined) {
              let data210 = data30.nested;
              if (data210 && typeof data210 == 'object' && !Array.isArray(data210)) {
                if (data210.depth === undefined) {
                  const err338 = {
                    instancePath: instancePath + '/collections/' + i3 + '/nested',
                    schemaPath: '#/properties/collections/items/properties/nested/required',
                    keyword: 'required',
                    params: { missingProperty: 'depth' },
                    message: "must have required property '" + 'depth' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err338];
                  } else {
                    vErrors.push(err338);
                  }
                  errors++;
                }
                if (data210.depth !== undefined) {
                  let data211 = data210.depth;
                  if (typeof data211 == 'number') {
                    if (data211 > 1000 || isNaN(data211)) {
                      const err339 = {
                        instancePath: instancePath + '/collections/' + i3 + '/nested/depth',
                        schemaPath:
                          '#/properties/collections/items/properties/nested/properties/depth/maximum',
                        keyword: 'maximum',
                        params: { comparison: '<=', limit: 1000 },
                        message: 'must be <= 1000',
                      };
                      if (vErrors === null) {
                        vErrors = [err339];
                      } else {
                        vErrors.push(err339);
                      }
                      errors++;
                    }
                    if (data211 < 1 || isNaN(data211)) {
                      const err340 = {
                        instancePath: instancePath + '/collections/' + i3 + '/nested/depth',
                        schemaPath:
                          '#/properties/collections/items/properties/nested/properties/depth/minimum',
                        keyword: 'minimum',
                        params: { comparison: '>=', limit: 1 },
                        message: 'must be >= 1',
                      };
                      if (vErrors === null) {
                        vErrors = [err340];
                      } else {
                        vErrors.push(err340);
                      }
                      errors++;
                    }
                  } else {
                    const err341 = {
                      instancePath: instancePath + '/collections/' + i3 + '/nested/depth',
                      schemaPath:
                        '#/properties/collections/items/properties/nested/properties/depth/type',
                      keyword: 'type',
                      params: { type: 'number' },
                      message: 'must be number',
                    };
                    if (vErrors === null) {
                      vErrors = [err341];
                    } else {
                      vErrors.push(err341);
                    }
                    errors++;
                  }
                }
                if (data210.summary !== undefined) {
                  if (typeof data210.summary !== 'string') {
                    const err342 = {
                      instancePath: instancePath + '/collections/' + i3 + '/nested/summary',
                      schemaPath:
                        '#/properties/collections/items/properties/nested/properties/summary/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err342];
                    } else {
                      vErrors.push(err342);
                    }
                    errors++;
                  }
                }
              } else {
                const err343 = {
                  instancePath: instancePath + '/collections/' + i3 + '/nested',
                  schemaPath: '#/properties/collections/items/properties/nested/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err343];
                } else {
                  vErrors.push(err343);
                }
                errors++;
              }
            }
            if (data30.meta !== undefined) {
              let data213 = data30.meta;
              if (data213 && typeof data213 == 'object' && !Array.isArray(data213)) {
                if (Object.keys(data213).length < 1) {
                  const err344 = {
                    instancePath: instancePath + '/collections/' + i3 + '/meta',
                    schemaPath: '#/properties/collections/items/properties/meta/minProperties',
                    keyword: 'minProperties',
                    params: { limit: 1 },
                    message: 'must NOT have fewer than 1 items',
                  };
                  if (vErrors === null) {
                    vErrors = [err344];
                  } else {
                    vErrors.push(err344);
                  }
                  errors++;
                }
                for (const key3 in data213) {
                  if (!(key3 === 'path')) {
                    const err345 = {
                      instancePath: instancePath + '/collections/' + i3 + '/meta',
                      schemaPath:
                        '#/properties/collections/items/properties/meta/additionalProperties',
                      keyword: 'additionalProperties',
                      params: { additionalProperty: key3 },
                      message: 'must NOT have additional properties',
                    };
                    if (vErrors === null) {
                      vErrors = [err345];
                    } else {
                      vErrors.push(err345);
                    }
                    errors++;
                  }
                }
                if (data213.path !== undefined) {
                  let data214 = data213.path;
                  if (data214 && typeof data214 == 'object' && !Array.isArray(data214)) {
                    if (data214.label === undefined) {
                      const err346 = {
                        instancePath: instancePath + '/collections/' + i3 + '/meta/path',
                        schemaPath:
                          '#/properties/collections/items/properties/meta/properties/path/required',
                        keyword: 'required',
                        params: { missingProperty: 'label' },
                        message: "must have required property '" + 'label' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err346];
                      } else {
                        vErrors.push(err346);
                      }
                      errors++;
                    }
                    if (data214.widget === undefined) {
                      const err347 = {
                        instancePath: instancePath + '/collections/' + i3 + '/meta/path',
                        schemaPath:
                          '#/properties/collections/items/properties/meta/properties/path/required',
                        keyword: 'required',
                        params: { missingProperty: 'widget' },
                        message: "must have required property '" + 'widget' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err347];
                      } else {
                        vErrors.push(err347);
                      }
                      errors++;
                    }
                    if (data214.index_file === undefined) {
                      const err348 = {
                        instancePath: instancePath + '/collections/' + i3 + '/meta/path',
                        schemaPath:
                          '#/properties/collections/items/properties/meta/properties/path/required',
                        keyword: 'required',
                        params: { missingProperty: 'index_file' },
                        message: "must have required property '" + 'index_file' + "'",
                      };
                      if (vErrors === null) {
                        vErrors = [err348];
                      } else {
                        vErrors.push(err348);
                      }
                      errors++;
                    }
                    if (data214.label !== undefined) {
                      if (typeof data214.label !== 'string') {
                        const err349 = {
                          instancePath: instancePath + '/collections/' + i3 + '/meta/path/label',
                          schemaPath:
                            '#/properties/collections/items/properties/meta/properties/path/properties/label/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err349];
                        } else {
                          vErrors.push(err349);
                        }
                        errors++;
                      }
                    }
                    if (data214.widget !== undefined) {
                      if (typeof data214.widget !== 'string') {
                        const err350 = {
                          instancePath: instancePath + '/collections/' + i3 + '/meta/path/widget',
                          schemaPath:
                            '#/properties/collections/items/properties/meta/properties/path/properties/widget/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err350];
                        } else {
                          vErrors.push(err350);
                        }
                        errors++;
                      }
                    }
                    if (data214.index_file !== undefined) {
                      if (typeof data214.index_file !== 'string') {
                        const err351 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/meta/path/index_file',
                          schemaPath:
                            '#/properties/collections/items/properties/meta/properties/path/properties/index_file/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err351];
                        } else {
                          vErrors.push(err351);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err352 = {
                      instancePath: instancePath + '/collections/' + i3 + '/meta/path',
                      schemaPath:
                        '#/properties/collections/items/properties/meta/properties/path/type',
                      keyword: 'type',
                      params: { type: 'object' },
                      message: 'must be object',
                    };
                    if (vErrors === null) {
                      vErrors = [err352];
                    } else {
                      vErrors.push(err352);
                    }
                    errors++;
                  }
                }
              } else {
                const err353 = {
                  instancePath: instancePath + '/collections/' + i3 + '/meta',
                  schemaPath: '#/properties/collections/items/properties/meta/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err353];
                } else {
                  vErrors.push(err353);
                }
                errors++;
              }
            }
            if (data30.i18n !== undefined) {
              let data218 = data30.i18n;
              const _errs537 = errors;
              let valid117 = false;
              let passing17 = null;
              const _errs538 = errors;
              if (typeof data218 !== 'boolean') {
                const err354 = {
                  instancePath: instancePath + '/collections/' + i3 + '/i18n',
                  schemaPath: '#/properties/collections/items/properties/i18n/oneOf/0/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err354];
                } else {
                  vErrors.push(err354);
                }
                errors++;
              }
              var _valid22 = _errs538 === errors;
              if (_valid22) {
                valid117 = true;
                passing17 = 0;
              }
              const _errs540 = errors;
              if (data218 && typeof data218 == 'object' && !Array.isArray(data218)) {
                if (data218.structure !== undefined) {
                  let data219 = data218.structure;
                  if (typeof data219 !== 'string') {
                    const err355 = {
                      instancePath: instancePath + '/collections/' + i3 + '/i18n/structure',
                      schemaPath:
                        '#/properties/collections/items/properties/i18n/oneOf/1/properties/structure/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err355];
                    } else {
                      vErrors.push(err355);
                    }
                    errors++;
                  }
                  if (
                    !(
                      data219 === 'multiple_folders' ||
                      data219 === 'multiple_files' ||
                      data219 === 'single_file'
                    )
                  ) {
                    const err356 = {
                      instancePath: instancePath + '/collections/' + i3 + '/i18n/structure',
                      schemaPath:
                        '#/properties/collections/items/properties/i18n/oneOf/1/properties/structure/enum',
                      keyword: 'enum',
                      params: {
                        allowedValues:
                          schema40.properties.collections.items.properties.i18n.oneOf[1].properties
                            .structure.enum,
                      },
                      message: 'must be equal to one of the allowed values',
                    };
                    if (vErrors === null) {
                      vErrors = [err356];
                    } else {
                      vErrors.push(err356);
                    }
                    errors++;
                  }
                }
                if (data218.locales !== undefined) {
                  let data220 = data218.locales;
                  if (Array.isArray(data220)) {
                    if (data220.length < 2) {
                      const err357 = {
                        instancePath: instancePath + '/collections/' + i3 + '/i18n/locales',
                        schemaPath:
                          '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/minItems',
                        keyword: 'minItems',
                        params: { limit: 2 },
                        message: 'must NOT have fewer than 2 items',
                      };
                      if (vErrors === null) {
                        vErrors = [err357];
                      } else {
                        vErrors.push(err357);
                      }
                      errors++;
                    }
                    const len25 = data220.length;
                    for (let i24 = 0; i24 < len25; i24++) {
                      let data221 = data220[i24];
                      if (typeof data221 === 'string') {
                        if (func9(data221) > 10) {
                          const err358 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/i18n/locales/' + i24,
                            schemaPath:
                              '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/items/maxLength',
                            keyword: 'maxLength',
                            params: { limit: 10 },
                            message: 'must NOT have more than 10 characters',
                          };
                          if (vErrors === null) {
                            vErrors = [err358];
                          } else {
                            vErrors.push(err358);
                          }
                          errors++;
                        }
                        if (func9(data221) < 2) {
                          const err359 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/i18n/locales/' + i24,
                            schemaPath:
                              '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/items/minLength',
                            keyword: 'minLength',
                            params: { limit: 2 },
                            message: 'must NOT have fewer than 2 characters',
                          };
                          if (vErrors === null) {
                            vErrors = [err359];
                          } else {
                            vErrors.push(err359);
                          }
                          errors++;
                        }
                        if (!pattern0.test(data221)) {
                          const err360 = {
                            instancePath:
                              instancePath + '/collections/' + i3 + '/i18n/locales/' + i24,
                            schemaPath:
                              '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/items/pattern',
                            keyword: 'pattern',
                            params: { pattern: '^[a-zA-Z-_]+$' },
                            message: 'must match pattern "' + '^[a-zA-Z-_]+$' + '"',
                          };
                          if (vErrors === null) {
                            vErrors = [err360];
                          } else {
                            vErrors.push(err360);
                          }
                          errors++;
                        }
                      } else {
                        const err361 = {
                          instancePath:
                            instancePath + '/collections/' + i3 + '/i18n/locales/' + i24,
                          schemaPath:
                            '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/items/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err361];
                        } else {
                          vErrors.push(err361);
                        }
                        errors++;
                      }
                    }
                    let i25 = data220.length;
                    let j1;
                    if (i25 > 1) {
                      const indices1 = {};
                      for (; i25--; ) {
                        let item1 = data220[i25];
                        if (typeof item1 !== 'string') {
                          continue;
                        }
                        if (typeof indices1[item1] == 'number') {
                          j1 = indices1[item1];
                          const err362 = {
                            instancePath: instancePath + '/collections/' + i3 + '/i18n/locales',
                            schemaPath:
                              '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/uniqueItems',
                            keyword: 'uniqueItems',
                            params: { i: i25, j: j1 },
                            message:
                              'must NOT have duplicate items (items ## ' +
                              j1 +
                              ' and ' +
                              i25 +
                              ' are identical)',
                          };
                          if (vErrors === null) {
                            vErrors = [err362];
                          } else {
                            vErrors.push(err362);
                          }
                          errors++;
                          break;
                        }
                        indices1[item1] = i25;
                      }
                    }
                  } else {
                    const err363 = {
                      instancePath: instancePath + '/collections/' + i3 + '/i18n/locales',
                      schemaPath:
                        '#/properties/collections/items/properties/i18n/oneOf/1/properties/locales/type',
                      keyword: 'type',
                      params: { type: 'array' },
                      message: 'must be array',
                    };
                    if (vErrors === null) {
                      vErrors = [err363];
                    } else {
                      vErrors.push(err363);
                    }
                    errors++;
                  }
                }
                if (data218.default_locale !== undefined) {
                  let data222 = data218.default_locale;
                  if (typeof data222 === 'string') {
                    if (func9(data222) > 10) {
                      const err364 = {
                        instancePath: instancePath + '/collections/' + i3 + '/i18n/default_locale',
                        schemaPath:
                          '#/properties/collections/items/properties/i18n/oneOf/1/properties/default_locale/maxLength',
                        keyword: 'maxLength',
                        params: { limit: 10 },
                        message: 'must NOT have more than 10 characters',
                      };
                      if (vErrors === null) {
                        vErrors = [err364];
                      } else {
                        vErrors.push(err364);
                      }
                      errors++;
                    }
                    if (func9(data222) < 2) {
                      const err365 = {
                        instancePath: instancePath + '/collections/' + i3 + '/i18n/default_locale',
                        schemaPath:
                          '#/properties/collections/items/properties/i18n/oneOf/1/properties/default_locale/minLength',
                        keyword: 'minLength',
                        params: { limit: 2 },
                        message: 'must NOT have fewer than 2 characters',
                      };
                      if (vErrors === null) {
                        vErrors = [err365];
                      } else {
                        vErrors.push(err365);
                      }
                      errors++;
                    }
                    if (!pattern0.test(data222)) {
                      const err366 = {
                        instancePath: instancePath + '/collections/' + i3 + '/i18n/default_locale',
                        schemaPath:
                          '#/properties/collections/items/properties/i18n/oneOf/1/properties/default_locale/pattern',
                        keyword: 'pattern',
                        params: { pattern: '^[a-zA-Z-_]+$' },
                        message: 'must match pattern "' + '^[a-zA-Z-_]+$' + '"',
                      };
                      if (vErrors === null) {
                        vErrors = [err366];
                      } else {
                        vErrors.push(err366);
                      }
                      errors++;
                    }
                  } else {
                    const err367 = {
                      instancePath: instancePath + '/collections/' + i3 + '/i18n/default_locale',
                      schemaPath:
                        '#/properties/collections/items/properties/i18n/oneOf/1/properties/default_locale/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err367];
                    } else {
                      vErrors.push(err367);
                    }
                    errors++;
                  }
                }
              } else {
                const err368 = {
                  instancePath: instancePath + '/collections/' + i3 + '/i18n',
                  schemaPath: '#/properties/collections/items/properties/i18n/oneOf/1/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err368];
                } else {
                  vErrors.push(err368);
                }
                errors++;
              }
              var _valid22 = _errs540 === errors;
              if (_valid22 && valid117) {
                valid117 = false;
                passing17 = [passing17, 1];
              } else {
                if (_valid22) {
                  valid117 = true;
                  passing17 = 1;
                }
              }
              if (!valid117) {
                const err369 = {
                  instancePath: instancePath + '/collections/' + i3 + '/i18n',
                  schemaPath: '#/properties/collections/items/properties/i18n/oneOf',
                  keyword: 'oneOf',
                  params: { passingSchemas: passing17 },
                  message: 'must match exactly one schema in oneOf',
                };
                if (vErrors === null) {
                  vErrors = [err369];
                } else {
                  vErrors.push(err369);
                }
                errors++;
              } else {
                errors = _errs537;
                if (vErrors !== null) {
                  if (_errs537) {
                    vErrors.length = _errs537;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err370 = {
              instancePath: instancePath + '/collections/' + i3,
              schemaPath: '#/properties/collections/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err370];
            } else {
              vErrors.push(err370);
            }
            errors++;
          }
        }
        if (
          schema40.properties.collections.uniqueItemProperties
            .map(property =>
              data29
                .map(item => item && item[property])
                .some((value, index, array) => array.indexOf(value) !== index),
            )
            .some(value => value)
        ) {
          const err371 = {
            instancePath: instancePath + '/collections',
            schemaPath: '#/properties/collections/uniqueItemProperties',
            keyword: 'uniqueItemProperties',
            params: {},
            message: 'must pass "uniqueItemProperties" keyword validation',
          };
          if (vErrors === null) {
            vErrors = [err371];
          } else {
            vErrors.push(err371);
          }
          errors++;
        }
      } else {
        const err372 = {
          instancePath: instancePath + '/collections',
          schemaPath: '#/properties/collections/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err372];
        } else {
          vErrors.push(err372);
        }
        errors++;
      }
    }
    if (data.editor !== undefined) {
      let data223 = data.editor;
      if (data223 && typeof data223 == 'object' && !Array.isArray(data223)) {
        if (data223.preview !== undefined) {
          if (typeof data223.preview !== 'boolean') {
            const err373 = {
              instancePath: instancePath + '/editor/preview',
              schemaPath: '#/properties/editor/properties/preview/type',
              keyword: 'type',
              params: { type: 'boolean' },
              message: 'must be boolean',
            };
            if (vErrors === null) {
              vErrors = [err373];
            } else {
              vErrors.push(err373);
            }
            errors++;
          }
        }
      } else {
        const err374 = {
          instancePath: instancePath + '/editor',
          schemaPath: '#/properties/editor/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err374];
        } else {
          vErrors.push(err374);
        }
        errors++;
      }
    }
  } else {
    const err375 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err375];
    } else {
      vErrors.push(err375);
    }
    errors++;
  }
  validate24.errors = vErrors;
  return errors === 0;
}
