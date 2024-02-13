import { defineCustomElement, h, createApp, getCurrentInstance } from "vue";

export const vueDefineCustomElement = (component, { plugins = [] } = {}) =>
  defineCustomElement({
    ...component,
    styles: [`
      * {
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
      input {
        display: block;
        width: 100%;
        height: 40px;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        margin-bottom: 8px;
      }
      form {
        width: 100%;
      }
      button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        cursor: pointer;
        margin-left: auto;
        align-self: flex-end;
        display: flex;
      }
      .border-red-500 {
        border-color: red;
      }
      .text-red-500 {
        color: red;
      }
    `],
    setup(props, { emit }) {
      const app = createApp(component);

      // install plugins
      plugins.forEach(app.use);

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);

      // translate events
      const toCamelCase = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);
      let events = {};
      if (inst.emitsOptions) {
        events = Object.keys(inst.emitsOptions).reduce((acc, key) => {
          acc[`on${toCamelCase(key)}`] = (...args) => emit(key, ...args);
          return acc;
        }, {});
      }

      return () =>
        h(component, {
          ...props,
          ...events,
        });
    },
  });
