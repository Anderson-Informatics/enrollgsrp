import { a5 as vueExports, K as useAppConfig, Q as useComponentUI, I as tv, G as serverRenderer_cjs_prodExports, b as Primitive } from './server.mjs';

const theme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted",
        "title": "text-inverted",
        "description": "text-dimmed"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main = {
  __name: "UCard",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("card", props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description)) {
              _push2(`<div data-slot="header" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.header({ class: vueExports.unref(uiProp)?.header }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                if (__props.title || !!slots.title) {
                  _push2(`<div data-slot="title" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.title({ class: vueExports.unref(uiProp)?.title }))}"${_scopeId}>`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                    _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.title)}`);
                  }, _push2, _parent2, _scopeId);
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.description || !!slots.description) {
                  _push2(`<div data-slot="description" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.description({ class: vueExports.unref(uiProp)?.description }))}"${_scopeId}>`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                    _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.description)}`);
                  }, _push2, _parent2, _scopeId);
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.default) {
              _push2(`<div data-slot="body" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.body({ class: vueExports.unref(uiProp)?.body }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.footer) {
              _push2(`<div data-slot="footer" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.footer({ class: vueExports.unref(uiProp)?.footer }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "header",
                class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
              }, [
                vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                  __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "title",
                    class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true),
                  __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    "data-slot": "description",
                    class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true),
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                "data-slot": "body",
                class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
              }, [
                vueExports.renderSlot(_ctx.$slots, "default")
              ], 2)) : vueExports.createCommentVNode("", true),
              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 2,
                "data-slot": "footer",
                class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
              }, [
                vueExports.renderSlot(_ctx.$slots, "footer")
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.7.1_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@netlify+_973710bc93b7c9087ede7bb193bd0af6/node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Card-BRUpc_qj.mjs.map
