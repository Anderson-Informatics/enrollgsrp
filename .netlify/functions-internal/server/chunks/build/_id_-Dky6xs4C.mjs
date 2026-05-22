import { a5 as vueExports, a1 as useRoute$1, L as useAsyncData, G as serverRenderer_cjs_prodExports, c as _sfc_main$8, d as _sfc_main$d, K as useAppConfig, Q as useComponentUI, X as useForwardPropsEmits, C as reactivePick, S as useFormField, I as tv, b as Primitive, a3 as useVModel, U as useForwardExpose, h as createContext, $ as usePrimitiveElement, V as VisuallyHidden_default } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-BRUpc_qj.mjs';
import { _ as _sfc_main$3, u as useFormControl } from './Select-5iHH8d-R.mjs';
import { L as Label_default } from './Label-kSvTA8Tk.mjs';
import { u as useApi } from './useApi-DoKmTMMO.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
import 'bcrypt';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'tailwindcss/colors';
import 'node:stream';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue';

var VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = vueExports.computed(() => props.checked ?? props.value);
    vueExports.watch(valueState, (cur, prev) => {
      if (!currentElement.value) return;
      const input = currentElement.value;
      const inputProto = (void 0).HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(VisuallyHidden_default, vueExports.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, {
        ...props,
        ..._ctx.$attrs
      }, { as: "input" }), null, 16);
    };
  }
});
var VisuallyHiddenInputBubble_default = VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default;
var VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const isFormArrayEmptyAndRequired = vueExports.computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
    const parsedValue = vueExports.computed(() => {
      if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
        name: props.name,
        value: props.value
      }];
      else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
        if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
          name: `${props.name}[${index}][${key}]`,
          value
        }));
        else return {
          name: `${props.name}[${index}]`,
          value: obj
        };
      });
      else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
        name: `${props.name}[${key}]`,
        value
      }));
      return [];
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, null, [vueExports.createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (vueExports.openBlock(), vueExports.createBlock(VisuallyHiddenInputBubble_default, vueExports.mergeProps({ key: _ctx.name }, {
        ...props,
        ..._ctx.$attrs
      }, {
        name: _ctx.name,
        value: _ctx.value
      }), null, 16, ["name", "value"])) : (vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, { key: 1 }, vueExports.renderList(parsedValue.value, (parsed) => {
        return vueExports.openBlock(), vueExports.createBlock(VisuallyHiddenInputBubble_default, vueExports.mergeProps({ key: parsed.name }, { ref_for: true }, {
          ...props,
          ..._ctx.$attrs
        }, {
          name: parsed.name,
          value: parsed.value
        }), null, 16, ["name", "value"]);
      }), 128))], 2112);
    };
  }
});
var VisuallyHiddenInput_default = VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default;
const [injectSwitchRootContext, provideSwitchRootContext] = /* @__PURE__ */ createContext("SwitchRoot");
var SwitchRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: "on"
    },
    trueValue: {
      type: null,
      required: false,
      default: () => true
    },
    falseValue: {
      type: null,
      required: false,
      default: () => false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = vueExports.toRefs(props);
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue ?? props.falseValue,
      passive: props.modelValue === void 0
    });
    const checked = vueExports.computed(() => modelValue.value === props.trueValue);
    function toggleCheck() {
      if (disabled.value) return;
      modelValue.value = checked.value ? props.falseValue : props.trueValue;
    }
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = vueExports.computed(() => props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      checked,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vueExports.unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": checked.value,
        "aria-required": _ctx.required,
        "data-state": checked.value ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: vueExports.unref(disabled),
        onClick: toggleCheck,
        onKeydown: vueExports.withKeys(vueExports.withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          modelValue: vueExports.unref(modelValue),
          checked: checked.value
        }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
          key: 0,
          type: "checkbox",
          name: _ctx.name,
          disabled: vueExports.unref(disabled),
          required: _ctx.required,
          value: _ctx.value,
          checked: checked.value
        }, null, 8, [
          "name",
          "disabled",
          "required",
          "value",
          "checked"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "id",
        "type",
        "value",
        "aria-label",
        "aria-checked",
        "aria-required",
        "data-state",
        "data-disabled",
        "as-child",
        "as",
        "disabled",
        "onKeydown"
      ]);
    };
  }
});
var SwitchRoot_default = SwitchRoot_vue_vue_type_script_setup_true_lang_default;
var SwitchThumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const rootContext = injectSwitchRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "data-state": vueExports.unref(rootContext).checked.value ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
});
var SwitchThumb_default = SwitchThumb_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "root": "relative flex items-start",
    "base": [
      "inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented",
      "transition-[background] duration-200"
    ],
    "container": "flex items-center",
    "thumb": "group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center",
    "icon": [
      "absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12",
      "transition-[color,opacity] duration-200"
    ],
    "wrapper": "ms-2",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "data-[state=checked]:bg-primary focus-visible:outline-primary",
        "icon": "group-data-[state=checked]:text-primary"
      },
      "secondary": {
        "base": "data-[state=checked]:bg-secondary focus-visible:outline-secondary",
        "icon": "group-data-[state=checked]:text-secondary"
      },
      "success": {
        "base": "data-[state=checked]:bg-success focus-visible:outline-success",
        "icon": "group-data-[state=checked]:text-success"
      },
      "info": {
        "base": "data-[state=checked]:bg-info focus-visible:outline-info",
        "icon": "group-data-[state=checked]:text-info"
      },
      "warning": {
        "base": "data-[state=checked]:bg-warning focus-visible:outline-warning",
        "icon": "group-data-[state=checked]:text-warning"
      },
      "error": {
        "base": "data-[state=checked]:bg-error focus-visible:outline-error",
        "icon": "group-data-[state=checked]:text-error"
      },
      "neutral": {
        "base": "data-[state=checked]:bg-inverted focus-visible:outline-inverted",
        "icon": "group-data-[state=checked]:text-highlighted"
      }
    },
    "size": {
      "xs": {
        "base": "w-7",
        "container": "h-4",
        "thumb": "size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "w-8",
        "container": "h-4",
        "thumb": "size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "w-9",
        "container": "h-5",
        "thumb": "size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "w-10",
        "container": "h-5",
        "thumb": "size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "w-11",
        "container": "h-6",
        "thumb": "size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5",
        "wrapper": "text-base"
      }
    },
    "checked": {
      "true": {
        "icon": "group-data-[state=checked]:opacity-100"
      }
    },
    "unchecked": {
      "true": {
        "icon": "group-data-[state=unchecked]:opacity-100"
      }
    },
    "loading": {
      "true": {
        "icon": "animate-spin"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    }
  },
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USwitch",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    uncheckedIcon: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    value: { type: String, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    trueValue: { type: null, required: false },
    falseValue: { type: null, required: false }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = vueExports.useSlots();
    const emits = __emit;
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("switch", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = _id.value ?? vueExports.useId();
    const attrs = vueExports.useAttrs();
    const forwardedAttrs = vueExports.computed(() => {
      const { "data-state": _, ...rest } = attrs;
      return rest;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.switch || {} })({
      size: size.value,
      color: color.value,
      required: props.required,
      loading: props.loading,
      disabled: disabled.value || props.loading
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.container({ class: vueExports.unref(uiProp)?.container }))}"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
              name: vueExports.unref(name),
              disabled: vueExports.unref(disabled) || __props.loading,
              "data-slot": "base",
              class: ui.value.base({ class: vueExports.unref(uiProp)?.base }),
              "onUpdate:modelValue": onUpdate
            }), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SwitchThumb_default), {
                    "data-slot": "thumb",
                    class: ui.value.thumb({ class: vueExports.unref(uiProp)?.thumb })
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.loading) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                            name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true, unchecked: true })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          if (__props.checkedIcon) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                              name: __props.checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.uncheckedIcon) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                              name: __props.uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, unchecked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        }
                      } else {
                        return [
                          __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true, unchecked: true })
                          }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                            __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: __props.checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                            __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 1,
                              name: __props.uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, unchecked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                          ], 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: vueExports.unref(uiProp)?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: __props.uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Label_default), {
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p data-slot="description" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.description({ class: vueExports.unref(uiProp)?.description }))}"${_scopeId}>`);
                serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(uiProp)?.container })
              }, [
                vueExports.createVNode(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
                  name: vueExports.unref(name),
                  disabled: vueExports.unref(disabled) || __props.loading,
                  "data-slot": "base",
                  class: ui.value.base({ class: vueExports.unref(uiProp)?.base }),
                  "onUpdate:modelValue": onUpdate
                }), {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: vueExports.unref(uiProp)?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: __props.uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper })
              }, [
                __props.label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Label_default), {
                  key: 0,
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : vueExports.createCommentVNode("", true),
                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true)
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.7.1_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@netlify+_973710bc93b7c9087ede7bb193bd0af6/node_modules/@nuxt/ui/dist/runtime/components/Switch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const $api = useApi();
    const route = useRoute$1();
    const userId = route.params.id;
    const ALL_ROLES = [
      { label: "Super Admin", value: "super_admin" },
      { label: "County Admin", value: "county_admin" },
      { label: "District Admin", value: "district_admin" },
      { label: "School Admin", value: "school_admin" },
      { label: "Teacher", value: "teacher" },
      { label: "Parent", value: "parent" }
    ];
    const ADMIN_ROLES = ["super_admin", "county_admin", "district_admin", "school_admin"];
    const { data: userData, refresh: refreshUser } = useAsyncData(
      `user-${userId}`,
      () => $api(`/api/admin/users/${userId}`)
    );
    const { data: permCatalog } = useAsyncData(
      "permission-catalog",
      () => $api("/api/admin/permissions")
    );
    const user = vueExports.computed(() => userData.value?.user);
    const allPermissions = vueExports.computed(() => permCatalog.value?.permissions ?? []);
    const permissionsByCategory = vueExports.computed(() => {
      const map = {};
      for (const p of allPermissions.value) {
        if (!map[p.category]) map[p.category] = [];
        map[p.category].push(p);
      }
      return map;
    });
    const editedRole = vueExports.ref("");
    const editedIsActive = vueExports.ref(true);
    const saving = vueExports.ref(false);
    const saveError = vueExports.ref("");
    const saveSuccess = vueExports.ref("");
    vueExports.watch(user, (u) => {
      if (u) {
        editedRole.value = u.role;
        editedIsActive.value = u.isActive;
      }
    }, { immediate: true });
    async function saveProfile() {
      saving.value = true;
      saveError.value = "";
      saveSuccess.value = "";
      try {
        await $api(`/api/admin/users/${userId}`, {
          method: "PATCH",
          body: { role: editedRole.value, isActive: editedIsActive.value }
        });
        await refreshUser();
        saveSuccess.value = "Profile saved";
      } catch (err) {
        const e = err;
        saveError.value = e.data?.message ?? "Failed to save";
      } finally {
        saving.value = false;
      }
    }
    function userHasPermission(code) {
      return user.value?.permissions.includes(code) ?? false;
    }
    const permSaving = vueExports.ref(false);
    const permError = vueExports.ref("");
    const permSuccess = vueExports.ref("");
    async function togglePermission(code) {
      if (!user.value) return;
      permSaving.value = true;
      permError.value = "";
      permSuccess.value = "";
      const has = userHasPermission(code);
      try {
        await $api(`/api/admin/users/${userId}/permissions`, {
          method: "PATCH",
          body: has ? { revoke: [code] } : { grant: [code] }
        });
        await refreshUser();
        permSuccess.value = `Permission ${has ? "revoked" : "granted"}`;
      } catch (err) {
        const e = err;
        permError.value = e.data?.message ?? "Failed to update permission";
      } finally {
        permSaving.value = false;
      }
    }
    const savedRoleIsParent = vueExports.computed(() => user.value?.role === "parent");
    const availableRoles = vueExports.computed(
      () => savedRoleIsParent.value ? ALL_ROLES.filter((r) => r.value === "parent") : ALL_ROLES.filter((r) => r.value !== "parent")
    );
    const showPermissions = vueExports.computed(() => ADMIN_ROLES.includes(editedRole.value));
    function categoryLabel(cat) {
      return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UCard = _sfc_main$2;
      const _component_USelect = _sfc_main$3;
      const _component_USwitch = _sfc_main$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-6 max-w-4xl" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        to: "/admin/users",
        variant: "ghost",
        icon: "i-heroicons-arrow-left",
        size: "sm"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back to users `);
          } else {
            return [
              vueExports.createTextVNode(" Back to users ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!vueExports.unref(user)) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-6 h-6 animate-spin text-muted-foreground"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
          header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="text-lg font-semibold"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(user).firstName)} ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(user).lastName)}</h3><p class="text-sm text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(user).email)}</p>`);
            } else {
              return [
                vueExports.createVNode("h3", { class: "text-lg font-semibold" }, vueExports.toDisplayString(vueExports.unref(user).firstName) + " " + vueExports.toDisplayString(vueExports.unref(user).lastName), 1),
                vueExports.createVNode("p", { class: "text-sm text-muted-foreground" }, vueExports.toDisplayString(vueExports.unref(user).email), 1)
              ];
            }
          }),
          footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                color: "primary",
                loading: vueExports.unref(saving),
                onClick: saveProfile
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Save profile `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Save profile ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  color: "primary",
                  loading: vueExports.unref(saving),
                  onClick: saveProfile
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" Save profile ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ];
            }
          }),
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium mb-1"${_scopeId}>Role</label>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(editedRole),
                "onUpdate:modelValue": ($event) => vueExports.isRef(editedRole) ? editedRole.value = $event : null,
                items: vueExports.unref(availableRoles),
                disabled: vueExports.unref(savedRoleIsParent)
              }, null, _parent2, _scopeId));
              if (vueExports.unref(savedRoleIsParent)) {
                _push2(`<p class="text-xs text-muted-foreground mt-1"${_scopeId}> Parent role cannot be changed. </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-end gap-3"${_scopeId}><label class="block text-sm font-medium mb-2"${_scopeId}>Active account</label>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
                modelValue: vueExports.unref(editedIsActive),
                "onUpdate:modelValue": ($event) => vueExports.isRef(editedIsActive) ? editedIsActive.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (vueExports.unref(saveError)) {
                _push2(`<div class="text-sm text-red-500"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(saveError))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(saveSuccess)) {
                _push2(`<div class="text-sm text-green-600"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(saveSuccess))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "space-y-4" }, [
                  vueExports.createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                    vueExports.createVNode("div", null, [
                      vueExports.createVNode("label", { class: "block text-sm font-medium mb-1" }, "Role"),
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(editedRole),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(editedRole) ? editedRole.value = $event : null,
                        items: vueExports.unref(availableRoles),
                        disabled: vueExports.unref(savedRoleIsParent)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"]),
                      vueExports.unref(savedRoleIsParent) ? (vueExports.openBlock(), vueExports.createBlock("p", {
                        key: 0,
                        class: "text-xs text-muted-foreground mt-1"
                      }, " Parent role cannot be changed. ")) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("div", { class: "flex items-end gap-3" }, [
                      vueExports.createVNode("label", { class: "block text-sm font-medium mb-2" }, "Active account"),
                      vueExports.createVNode(_component_USwitch, {
                        modelValue: vueExports.unref(editedIsActive),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(editedIsActive) ? editedIsActive.value = $event : null
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  vueExports.unref(saveError) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, vueExports.toDisplayString(vueExports.unref(saveError)), 1)) : vueExports.createCommentVNode("", true),
                  vueExports.unref(saveSuccess) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "text-sm text-green-600"
                  }, vueExports.toDisplayString(vueExports.unref(saveSuccess)), 1)) : vueExports.createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (vueExports.unref(showPermissions)) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
            header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}> Permissions </h3><span class="text-sm text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(user).permissions.length)} active </span></div><p class="text-sm text-muted-foreground mt-1"${_scopeId}> Custom permission overrides — changes take effect immediately. </p>`);
              } else {
                return [
                  vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                    vueExports.createVNode("h3", { class: "text-lg font-semibold" }, " Permissions "),
                    vueExports.createVNode("span", { class: "text-sm text-muted-foreground" }, vueExports.toDisplayString(vueExports.unref(user).permissions.length) + " active ", 1)
                  ]),
                  vueExports.createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, " Custom permission overrides — changes take effect immediately. ")
                ];
              }
            }),
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (vueExports.unref(permError)) {
                  _push2(`<div class="mb-4 text-sm text-red-500"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(permError))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (vueExports.unref(permSuccess)) {
                  _push2(`<div class="mb-4 text-sm text-green-600"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(permSuccess))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (vueExports.unref(allPermissions).length === 0) {
                  _push2(`<div class="text-sm text-muted-foreground py-4"${_scopeId}> Loading permission catalog… </div>`);
                } else {
                  _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(permissionsByCategory), (perms, category) => {
                    _push2(`<div${_scopeId}><h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(categoryLabel(String(category)))}</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-2"${_scopeId}><!--[-->`);
                    serverRenderer_cjs_prodExports.ssrRenderList(perms, (perm) => {
                      _push2(`<label class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "opacity-50": vueExports.unref(permSaving) }, "flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/40 transition-colors"])}"${_scopeId}><input type="checkbox" class="rounded border-border accent-primary"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(userHasPermission(perm.code)) ? " checked" : ""}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(permSaving)) ? " disabled" : ""}${_scopeId}><div${_scopeId}><p class="text-sm font-medium"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(perm.name)}</p><p class="text-xs text-muted-foreground font-mono"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(perm.code)}</p></div></label>`);
                    });
                    _push2(`<!--]--></div></div>`);
                  });
                  _push2(`<!--]--></div>`);
                }
              } else {
                return [
                  vueExports.unref(permError) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "mb-4 text-sm text-red-500"
                  }, vueExports.toDisplayString(vueExports.unref(permError)), 1)) : vueExports.createCommentVNode("", true),
                  vueExports.unref(permSuccess) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "mb-4 text-sm text-green-600"
                  }, vueExports.toDisplayString(vueExports.unref(permSuccess)), 1)) : vueExports.createCommentVNode("", true),
                  vueExports.unref(allPermissions).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 2,
                    class: "text-sm text-muted-foreground py-4"
                  }, " Loading permission catalog… ")) : (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 3,
                    class: "space-y-6"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(permissionsByCategory), (perms, category) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", { key: category }, [
                        vueExports.createVNode("h4", { class: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3" }, vueExports.toDisplayString(categoryLabel(String(category))), 1),
                        vueExports.createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(perms, (perm) => {
                            return vueExports.openBlock(), vueExports.createBlock("label", {
                              key: perm.code,
                              class: ["flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/40 transition-colors", { "opacity-50": vueExports.unref(permSaving) }]
                            }, [
                              vueExports.createVNode("input", {
                                type: "checkbox",
                                class: "rounded border-border accent-primary",
                                checked: userHasPermission(perm.code),
                                disabled: vueExports.unref(permSaving),
                                onChange: ($event) => togglePermission(perm.code)
                              }, null, 40, ["checked", "disabled", "onChange"]),
                              vueExports.createVNode("div", null, [
                                vueExports.createVNode("p", { class: "text-sm font-medium" }, vueExports.toDisplayString(perm.name), 1),
                                vueExports.createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, vueExports.toDisplayString(perm.code), 1)
                              ])
                            ], 2);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Dky6xs4C.mjs.map
