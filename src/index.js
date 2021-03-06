module.exports = function(schema, option) {
  const {_, prettier} = option;

  // template
  const template = [];

  // imports
  const imports = [];

  // Global Public Functions
  const utils = [];

  // data
  const datas = [];

  const defaultProps = {};

  // methods
  const methods = [];

  const expressionName = [];

  // lifeCycles
  const lifeCycles = [];

  // styles
  const styles = [];

  const styles4vw = [];

  // box relative style
  const boxStyleList = ['fontSize', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'height', 'top', 'bottom', 'width', 'maxWidth', 'left', 'right', 'paddingRight', 'paddingLeft', 'marginLeft', 'marginRight', 'lineHeight', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'borderTopRightRadius', 'borderTopLeftRadius', 'borderRadius'];

  // no unit style
  const noUnitStyles = ['opacity', 'fontWeight'];

  const lifeCycleMap = {
    '_constructor': 'created',
    'getDerivedStateFromProps': 'beforeUpdate',
    'render': '',
    'componentDidMount': 'mounted',
    'componentDidUpdate': 'updated',
    'componentWillUnmount': 'beforeDestroy'
  }

  // console.log('schema.rect.width: ', schema.rect.width);
  const width = schema.rect.width || 750;
  // const viewportWidth = option.responsive.viewportWidth || 750;

  // 1rpx = width / 750 px
  let existDesignWidth = !!schema.props.designWidth;
  let designWidth = schema.props.designWidth || 750;
  const _w = ( 750 / width);
  console.log(`_w: ${_w}`);
  // const _ratio = width / width;
  // console.log(`_ratio: ${_ratio}`);

  // 如果组件配置了属性responsive==vw，则返回true
  const isResponsiveVW = () => {
    return schema.props.responsive == 'vw';
  }

  const isExpression = (value) => {
    return /^\{\{.*\}\}$/.test(value);
  }

  const transformEventName = (name) => {
    return name.replace('on', '').toLowerCase();
  }

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      })
    }

    return String(value);
  };

  // convert to responsive unit, such as rpx
  const parseStyle = (style, toRpx) => {
    const styleData = [];
    for (let key in style) {
      let value = style[key];
      if (boxStyleList.indexOf(key) != -1) {
        // 如果组件配置了属性responsive==vw，那么使用vw单位.
        if (isResponsiveVW()) {
          value = (parseInt(value)).toFixed(2);
          value = value == 0 ? value : (value*100/designWidth).toFixed(2) + 'vw';
        } else {
          if (toRpx) {
            if (existDesignWidth) {
              value = (parseInt(value)).toFixed(2);
              value = value == 0 ? value : (value*750/designWidth).toFixed(2) + 'rpx';
            } else {
              value = (parseInt(value) * _w).toFixed(2);
              value = value == 0 ? value : value + 'rpx';
            }
          } else {
            value = (parseInt(value)).toFixed(2);
            value = value == 0 ? value : value + 'px';
          }
        }
        
        // console.log('key: ', key, value);
        styleData.push(`${_.kebabCase(key)}: ${value}`);
      } else if (noUnitStyles.indexOf(key) != -1) {
        // console.log('key: ', key, value);
        styleData.push(`${_.kebabCase(key)}: ${isNaN(parseFloat(value)) ? value : parseFloat(value) }`);
      } else {
        styleData.push(`${_.kebabCase(key)}: ${value}`);
      }
    }
    return styleData.join(';');
  }

  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const name = funcString.slice(funcString.indexOf('function'), funcString.indexOf('(')).replace('function ','');
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content,
      name
    };
  }

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode, constantName) => {
    // console.log(`parseProps:`, value, isReactNode, constantName);
    if (typeof value === 'string') {
      if (isExpression(value)) {
        if (isReactNode) {
          return `{{${value.slice(7, -2)}}}`;
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        defaultProps[_.camelCase(constantName)] = value;
        return `{{${_.camelCase(constantName)}}}`;
      } else if (constantName) { // save to constant
        defaultProps[_.camelCase(constantName)] = value;
        return `"${_.camelCase(constantName)}"`;
      } else {
        return `"${value}"`;
      }
    } else if (typeof value === 'function') {
      const {params, content, name} = parseFunction(value);
      expressionName[name] = expressionName[name] ? expressionName[name] + 1 : 1;
      methods.push(`${name}_${expressionName[name]}(${params}) {${content}}`);
      return `${name}_${expressionName[name]}`;
    }
  }

  const parsePropsKey = (key, value) => {
    if (typeof value === 'function') {
      return `@${transformEventName(key)}`;
    } else {
      return `:${key}`;
    }
  }

  // parse async dataSource
  const parseDataSource = (data) => {
    const name = data.id;
    const {uri, method, params} = data.options;
    const action = data.description || 'getOne';
    let payload = {};

    if (imports.indexOf(`import {getOne, getAll} from '@/common/request'`) === -1) {
      imports.push(`import {getOne, getAll} from '@/common/request'`);
    }

    Object.keys(data.options).forEach((key) => {
      if (['uri', 'method', 'params'].indexOf(key) === -1) {
        payload[key] = toString(data.options[key]);
      }
    });

    // params parse should in string template
    if (params) {
      payload = `${isExpression(params) ? parseProps(params) : toString(params)}`;
    } else {
      payload = toString(payload);
    }

    let result;
    if (action == 'getOne') {
      result = `{
        ${action}(${parseProps(uri)})
          .then((response) => response.data.data.data)`;
    } else {
      result = `{
      ${action}(${parseProps(uri)}, ${toString(payload)})
        .then((response) => response.data.data.data.records)`;
    }

    if (data.dataHandler) {
      const { params, content } = parseFunction(data.dataHandler);
      result += `.then((${params}) => {${content}})
        .catch((e) => {
          console.log('error', e);
        })
      `
    }

    result += '}';

    return `${name}() ${result}`;
  }

  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {
    const tagEnd = render.indexOf('>');
    let _condition = isExpression(condition) ? condition.slice(2, -2) : condition;
    _condition = _condition.replace('this.', '');
    render = `
      ${render.slice(0, tagEnd)}
      v-if="${_condition}"  
      ${render.slice(tagEnd)}`;

    return render;
  }

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = 'loopData';
      datas.push(`${data}: ${toString(loop)}`);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2).replace('this.state.', '');
    }
    // add loop key
    const tagEnd = render.indexOf('>');
    const keyProp = render.slice(0, tagEnd).indexOf('key=') == -1 ? `:key="${loopArgIndex}"` : '';
    render = `
      ${render.slice(0, tagEnd)}
      v-for="(${loopArgItem}, ${loopArgIndex}) in ${data}"  
      ${keyProp}
      ${render.slice(tagEnd)}`;

    // remove `this` 
    const re = new RegExp(`this.${loopArgItem}`, 'g')
    render = render.replace(re, loopArgItem);

    return render;
  }

  // generate render xml
  const generateRender = (schema) => {
    const type = schema.componentName.toLowerCase();
    const className = schema.props && schema.props.className;
    const classString = className ? ` class="${className}"` : '';

    if (className) {
      styles.push(`
        .${className} {
          ${parseStyle(schema.props.style)}
        }
      `);
      styles4vw.push(`
        .${className} {
          ${parseStyle(schema.props.style, true)}
        }
      `);
    }

    let xml;
    let props = '';

    Object.keys(schema.props).forEach((key) => {
      if (['className', 'style', 'text', 'src', 'hm-component', 'responsive'].indexOf(key) === -1) {
        props += ` ${parsePropsKey(key, schema.props[key])}="${parseProps(schema.props[key])}"`;
      }
    })

    switch(type) {
      case 'text':
        const innerText = parseProps(schema.props.text, true, schema.props.className);
        // console.log(`innerText: ${innerText}`)
        if (schema.props['hm-component']) {
          xml = `<div class="${schema.props.className}">{{"hm-component=${schema.props['hm-component']}"}}</div>`
        } else {
          xml = `<text${classString}${props}>${innerText}</text> `;
        }
        break;
      case 'image':
        const source = parseProps(schema.props.src, false, schema.props.className);
        // 在这里处理将标记了组件key字段的组件进行替换
        if (schema.props['hm-component']) {
          xml = `<div class="${schema.props.className}">{{"hm-component=${schema.props['hm-component']}"}}</div>`
        } else {
          xml = `<image${classString}${props} :src=${source} /> `;
        }
        break;
      case 'div':
      case 'page':
      case 'block':
      case 'component':
        // 在这里处理将标记了组件key字段的组件进行替换
        if (schema.props['hm-component']) {
          xml = `<div class="${schema.props.className}">{{"hm-component=${schema.props['hm-component']}"}}</div>`
        } else {
          if (schema.children && schema.children.length) {
            xml = `<div${classString}${props}>${transform(schema.children)}</div>`;
          } else {
            xml = `<div${classString}${props} />`;
          }
        }
        break;
    }

    if (schema.loop) {
      xml = parseLoop(schema.loop, schema.loopArgs, xml)
    }
    // @TODO: 还未理解schema.condition的含义，后续继续完成。
    // if (schema.condition) {
    //   xml = parseCondition(schema.condition, xml);
    // }

    return xml;
  }

  // parse schema
  const transform = (schema) => {
    let result = '';

    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer);
      });
    } else {
      const type = schema.componentName.toLowerCase();

      if (['page', 'block', 'component'].indexOf(type) !== -1) {
        // 容器组件处理: state/method/dataSource/lifeCycle/render
        const init = [];

        if (schema.state) {
          datas.push(`${toString(schema.state).slice(1, -1)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name}(${params}) {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`)
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`)
            }
            methods.push(parseDataSource(item));
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`${lifeCycleMap['_constructor']}() { ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const vueLifeCircleName = lifeCycleMap[name] || name;
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`${vueLifeCircleName}() {${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${vueLifeCircleName}() {${content}}`);
            }
          });
        }

        template.push(generateRender(schema));

      } else {
        result += generateRender(schema);
      }
    }

    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // start parse schema
  transform(schema);
  // console.log(`defaultProps: ${JSON.stringify(defaultProps)}`);
  datas.push(`defaultProps: ${toString(defaultProps)}`);

  const prettierOpt = {
    parser: 'vue',
    printWidth: 80,
    singleQuote: true
  };

  // /**
  //  * @TODO: 将css转为uni-app的css
  //  * @param {*} css 
  //  */
  // const transformCssToBeUniApp = (css) => {
  //   console.log('css: ', css);
  //   let styles = boxStyleList.concat(noUnitStyles);
  //   console.log('styles: ', styles);
  //   styles.forEach(style => {
  //     let kebabCaseStyle = _.kebabCase(style);
  //     console.log(`kebabCaseStyle: `, kebabCaseStyle);
  //     if (kebabCaseStyle.indexOf('-') > 0) {
  //       let re = new RegExp(kebabCaseStyle, 'gm');
  //       console.log('camelCaseStyle: ', _.camelCase(style));
  //       css = css.replace(re, _.camelCase(style));
  //     }
  //   })
  //   return css;
  // };

  return {
    panelDisplay: [
      {
        panelName: `index.vue`,
        panelValue: prettier.format(`
          <template>
              ${template}
          </template>
          <script>
            ${imports.join('\n')}
            export default {
              data() {
                return ${JSON.stringify(defaultProps)}
              },
              methods: {
                ${methods.join(',\n')}
              },
              ${lifeCycles.join(',\n')}
            }
          </script>
          <style>
          @import "./index.response.css";
          </style>
        `, prettierOpt),
        panelType: 'vue',
      },
      {
        panelName: 'index.response.css',
        panelValue: prettier.format(styles4vw.join('\n'), {parser: 'css'}),
        panelType: 'css'
      }
    ],
    renderData: {
      template: template,
      imports: imports,
      datas: datas,
      methods: methods,
      lifeCycles: lifeCycles,
      styles: styles

    },
    noTemplate: true
  };
}
