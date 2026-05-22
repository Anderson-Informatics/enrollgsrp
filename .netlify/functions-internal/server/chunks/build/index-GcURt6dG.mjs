import { a5 as vueExports, L as useAsyncData, G as serverRenderer_cjs_prodExports, c as _sfc_main$8, d as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-CnoieYvP.mjs';
import { _ as _sfc_main$2 } from './Select-5iHH8d-R.mjs';
import { _ as _sfc_main$3 } from './Card-BRUpc_qj.mjs';
import { _ as _sfc_main$4 } from './Badge-72nfR9SL.mjs';
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

const limit = 20;
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const $api = useApi();
    const ROLES = [
      { label: "All roles", value: "all" },
      { label: "Super Admin", value: "super_admin" },
      { label: "County Admin", value: "county_admin" },
      { label: "District Admin", value: "district_admin" },
      { label: "School Admin", value: "school_admin" },
      { label: "Teacher", value: "teacher" },
      { label: "Parent", value: "parent" }
    ];
    const ROLE_LABELS = {
      super_admin: "Super Admin",
      county_admin: "County Admin",
      district_admin: "District Admin",
      school_admin: "School Admin",
      teacher: "Teacher",
      parent: "Parent"
    };
    const search = vueExports.ref("");
    const selectedRole = vueExports.ref("all");
    const page = vueExports.ref(1);
    const debouncedSearch = vueExports.ref("");
    let debounceTimer;
    vueExports.watch(search, (val) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(
        () => {
          debouncedSearch.value = val;
          page.value = 1;
        },
        300
      );
    });
    vueExports.watch(selectedRole, () => {
      page.value = 1;
    });
    const { data, pending } = useAsyncData(
      "admin-users",
      () => {
        const params = new URLSearchParams();
        if (debouncedSearch.value) params.set("search", debouncedSearch.value);
        if (selectedRole.value && selectedRole.value !== "all") params.set("role", selectedRole.value);
        params.set("page", String(page.value));
        params.set("limit", String(limit));
        return $api(
          `/api/admin/users?${params.toString()}`
        );
      },
      { watch: [debouncedSearch, selectedRole, page] }
    );
    const users = vueExports.computed(() => data.value?.users ?? []);
    const total = vueExports.computed(() => data.value?.total ?? 0);
    const totalPages = vueExports.computed(() => Math.ceil(total.value / limit));
    function roleLabel(role) {
      return ROLE_LABELS[role] ?? role;
    }
    function roleBadgeColor(role) {
      const map = {
        super_admin: "error",
        county_admin: "warning",
        district_admin: "warning",
        school_admin: "info",
        teacher: "success",
        parent: "neutral"
      };
      return map[role] ?? "neutral";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UInput = _sfc_main$1;
      const _component_USelect = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UIcon = _sfc_main$d;
      const _component_UBadge = _sfc_main$4;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold text-foreground"> Users </h2><p class="text-sm text-muted-foreground mt-1"> Manage user accounts and roles </p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        to: "/admin/users/create",
        color: "primary",
        icon: "i-heroicons-plus",
        size: "sm"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create user `);
          } else {
            return [
              vueExports.createTextVNode(" Create user ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col sm:flex-row gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
        modelValue: vueExports.unref(search),
        "onUpdate:modelValue": ($event) => vueExports.isRef(search) ? search.value = $event : null,
        placeholder: "Search by name or email…",
        icon: "i-heroicons-magnifying-glass",
        class: "sm:w-72"
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
        modelValue: vueExports.unref(selectedRole),
        "onUpdate:modelValue": ($event) => vueExports.isRef(selectedRole) ? selectedRole.value = $event : null,
        items: ROLES,
        class: "sm:w-48"
      }, null, _parent));
      _push(`</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(pending)) {
              _push2(`<div class="flex items-center justify-center py-12"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-6 h-6 animate-spin text-muted-foreground"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (vueExports.unref(users).length === 0) {
              _push2(`<div class="text-center py-12 text-muted-foreground"${_scopeId}> No users found </div>`);
            } else {
              _push2(`<table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-border text-left"${_scopeId}><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Name </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Email </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Role </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Status </th><th class="pb-3 font-medium text-muted-foreground"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(users), (user) => {
                _push2(`<tr class="hover:bg-muted/40 transition-colors"${_scopeId}><td class="py-3 pr-4 font-medium"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(user.firstName)} ${serverRenderer_cjs_prodExports.ssrInterpolate(user.lastName)}</td><td class="py-3 pr-4 text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(user.email)}</td><td class="py-3 pr-4"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UBadge, {
                  color: roleBadgeColor(user.role),
                  variant: "subtle",
                  size: "sm"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(roleLabel(user.role))}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(roleLabel(user.role)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td class="py-3 pr-4"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UBadge, {
                  color: user.isActive ? "success" : "neutral",
                  variant: "subtle",
                  size: "sm"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(user.isActive ? "Active" : "Inactive")}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(user.isActive ? "Active" : "Inactive"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td class="py-3"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  to: `/admin/users/${user._id}`,
                  size: "xs",
                  variant: "ghost",
                  icon: "i-heroicons-pencil-square"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Edit `);
                    } else {
                      return [
                        vueExports.createTextVNode(" Edit ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            if (vueExports.unref(totalPages) > 1) {
              _push2(`<div class="flex items-center justify-between pt-4 border-t border-border mt-4"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(total))} users total </p><div class="flex gap-2"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                disabled: vueExports.unref(page) <= 1,
                icon: "i-heroicons-chevron-left",
                onClick: ($event) => page.value--
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm flex items-center px-2"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(page))} / ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(totalPages))}</span>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                disabled: vueExports.unref(page) >= vueExports.unref(totalPages),
                icon: "i-heroicons-chevron-right",
                onClick: ($event) => page.value++
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.unref(pending) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "flex items-center justify-center py-12"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-6 h-6 animate-spin text-muted-foreground"
                })
              ])) : vueExports.unref(users).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "text-center py-12 text-muted-foreground"
              }, " No users found ")) : (vueExports.openBlock(), vueExports.createBlock("table", {
                key: 2,
                class: "w-full text-sm"
              }, [
                vueExports.createVNode("thead", null, [
                  vueExports.createVNode("tr", { class: "border-b border-border text-left" }, [
                    vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Name "),
                    vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Email "),
                    vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Role "),
                    vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Status "),
                    vueExports.createVNode("th", { class: "pb-3 font-medium text-muted-foreground" }, " Actions ")
                  ])
                ]),
                vueExports.createVNode("tbody", { class: "divide-y divide-border" }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(users), (user) => {
                    return vueExports.openBlock(), vueExports.createBlock("tr", {
                      key: user._id,
                      class: "hover:bg-muted/40 transition-colors"
                    }, [
                      vueExports.createVNode("td", { class: "py-3 pr-4 font-medium" }, vueExports.toDisplayString(user.firstName) + " " + vueExports.toDisplayString(user.lastName), 1),
                      vueExports.createVNode("td", { class: "py-3 pr-4 text-muted-foreground" }, vueExports.toDisplayString(user.email), 1),
                      vueExports.createVNode("td", { class: "py-3 pr-4" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: roleBadgeColor(user.role),
                          variant: "subtle",
                          size: "sm"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(roleLabel(user.role)), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      vueExports.createVNode("td", { class: "py-3 pr-4" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: user.isActive ? "success" : "neutral",
                          variant: "subtle",
                          size: "sm"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(user.isActive ? "Active" : "Inactive"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      vueExports.createVNode("td", { class: "py-3" }, [
                        vueExports.createVNode(_component_UButton, {
                          to: `/admin/users/${user._id}`,
                          size: "xs",
                          variant: "ghost",
                          icon: "i-heroicons-pencil-square"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ])
                    ]);
                  }), 128))
                ])
              ])),
              vueExports.unref(totalPages) > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 3,
                class: "flex items-center justify-between pt-4 border-t border-border mt-4"
              }, [
                vueExports.createVNode("p", { class: "text-sm text-muted-foreground" }, vueExports.toDisplayString(vueExports.unref(total)) + " users total ", 1),
                vueExports.createVNode("div", { class: "flex gap-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    size: "sm",
                    variant: "outline",
                    disabled: vueExports.unref(page) <= 1,
                    icon: "i-heroicons-chevron-left",
                    onClick: ($event) => page.value--
                  }, null, 8, ["disabled", "onClick"]),
                  vueExports.createVNode("span", { class: "text-sm flex items-center px-2" }, vueExports.toDisplayString(vueExports.unref(page)) + " / " + vueExports.toDisplayString(vueExports.unref(totalPages)), 1),
                  vueExports.createVNode(_component_UButton, {
                    size: "sm",
                    variant: "outline",
                    disabled: vueExports.unref(page) >= vueExports.unref(totalPages),
                    icon: "i-heroicons-chevron-right",
                    onClick: ($event) => page.value++
                  }, null, 8, ["disabled", "onClick"])
                ])
              ])) : vueExports.createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-GcURt6dG.mjs.map
