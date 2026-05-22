import { a5 as vueExports, G as serverRenderer_cjs_prodExports, _ as __nuxt_component_0$1, c as _sfc_main$8, z as navigateTo } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-BRUpc_qj.mjs';
import { _ as _sfc_main$2 } from './FormField-KZZrgtfg.mjs';
import { _ as _sfc_main$3 } from './Input-CnoieYvP.mjs';
import { _ as _sfc_main$4 } from './Select-5iHH8d-R.mjs';
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
import './Label-kSvTA8Tk.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const ROLES = [
      { label: "Parent", value: "parent" },
      { label: "Teacher", value: "teacher" },
      { label: "School Admin", value: "school_admin" },
      { label: "District Admin", value: "district_admin" },
      { label: "County Admin", value: "county_admin" },
      { label: "Super Admin", value: "super_admin" }
    ];
    const form = vueExports.reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "parent"
    });
    const loading = vueExports.ref(false);
    const error = vueExports.ref("");
    async function handleCreate() {
      if (!form.firstName || !form.email || !form.password) {
        error.value = "First name, email, and password are required";
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        await $fetch("/api/auth/register", {
          method: "POST",
          body: form
        });
        await navigateTo("/admin/users");
      } catch (err) {
        const e = err;
        error.value = e.data?.message ?? "Failed to create user";
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UButton = _sfc_main$8;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_USelect = _sfc_main$4;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-6 max-w-2xl" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/admin/users" }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              icon: "i-heroicons-arrow-left",
              size: "sm"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to users `);
                } else {
                  return [
                    vueExports.createTextVNode(" Back to users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                variant: "ghost",
                icon: "i-heroicons-arrow-left",
                size: "sm"
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode(" Back to users ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><h2 class="text-2xl font-bold text-foreground"> Create User </h2><p class="text-sm text-muted-foreground mt-1"> Add a new user to the system </p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
              label: "First name",
              required: ""
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(form).firstName,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).firstName = $event,
                    placeholder: "Jane"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).firstName,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).firstName = $event,
                      placeholder: "Jane"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "Last name" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(form).lastName,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).lastName = $event,
                    placeholder: "Smith"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).lastName,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).lastName = $event,
                      placeholder: "Smith"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
              label: "Email",
              required: ""
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(form).email,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).email = $event,
                    type: "email",
                    placeholder: "jane@example.com"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).email,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).email = $event,
                      type: "email",
                      placeholder: "jane@example.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
              label: "Password",
              required: ""
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(form).password,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                    type: "password",
                    placeholder: "Temporary password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                      type: "password",
                      placeholder: "Temporary password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "Role" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                    modelValue: vueExports.unref(form).role,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).role = $event,
                    items: ROLES
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_USelect, {
                      modelValue: vueExports.unref(form).role,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).role = $event,
                      items: ROLES
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
            _push2(`<div class="flex gap-3 pt-2"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "primary",
              loading: vueExports.unref(loading)
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create user `);
                } else {
                  return [
                    vueExports.createTextVNode(" Create user ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/admin/users" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "outline",
                    color: "neutral"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UButton, {
                      variant: "outline",
                      color: "neutral"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vueExports.createVNode("form", {
                class: "space-y-4",
                onSubmit: vueExports.withModifiers(handleCreate, ["prevent"])
              }, [
                vueExports.createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                  vueExports.createVNode(_component_UFormField, {
                    label: "First name",
                    required: ""
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).firstName,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).firstName = $event,
                        placeholder: "Jane"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, { label: "Last name" }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).lastName,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).lastName = $event,
                        placeholder: "Smith"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                vueExports.createVNode(_component_UFormField, {
                  label: "Email",
                  required: ""
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).email,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).email = $event,
                      type: "email",
                      placeholder: "jane@example.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UFormField, {
                  label: "Password",
                  required: ""
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                      type: "password",
                      placeholder: "Temporary password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UFormField, { label: "Role" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_USelect, {
                      modelValue: vueExports.unref(form).role,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).role = $event,
                      items: ROLES
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.unref(error) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "text-sm text-red-500"
                }, vueExports.toDisplayString(vueExports.unref(error)), 1)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", { class: "flex gap-3 pt-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    type: "submit",
                    color: "primary",
                    loading: vueExports.unref(loading)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Create user ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  vueExports.createVNode(_component_NuxtLink, { to: "/admin/users" }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UButton, {
                        variant: "outline",
                        color: "neutral"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-CHx2brus.mjs.map
