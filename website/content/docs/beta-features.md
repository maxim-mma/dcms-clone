---
group: Configuration
weight: 200
title: Beta Features!
---
We run new functionality in an open beta format from time to time. That means that this functionality is totally available for use, and we *think* it might be ready for primetime, but it could break or change without notice.

**Use these features at your own risk.**







## List/Object Widget: Variable Types

Before this feature, the [list widget](/docs/widgets/#list) and [object widget](/docs/widget/#object) allowed a set of fields to be repeated, but every item had the same set of fields available. With variable types, multiple named sets of fields can be defined, which opens the door to highly flexible content authoring (even page building) in Decap CMS.

**Note: this feature does not yet support default previews and requires [registering a preview template](/docs/customization#registerpreviewtemplate) in order to show up in the preview pane.**

To use variable types in the list widget, update your field configuration as follows:

1. Instead of defining your list fields under `fields` or `field`, define them under `types`. Similar to `fields`, `types` must be an array of field definition objects.
2. Each field definition under `types` must use the `object` widget (this is the default value for
   `widget`).

### Additional list widget options

* `types`: a nested list of object widgets. All widgets must be of type `object`. Every object widget may define different set of fields.
* `typeKey`: the name of the field that will be added to every item in list representing the name of the object widget that item belongs to. Ignored if `types` is not defined. Default is `type`.
* `summary`: allows customization of a collapsed list item object in a similar way to a [collection summary](/docs/configuration-options/?#summary)

### Example Configuration

The example configuration below imagines a scenario where the editor can add two "types" of content,
either a "carousel" or a "spotlight". Each type has a unique name and set of fields.

```yaml
- label: 'Home Section'
  name: 'sections'
  widget: 'list'
  types:
    - label: 'Carousel'
      name: 'carousel'
      widget: object
      summary: '{{fields.header}}'
      fields:
        - { label: Header, name: header, widget: string, default: 'Image Gallery' }
        - { label: Template, name: template, widget: string, default: 'carousel.html' }
        - label: Images
          name: images
          widget: list
          field: { label: Image, name: image, widget: image }
    - label: 'Spotlight'
      name: 'spotlight'
      widget: object
      fields:
        - { label: Header, name: header, widget: string, default: 'Spotlight' }
        - { label: Template, name: template, widget: string, default: 'spotlight.html' }
        - { label: Text, name: text, widget: text, default: 'Hello World' }
```

### Example Output

The output for the list widget will be an array of objects, and each object will have a `type` key
with the name of the type used for the list item. The `type` key name can be customized via the
`typeKey` property in the list configuration.

If the above example configuration were used to create a carousel, a spotlight, and another
carousel, the output could look like this:

```yaml
title: Home
sections:
  - type: carousel
    header: Image Gallery
    template: carousel.html
    images:
      - images/image01.png
      - images/image02.png
      - images/image03.png
  - type: spotlight
    header: Spotlight
    template: spotlight.html
    text: Hello World
  - type: carousel
    header: Image Gallery
    template: carousel.html
    images:
      - images/image04.png
      - images/image05.png
      - images/image06.png
```







## Summary string template transformations

You can apply transformations on fields in a summary string template using filter notation syntax.

Example config:

```yaml
collections:
  - name: 'posts'
    label: 'Posts'
    folder: '_posts'
    summary: "{{title | upper}} - {{date | date('YYYY-MM-DD')}} – {{body | truncate(20, '***')}}"
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Publish Date', name: 'date', widget: 'datetime' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

The above config will transform the title field to uppercase and format the date field using `YYYY-MM-DD` format.
Available transformations are `upper`, `lower`, `date('<format>')`, `default('defaultValue')`, `ternary('valueForTrue','valueForFalse')` and `truncate(<number>)`/`truncate(<number>, '<string>')`  




## Remark plugins

You can register plugins to customize [`remark`](https://github.com/remarkjs/remark), the library used by the richtext editor for serializing and deserializing markdown.

```js
// register a plugin
CMS.registerRemarkPlugin(plugin);

// provide global settings to all plugins, e.g. for customizing `remark-stringify`
CMS.registerRemarkPlugin({ settings: { bullet: '-' } });
```

Note that `netlify-widget-markdown` currently uses `remark@10`, so you should check a plugin's compatibility first.
