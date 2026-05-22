import { _ as _sfc_main$1 } from './Card-BRUpc_qj.mjs';
import { _ as _sfc_main$2 } from './FormField-KZZrgtfg.mjs';
import { _ as _sfc_main$3 } from './Input-CnoieYvP.mjs';
import { a5 as vueExports, M as useAuth, G as serverRenderer_cjs_prodExports, c as _sfc_main$8, _ as __nuxt_component_0$1, z as navigateTo } from './server.mjs';
import './Label-kSvTA8Tk.mjs';
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

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login } = useAuth();
    const email = vueExports.ref("");
    const password = vueExports.ref("");
    const loading = vueExports.ref(false);
    const error = vueExports.ref("");
    async function handleLogin() {
      if (!email.value || !password.value) {
        error.value = "Please enter your email and password";
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        const res = await login(email.value, password.value);
        if (res.success) {
          await navigateTo("/");
        } else {
          error.value = "Invalid email or password";
        }
      } catch (err) {
        const e = err;
        error.value = e.data?.message ?? "Invalid email or password";
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, vueExports.mergeProps({ class: "w-full max-w-sm" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center py-2"${_scopeId}><h1 class="text-2xl font-bold text-primary mb-1"${_scopeId}> EnrollGSRP </h1><p class="text-sm text-muted-foreground"${_scopeId}> Sign in to your account </p></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "text-center py-2" }, [
                vueExports.createVNode("h1", { class: "text-2xl font-bold text-primary mb-1" }, " EnrollGSRP "),
                vueExports.createVNode("p", { class: "text-sm text-muted-foreground" }, " Sign in to your account ")
              ])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-center text-muted-foreground"${_scopeId}> Don&#39;t have an account? `);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "text-primary font-medium hover:underline"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    vueExports.createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              vueExports.createVNode("p", { class: "text-sm text-center text-muted-foreground" }, [
                vueExports.createTextVNode(" Don't have an account? "),
                vueExports.createVNode(_component_NuxtLink, {
                  to: "/register",
                  class: "text-primary font-medium hover:underline"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" Register ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-4"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "Email" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(email),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                    type: "email",
                    placeholder: "you@example.com",
                    autocomplete: "email",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(email),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                      type: "email",
                      placeholder: "you@example.com",
                      autocomplete: "email",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "Password" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(password),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(password) ? password.value = $event : null,
                    type: "password",
                    placeholder: "••••••••",
                    autocomplete: "current-password",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(password),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(password) ? password.value = $event : null,
                      type: "password",
                      placeholder: "••••••••",
                      autocomplete: "current-password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (vueExports.unref(error)) {
              _push2(`<div class="text-sm text-red-500"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(error))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "primary",
              block: "",
              loading: vueExports.unref(loading)
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in `);
                } else {
                  return [
                    vueExports.createTextVNode(" Sign in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              vueExports.createVNode("form", {
                class: "space-y-4",
                onSubmit: vueExports.withModifiers(handleLogin, ["prevent"])
              }, [
                vueExports.createVNode(_component_UFormField, { label: "Email" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(email),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                      type: "email",
                      placeholder: "you@example.com",
                      autocomplete: "email",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UFormField, { label: "Password" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(password),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(password) ? password.value = $event : null,
                      type: "password",
                      placeholder: "••••••••",
                      autocomplete: "current-password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.unref(error) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "text-sm text-red-500"
                }, vueExports.toDisplayString(vueExports.unref(error)), 1)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode(_component_UButton, {
                  type: "submit",
                  color: "primary",
                  block: "",
                  loading: vueExports.unref(loading)
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" Sign in ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CXDPgk3K.mjs.map
